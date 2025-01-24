	try {
		function check_site_violation(src, exec, token){

let fetch_url = new URL(src);
let exec_url = new URL(exec);
if(fetch_url.hostname != exec_url.hostname){
  console.log('[UXSS] [exec-' + token + '] ' + fetch_url.hostname + ' ' + exec_url.hostname);
  return true;
}
  try {
    if(IPCFuzzer.check_isolation(src)){
      console.log('[UXSS] [process-' + token + '] ' + src);
      return true;
    }
  } catch (error) {
    console.log('Process Isolation Check: ' + error);
  }

  cookieStore.get('sanitize').then(c => {
      if(fetch_url.hostname != c.value) {
        console.log('[UXSS] [cookie-' + token + '] ' + fetch_url.hostname + ' ' + c.value);
    }
  }).catch(e => {});
  cookieStore.get('sanitize_partitioned')
    .then(c => {
      if(fetch_url.hostname != c.value) { console.log('[UXSS] [cookie_partitioned-' + token + '] ' + fetch_url.hostname + ' ' + c.value);}
    }).catch(e => {});
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

  let hosts = ['127.0.0.1', '127.0.0.2'];
  hosts.forEach(host => {
    let url = 'http://' + host + ':8080/sanitizer?nonce=' + token;
    try {
      fetch(url).then((response) => {
          if (response.ok()) {
            let text = response.text();
            if (text.includes('127.0.0.2')) {
              console.log('[UXSS] [fetch-' + token + '] ' + host + ' ' + text);
            }
          }
      }).catch(error => {});
    } catch (error) {}

    url = 'http://' + host + ':8080/sanitizer-cookie?nonce=' + token;
    try {
      fetch(url, {
        credentials: 'include',
        mode: 'cors',
      }).then((response) => {
          if (response.ok()) {
            let text = response.text();
            if (text.includes('127.0.0.2')) {
              console.log('[UXSS] [fetch-credentialed-' + token + '] ' + host + ' ' + text);
            }
          }
      }).catch(error => {});
    } catch (error) {}
  });
  return false;
}
	} catch (e) {console.log(e)}
async function func0(event) {
		try {
			await self.skipWaiting();
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'df330951');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = await event.waitUntil(func0_var0);
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = undefined;
		} catch (e) {console.log(e)}

		return func0_var3;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '8e3a32b7');

		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, 'b8898558');

			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = 'http://127.0.0.1:8080/input-690_page-1.html#0d37d9d0';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var1 = await self.clients.openWindow(func1_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var2 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var3 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var3;
		}

		try {
			self.onbackgroundfetchabort = func1_func0;
		} catch (e) {console.log(e)}

		try {
			var func1_var0 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func1_var0;
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = await self.cookieStore.dispatchEvent(event);
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = undefined;
		} catch (e) {console.log(e)}

		return func1_var3;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'b4572cb1');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = undefined;
		} catch (e) {console.log(e)}

		return func2_var1;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'ea1b4309');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = event.data;
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await func3_var0.text();
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = 'f1cb';
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await self.clients.get(func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await func3_var0.blob();
		} catch (e) {console.log(e)}

		try {
			self.cookieStore.onchange = eval;
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = undefined;
		} catch (e) {console.log(e)}

		return func3_var6;
	}
	try {
		self.onpush = func3;
	} catch (e) {console.log(e)}
	try {
		function check_site_violation(src, exec, token){

let fetch_url = new URL(src);
let exec_url = new URL(exec);
if(fetch_url.hostname != exec_url.hostname){
  console.log('[UXSS] [exec-' + token + '] ' + fetch_url.hostname + ' ' + exec_url.hostname);
  return true;
}
  try {
    if(IPCFuzzer.check_isolation(src)){
      console.log('[UXSS] [process-' + token + '] ' + src);
      return true;
    }
  } catch (error) {
    console.log('Process Isolation Check: ' + error);
  }

  cookieStore.get('sanitize').then(c => {
      if(fetch_url.hostname != c.value) {
        console.log('[UXSS] [cookie-' + token + '] ' + fetch_url.hostname + ' ' + c.value);
    }
  }).catch(e => {});
  cookieStore.get('sanitize_partitioned')
    .then(c => {
      if(fetch_url.hostname != c.value) { console.log('[UXSS] [cookie_partitioned-' + token + '] ' + fetch_url.hostname + ' ' + c.value);}
    }).catch(e => {});
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

  let hosts = ['127.0.0.1', '127.0.0.2'];
  hosts.forEach(host => {
    let url = 'http://' + host + ':8080/sanitizer?nonce=' + token;
    try {
      fetch(url).then((response) => {
          if (response.ok()) {
            let text = response.text();
            if (text.includes('127.0.0.2')) {
              console.log('[UXSS] [fetch-' + token + '] ' + host + ' ' + text);
            }
          }
      }).catch(error => {});
    } catch (error) {}

    url = 'http://' + host + ':8080/sanitizer-cookie?nonce=' + token;
    try {
      fetch(url, {
        credentials: 'include',
        mode: 'cors',
      }).then((response) => {
          if (response.ok()) {
            let text = response.text();
            if (text.includes('127.0.0.2')) {
              console.log('[UXSS] [fetch-credentialed-' + token + '] ' + host + ' ' + text);
            }
          }
      }).catch(error => {});
    } catch (error) {}
  });
  return false;
}
	} catch (e) {console.log(e)}
async function func5(event) {
		try {
			await self.skipWaiting();
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '0c442423');

		} catch (e) {console.log(e)}

		try {
			var func5_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func5_var1 = '2751';
		} catch (e) {console.log(e)}

		try {
			var func5_var2 = await self.clients.get(func5_var1);
		} catch (e) {console.log(e)}

		try {
			var func5_var4 = true;
		} catch (e) {console.log(e)}

		try {
			var func5_var5 = 'unrestricted';
		} catch (e) {console.log(e)}

		try {
			var func5_var3 = {name: func5_var1, domain: func5_var1, path: func5_var1, secure: func5_var4, sameSite: func5_var5, };
		} catch (e) {console.log(e)}

		try {
			var func5_var6 = await self.cookieStore.delete(func5_var3);
		} catch (e) {console.log(e)}

		try {
			var func5_var7 = undefined;
		} catch (e) {console.log(e)}

		return func5_var7;
	}
	try {
		self.oninstall = func5;
	} catch (e) {console.log(e)}
async function func6(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '0369a147');

		} catch (e) {console.log(e)}

		try {
			self.cookieStore.onchange = eval;
		} catch (e) {console.log(e)}

		try {
			var func6_var0 = await self.cookieStore.dispatchEvent(event);
		} catch (e) {console.log(e)}

		try {
			var func6_var1 = undefined;
		} catch (e) {console.log(e)}

		return func6_var1;
	}
	try {
		self.onactivate = func6;
	} catch (e) {console.log(e)}
async function func7(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'ee59fcce');

		} catch (e) {console.log(e)}

		try {
			var func7_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func7_var2 = 'strict';
		} catch (e) {console.log(e)}

		try {
			var func7_var0 = {name: self.origin, domain: self.origin, path: self.origin, secure: func7_var1, sameSite: func7_var2, };
		} catch (e) {console.log(e)}

		try {
			var func7_var3 = await self.cookieStore.delete(func7_var0);
		} catch (e) {console.log(e)}

		try {
			var func7_var4 = 'http://127.0.0.1:8080/input-691_page-2.html#26da4086';
		} catch (e) {console.log(e)}

		try {
			var func7_var5 = await self.cookieStore.getAll(func7_var4);
		} catch (e) {console.log(e)}

		try {
			var func7_var6 = '3e02';
		} catch (e) {console.log(e)}

		try {
			var func7_var7 = await self.clients.get(func7_var6);
		} catch (e) {console.log(e)}

		try {
			var func7_var8 = undefined;
		} catch (e) {console.log(e)}

		return func7_var8;
	}
	try {
		self.onmessage = func7;
	} catch (e) {console.log(e)}
async function func8(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '649c31e2');

		} catch (e) {console.log(e)}

		try {
			var func8_var0 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func8_var1 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func8_var2 = undefined;
		} catch (e) {console.log(e)}

		return func8_var2;
	}
	try {
		self.onpush = func8;
	} catch (e) {console.log(e)}
async function func9(event) {
		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}

		try {
				for (const pair of event.request.headers.getSetCookie()) {
        splitPair = pair.split('=');
        if (splitPair[0] == 'sanitize' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-16cef84f] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-7f4c140a] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '38ffeabd');

		} catch (e) {console.log(e)}

		try {
			var func9_var0 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func9_var0;
		} catch (e) {console.log(e)}

		try {
			var func9_var2 = 'unrestricted';
		} catch (e) {console.log(e)}

		try {
			var func9_var1 = {name: self.origin, domain: self.origin, path: self.origin, secure: func9_var0, sameSite: func9_var2, };
		} catch (e) {console.log(e)}

		try {
			var func9_var3 = await self.cookieStore.delete(func9_var1);
		} catch (e) {console.log(e)}

		try {
			var func9_var4 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func9;
	} catch (e) {console.log(e)}
