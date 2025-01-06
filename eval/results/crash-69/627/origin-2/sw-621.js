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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'b786038d');

		} catch (e) {console.log(e)}

		try {
			var func0_var1 = 'default';
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = 'default';
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = 'low';
		} catch (e) {console.log(e)}

		try {
			var func0_var0 = {premultiplyAlpha: func0_var1, colorSpaceConversion: func0_var2, resizeWidth: Infinity, resizeHeight: Infinity, resizeQuality: func0_var3, };
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = await self.createImageBitmap('',func0_var0);
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var5;
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, 'eea686dc');

			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = await event.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var2 = 'http://127.0.0.2:8080/input-621_page-1.html#8ce52630';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var3 = await self.clients.openWindow(func0_func0_var2);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var4 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var4;
		}

		try {
			self.oncookiechange = func0_func0;
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var6;
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = undefined;
		} catch (e) {console.log(e)}

		return func0_var7;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'a0159bf4');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = undefined;
		} catch (e) {console.log(e)}

		return func1_var2;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '2194fa41');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'e9f1';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = await self.clients.get(func2_var0);
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = '9d04';
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = await self.clients.get(func2_var2);
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = 'http://127.0.0.2:8080/input-621_page-1.html#cc9e08f0';
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = await self.clients.openWindow(func2_var4);
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = undefined;
		} catch (e) {console.log(e)}

		return func2_var7;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'e01e6dba');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = {name: self.origin, url: self.origin, matchType: func3_var3, };
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await self.cookieStore.get(func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = undefined;
		} catch (e) {console.log(e)}

		return func3_var5;
	}
	try {
		self.onpush = func3;
	} catch (e) {console.log(e)}
async function func4(event) {
		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}

		try {
				for (const pair of event.request.headers.getSetCookie()) {
        splitPair = pair.split('=');
        if (splitPair[0] == 'sanitize' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-77a1f9c3] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-cce30682] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'fc72ca8b');

		} catch (e) {console.log(e)}

async function func4_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '161d5ab6');

			} catch (e) {console.log(e)}

			try {
				var func4_func0_var0 = true;
			} catch (e) {console.log(e)}

			try {
				event.returnValue = func4_func0_var0;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var1 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var2 = new Array(event);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var3 = await self.cookieStore.subscribeToChanges(func4_func0_var2);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var4 = undefined;
			} catch (e) {console.log(e)}

			return func4_func0_var4;
		}

		try {
			self.onpushsubscriptionchange = func4_func0;
		} catch (e) {console.log(e)}

		try {
			var func4_var0 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
