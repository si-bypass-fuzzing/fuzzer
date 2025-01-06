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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'e41e65c3');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = {name: self.origin, url: self.origin, matchType: func0_var2, };
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await self.cookieStore.getAll(func0_var1);
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, 'c59913c6');

			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = true;
			} catch (e) {console.log(e)}

			try {
				event.returnValue = func0_func0_var0;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = await self.cookieStore.dispatchEvent(event);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var2 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var2;
		}

		try {
			self.onbackgroundfetchfail = func0_func0;
		} catch (e) {console.log(e)}

		try {
			self.cookieStore.onchange = eval;
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var4;
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = undefined;
		} catch (e) {console.log(e)}

		return func0_var5;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '7a024da1');

		} catch (e) {console.log(e)}

		try {
			var func1_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = 'lax';
		} catch (e) {console.log(e)}

		try {
			var func1_var0 = {name: self.origin, domain: self.origin, path: self.origin, secure: func1_var1, sameSite: func1_var2, };
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = await self.cookieStore.delete(func1_var0);
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = undefined;
		} catch (e) {console.log(e)}

		return func1_var4;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'f60a7aab');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = 'http://127.0.0.2:8080/input-651_page-2.html#4146f9bc';
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = await self.cookieStore.delete(func2_var1);
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = undefined;
		} catch (e) {console.log(e)}

		return func2_var4;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '44a9d95a');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = 'http://127.0.0.1:8080/input-651_page-1.html#428a2233';
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await self.cookieStore.delete(func3_var0);
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = '75bd';
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await self.clients.get(func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = 'http://127.0.0.1:8080/input-651_page-1.html#cb3e45d0';
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = await self.clients.openWindow(func3_var4);
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = undefined;
		} catch (e) {console.log(e)}

		return func3_var7;
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
            console.log('[UXSS] [sw-intercept-cookie-b157deb2] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-8436207b] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '79ed49b3');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = 'lax';
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = {expires: Infinity, domain: func4_var0, path: func4_var0, secure: func4_var3, httpOnly: func4_var3, sameSite: func4_var4, };
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = await self.cookieStore.set(func4_var0,func4_var1,func4_var2);
		} catch (e) {console.log(e)}

		try {
			self.onunhandledrejection = eval;
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch('http://127.0.0.1:8080/input-651_page-1.html#ac5701f6').then((resp) => {if (resp.ok) {return resp;} else {return fetch(event.request);}}).catch((err) => {return fetch(event.request);}));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
