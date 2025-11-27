import secrets
from .instruction import StringInstruction, Instruction
from .url import URLScope
from .magic import MAGIC

TOKEN_LENGTH = 4

class Sanitizer:

    def __init__(self, browser: str, url_scope: URLScope):
        assert browser in ["chrome", "firefox", "webkit"]
        self.browser = browser
        self.url_scope = url_scope

    def sanitizer_declaration(self) -> StringInstruction:
        func = "function check_site_violation(src, exec, token){\n"

        # compare sites (hostnames)
        func += """
let fetch_url = new URL(src);
let exec_url = new URL(exec);"""

        if self.browser == "chrome":
            func += """
if(fetch_url.hostname != exec_url.hostname){
  console.log('[UXSS] [exec-' + token + '] ' + fetch_url.hostname + ' ' + exec_url.hostname);
  return true;
}"""

        # check per process isolation
        func += """
  try {
    if(IPCFuzzer.check_isolation(src)){
      console.log('[UXSS] [process-' + token + '] ' + src);
      return true;
    }
  } catch (error) {
    console.log('Process Isolation Check: ' + error);
  }
"""

        # cookie sanitizer
        func += """
try {
  let cookie_site = document.cookie.split('; ').find((row) => row.startsWith('sanitize='));
  if (cookie_site !== null){
    cookie_site = cookie_site.split('=')[1];
    if(fetch_url.hostname != cookie_site){
      console.log('[UXSS] [cookie-' + token + '] ' + fetch_url.hostname + ' ' + cookie_site);
      return true;
    }
  }"""
        if self.browser == "chrome":
            func += """
  cookieStore.get('sanitize').then(c => {
      if(fetch_url.hostname != c.value) {
        console.log('[UXSS] [cookie-' + token + '] ' + fetch_url.hostname + ' ' + c.value);
    }
  }).catch(e => {});"""

        func += """
} catch (error) {
  console.log('Cookie: ' + error);
}"""

        func += """
try {
  let partitioned_cookie_site = document.cookie.split('; ').find((row) => row.startsWith('sanitize_partitioned='));
  if (partitioned_cookie_site !== null){
    partitioned_cookie_site = partitioned_cookie_site.split('=')[1];
    if(fetch_url.hostname != partitioned_cookie_site){
      console.log('[UXSS] [cookie_partitioned-' + token + '] ' + fetch_url.hostname + ' ' + partitioned_cookie_site);
      return true;
    }
  }"""
        if self.browser == "chrome":
            func += """
  cookieStore.get('sanitize_partitioned')
    .then(c => {
      if(fetch_url.hostname != c.value) { console.log('[UXSS] [cookie_partitioned-' + token + '] ' + fetch_url.hostname + ' ' + c.value);}
    }).catch(e => {});"""

        func += """
} catch (error) {
  console.log('Cookie: ' + error);
}"""

        # localStorage sanitizer
        func += """
try {
  let storage_site = localStorage.getItem('sanitize');
  if(storage_site != null && fetch_url.hostname != storage_site){
      console.log('[UXSS] [localStorage-' + token + '] ' + fetch_url.hostname + ' ' + storage_site)
      return true;
  }
} catch (error) {
  console.log('localStorage: ' + error);
}
"""

        # IndexedDB sanitizer
        func += """
  try {
    let openRequest = indexedDB.open('sanitize', 1);

    openRequest.onsuccess = function(e) {
      let db = e.target.result;
      let transaction = db.transaction(['sanitize'], 'readonly');
      let store = transaction.objectStore('sanitize');
      let request = store.get('sanitize');

      request.onsuccess = function(e) {
        let indexeddb_site = e.target.result.value;
        if (fetch_url.hostname != indexeddb_site) {
          console.log('[UXSS] [indexeddb-' + token + '] ' + fetch_url.hostname + ' ' + indexeddb_site)
        }
        db.close();
      };

      request.onerror = function(e) {
        console.log('Error reading data:', e.target.error);
        db.close();
      };
    };

    openRequest.onerror = function(e) {
      console.log('Error opening database:', e.target.error);
    };
} catch (e) {}
"""

        # Origin Private File System sanitizer
        func += """
  try {
    async function readOriginPrivateFilesystem(){
      try {
        const dirHandle = await navigator.storage.getDirectory();
        const fileHandle = await dirHandle.getFileHandle('sanitize', {create: false});
        const file = await fileHandle.getFile();
        const opfs_site = await file.text();
        if(opfs_site != '' && fetch_url.hostname != opfs_site) {
          console.log('[UXSS] [opfs-' + token + '] ' + fetch_url.hostname + ' ' + opfs_site);
        }
      } catch (error) {
        console.log('OPFS: ' + error);
      }
    }
    readOriginPrivateFilesystem();
  } catch (error) {
    console.log('OPFS: ' + error);
  }"""

        # Chrome deprecated custom filesystem sanitizer
        if self.browser == "chrome":
            func += """
  try {
    function onFsError(error) {
      console.log('FileSystem: ' + error)
    }

    function onFileEntryRead(fe) {
      try {
        fe.file( (f) => {
          f.text()
            .then( (filesystem_site) => {
              if(filesystem_site != '' && fetch_url.hostname != filesystem_site) {
                console.log('[UXSS] [filesystem-' + token + '] ' + fetch_url.hostname + ' ' + filesystem_site);
              }
            })
        });
      } catch (error) {
        console.log('FileSystem: ' + error);
      }
    }

    function onFsRead(fs) {
      fs.root.getFile('sanitize', {create: false}, onFileEntryRead, onFsError);
    }
    webkitRequestFileSystem(Window.TEMPORARY, 256, onFsRead, onFsError);
  } catch (error) {
    console.log('OPFS: ' + error);
  }
"""

        # filesystem: url xhr sanitizer
        func += """
  try {
    let hosts = ['127.0.0.1', '127.0.0.2'];
    hosts.forEach(host => {
      var x = new XMLHttpRequest();

      x.onload = function () {
          if (this.readyState == 4 && this.status == 200) {
              let filesystem_site = x.responseText;
              if (filesystem_site != '' && fetch_url.hostname != filesystem_site) {
                  console.log('[UXSS] [filesystem-' + token + '] ' + fetch_url.hostname + ' ' + filesystem_site);
              }
          }
      };

      x.open('GET', 'filesystem:http://' + host + ':8080/temporary/sanitize', true);
      x.send();
    });
  } catch (error) {
}
"""
        # fetch sanitizer
        func += f"""
  let hosts = ['127.0.0.1', '127.0.0.2'];
  hosts.forEach(host => {{
    let url = 'http://' + host + ':8080/sanitizer?nonce=' + token;
    try {{
      fetch(url).then((response) => {{
          if (response.ok()) {{
            let text = response.text();
            if (text.includes('{self.url_scope.get_ip()}')) {{
              console.log('[UXSS] [fetch-' + token + '] ' + host + ' ' + text);
            }}
          }}
      }}).catch(error => {{}});
    }} catch (error) {{}}

    url = 'http://' + host + ':8080/sanitizer-cookie?nonce=' + token;
    try {{
      fetch(url, {{
        credentials: 'include',
        mode: 'cors',
      }}).then((response) => {{
          if (response.ok()) {{
            let text = response.text();
            if (text.includes('{self.url_scope.get_ip()}')) {{
              console.log('[UXSS] [fetch-credentialed-' + token + '] ' + host + ' ' + text);
            }}
          }}
      }}).catch(error => {{}});
    }} catch (error) {{}}
  }});
"""

        # default return
        func += "  return false;\n"
        func += "}"
        return StringInstruction(func)

    def sanitizer_invocation(self, token: str | None = None) -> StringInstruction:
        hex_token = secrets.token_hex(TOKEN_LENGTH)
        if token:
            hex_token = f"{token}-{hex_token}"
        sanitizer = f"check_site_violation('{self.url_scope.get_origin()}', location.origin, '{hex_token}');\n"

        return StringInstruction(sanitizer)

    def window_sanitizer_declaration(self) -> StringInstruction:
        func = "function check_window_site_violation(src, win, token){"
        func += """
  try {
    let fetch_url = new URL(src);
    let cookie_site = win.document.cookie.split('; ').find((row) => row.startsWith('sanitize='));
    if (cookie_site !== null) {
      cookie_site = cookie_site.split('=')[1];
      if(cookie_site != null && fetch_url.hostname != cookie_site){
        console.log('[UXSS] [win-cookie-' + token + '] ' + fetch_url.hostname + ' ' + cookie_site);
      }
    }
  } catch (error) {
    console.log('Window Cookie: ' + error);
  }
"""
        func += "}"
        return StringInstruction(func)

    def window_sanitizer_invocation(
        self, win: str, token: str | None = None
    ) -> StringInstruction:
        hex_token = secrets.token_hex(TOKEN_LENGTH)
        if token:
            hex_token = f"{token}-{hex_token}"
        sanitizer = f"check_window_site_violation('{self.url_scope.get_origin()}', {win}, '{hex_token}');\n"

        return StringInstruction(sanitizer)

    def iframe_sanitizer_declaration(self) -> StringInstruction:
        func = "function check_iframe_site_violation(src, frame, token){"

        func += """
  try {
    let fetch_url = new URL(src);
    let cookie_site = frame.contentWindow.document.cookie.split('; ').find((row) => row.startsWith('sanitize='))
    if (cookie_site !== null) {
      cookie_site = cookie_site.split('=')[1];
      if(cookie_site != null && fetch_url.hostname != cookie_site){
        console.log('[UXSS] [iframe-cookie-' + token + '] ' + fetch_url.hostname + ' ' + cookie_site);
      }
    }
  } catch (error) {
    console.log('Iframe Cookie: ' + error);
  }
"""
        func += "}"
        return StringInstruction(func)

    def iframe_sanitizer_invocation(
        self, frame: str, token: str | None = None
    ) -> StringInstruction:
        hex_token = secrets.token_hex(TOKEN_LENGTH)
        if token:
            hex_token = f"{token}-{hex_token}"
        sanitizer = f"check_iframe_site_violation('{self.url_scope.get_origin()}', {frame}, '{hex_token}');\n"

        return StringInstruction(sanitizer)

    def seed_cookie(self, key: str, value: str, same_site: str) -> StringInstruction:
        return StringInstruction(
            f"document.cookie = '{key}={value}; Domain={self.url_scope.get_ip()}; Path=/; SameSite={same_site}; max-age=31536000';"
        )

    def seed_partitioned_cookie(self, key: str, value: str) -> StringInstruction:
        return StringInstruction(
            f"document.cookie = '{key}_partitioned={value}; Domain={self.url_scope.get_ip()}; Secure; Path=/; SameSite=None; Partitioned; max-age=31536000';"
        )

    def seed_local_storage(self, key: str, value: str) -> StringInstruction:
        return StringInstruction(f"localStorage.setItem('{key}', '{value}');")

    def seed_indexed_db(self, key: str, value: str) -> StringInstruction:
        code: str = f"""
try {{
  let openRequest = indexedDB.open('sanitize', 1);

  openRequest.onupgradeneeded = function(e) {{
    let db = e.target.result;
    if (!db.objectStoreNames.contains('sanitize')) {{
      db.createObjectStore('sanitize', {{keyPath: 'key'}});
    }}
  }};

  openRequest.onsuccess = function(e) {{
    let db = e.target.result;
    let transaction = db.transaction(['sanitize'], 'readwrite');
    let store = transaction.objectStore('sanitize');

    let item = {{
      key: '{key}',
      value: '{value}',
    }};
    let request = store.put(item);

    request.onsuccess = function(e) {{
      console.log('Data written successfully');
      db.close();
    }};

    request.onerror = function(e) {{
      console.error(e.target.error);
      db.close();
    }};
  }};

  openRequest.onerror = function(e) {{
    console.error(e);
  }};
}} catch (e) {{
  console.error(e);
}}
"""
        return StringInstruction(code)

    def seed_origin_private_filesystem(self, key: str, value: str) -> StringInstruction:
        code: str = f"""
(async () => {{
  try {{
    const dirHandle = await navigator.storage.getDirectory();
    const fileHandle = await dirHandle.getFileHandle('{key}', {{create: true}});
    const writable = await fileHandle.createWritable();
    await writable.write('{value}');
    await writable.close();
  }} catch (e) {{
    console.error(e);
  }}
}})();
"""
        return StringInstruction(code)

    def seed_chrome_deprecated_custom_filesystem(
        self, key: str, value: str
    ) -> StringInstruction:
        code: str = f"""
{{
  function onFsError(e) {{
    // console.error(e);
  }}
  function onFileEntryWrite (f) {{
    f.createWriter(
      (fileWriter) => {{ let data = new Blob(['{value}'], {{ type: 'text/plain' }}); fileWriter.write(data); }},
      onFsError
    );
  }}
  function onFsWrite (fs) {{
    fs.root.getFile('{key}', {{create: true}}, onFileEntryWrite, onFsError);
  }}
  webkitRequestFileSystem(Window.TEMPORARY, 256, onFsWrite, onFsError);
}}
"""
        return StringInstruction(code)

    def seed(self, gen_magic_string: bool) -> list[Instruction]:
        insts: list[Instruction] = []

        insts.append(StringInstruction("console.error('deadbeef');"))

        insts.append(self.seed_cookie("sanitize", self.url_scope.get_ip(), "Lax"))
        if gen_magic_string:
            insts.append(self.seed_cookie("magic_lax", MAGIC, "Lax"))
            insts.append(self.seed_cookie("magic_strict", MAGIC, "Strict"))

        insts.append(self.seed_partitioned_cookie("sanitize", self.url_scope.get_ip()))
        # if gen_magic_string:
            # insts.append(self.seed_partitioned_cookie(MAGIC, MAGIC))

        insts.append(self.seed_local_storage("sanitize", self.url_scope.get_ip()))
        if gen_magic_string:
            insts.append(self.seed_local_storage(MAGIC, MAGIC))

        insts.append(self.seed_indexed_db("sanitize", self.url_scope.get_ip()))
        if gen_magic_string:
            insts.append(self.seed_indexed_db(MAGIC, MAGIC))

        insts.append(
            self.seed_origin_private_filesystem("sanitize", self.url_scope.get_ip())
        )
        if gen_magic_string:
            insts.append(self.seed_origin_private_filesystem(MAGIC, MAGIC))

        if self.browser == "chrome":
            insts.append(
                self.seed_chrome_deprecated_custom_filesystem(
                    "sanitize", self.url_scope.get_ip()
                )
            )
            if gen_magic_string:
                insts.append(
                    self.seed_chrome_deprecated_custom_filesystem(MAGIC, MAGIC)
                )

        return insts

    def sw_fetch_cookie_sanitizer(self) -> StringInstruction:
        code: str = f"""\tfor (const pair of event.request.headers.getSetCookie()) {{
        splitPair = pair.split('=');
        if (splitPair[0] == 'sanitize' && splitPair[1] != '{self.url_scope.get_ip()}') {{
            console.log('[UXSS] [sw-intercept-cookie-{secrets.token_hex(TOKEN_LENGTH)}] ' + '{self.url_scope.get_ip()}' + ' ' + splitPair[1]);
        }}
"""
        if self.browser == "chrome":
            code += f"""\t\tif (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '{self.url_scope.get_ip()}') {{
            console.log('[UXSS] [sw-intercept-cookie-partitioned-{secrets.token_hex(TOKEN_LENGTH)}] ' + '{self.url_scope.get_ip()}' + ' ' + splitPair[1]);
        }}
"""

        code += "\t}\n"
        return StringInstruction(code)

    def sw_sanitizer_declaration(self) -> StringInstruction:
        func = "function check_site_violation(src, exec, token){\n"

        # compare sites (hostnames)
        func += """
let fetch_url = new URL(src);
let exec_url = new URL(exec);
if(fetch_url.hostname != exec_url.hostname){
  console.log('[UXSS] [exec-' + token + '] ' + fetch_url.hostname + ' ' + exec_url.hostname);
  return true;
}"""

        # check per process isolation
        func += """
  try {
    if(IPCFuzzer.check_isolation(src)){
      console.log('[UXSS] [process-' + token + '] ' + src);
      return true;
    }
  } catch (error) {
    console.log('Process Isolation Check: ' + error);
  }
"""

        if self.browser == "chrome":
            func += """
  cookieStore.get('sanitize').then(c => {
      if(fetch_url.hostname != c.value) {
        console.log('[UXSS] [cookie-' + token + '] ' + fetch_url.hostname + ' ' + c.value);
    }
  }).catch(e => {});"""

        if self.browser == "chrome":
            func += """
  cookieStore.get('sanitize_partitioned')
    .then(c => {
      if(fetch_url.hostname != c.value) { console.log('[UXSS] [cookie_partitioned-' + token + '] ' + fetch_url.hostname + ' ' + c.value);}
    }).catch(e => {});"""

        # IndexedDB sanitizer
        func += """
  try {
    let openRequest = indexedDB.open('sanitize', 1);

    openRequest.onsuccess = function(e) {
      let db = e.target.result;
      let transaction = db.transaction(['sanitize'], 'readonly');
      let store = transaction.objectStore('sanitize');
      let request = store.get('sanitize');

      request.onsuccess = function(e) {
        let indexeddb_site = e.target.result.value;
        if (fetch_url.hostname != indexeddb_site) {
          console.log('[UXSS] [indexeddb-' + token + '] ' + fetch_url.hostname + ' ' + indexeddb_site)
        }
        db.close();
      };

      request.onerror = function(e) {
        console.log('Error reading data:', e.target.error);
        db.close();
      };
    };

    openRequest.onerror = function(e) {
      console.log('Error opening database:', e.target.error);
    };
} catch (e) {}
"""

  # # Origin Private File System sanitizer
  #       if self.browser == "chrome":
  #         func += """
  # try {
  #   async function readOriginPrivateFilesystem(){
  #     try {
  #       const dirHandle = await navigator.storage.getDirectory();
  #       const fileHandle = await dirHandle.getFileHandle('sanitize', {create: false});
  #       const file = await fileHandle.getFile();
  #       const opfs_site = await file.text();
  #       if(opfs_site != '' && fetch_url.hostname != opfs_site) {
  #         console.log('[UXSS] [opfs-' + token + '] ' + fetch_url.hostname + ' ' + opfs_site);
  #       }
  #     } catch (error) {
  #       console.log('OPFS: ' + error);
  #     }
  #   }
  #   readOriginPrivateFilesystem();
  # } catch (error) {
  #   console.log('OPFS: ' + error);
  # }"""

        # fetch sanitizer
        # TODO: maybe dont call this in the fetch handler
        func += f"""
  let hosts = ['127.0.0.1', '127.0.0.2'];
  hosts.forEach(host => {{
    let url = 'http://' + host + ':8080/sanitizer?nonce=' + token;
    try {{
      fetch(url).then((response) => {{
          if (response.ok()) {{
            let text = response.text();
            if (text.includes('{self.url_scope.get_ip()}')) {{
              console.log('[UXSS] [fetch-' + token + '] ' + host + ' ' + text);
            }}
          }}
      }}).catch(error => {{}});
    }} catch (error) {{}}

    url = 'http://' + host + ':8080/sanitizer-cookie?nonce=' + token;
    try {{
      fetch(url, {{
        credentials: 'include',
        mode: 'cors',
      }}).then((response) => {{
          if (response.ok()) {{
            let text = response.text();
            if (text.includes('{self.url_scope.get_ip()}')) {{
              console.log('[UXSS] [fetch-credentialed-' + token + '] ' + host + ' ' + text);
            }}
          }}
      }}).catch(error => {{}});
    }} catch (error) {{}}
  }});
"""

        # default return
        func += "  return false;\n"
        func += "}"
        return StringInstruction(func)
