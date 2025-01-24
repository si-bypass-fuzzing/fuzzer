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
			check_site_violation('http://127.0.0.2:8080', location.origin, '8495c0f0');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var0;
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '26880d0f');

			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = 'http://127.0.0.2:8080/input-1_page-2.html#0a22803e';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = await self.cookieStore.get(func0_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var2 = {includeUncontrolled: func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var3 = await self.clients.matchAll(func0_func0_var2);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var4 = await event.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var5 = true;
			} catch (e) {console.log(e)}

			try {
				event.returnValue = func0_func0_var5;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var6 = await self.cookieStore.subscribeToChanges(func0_func0_var4);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var7 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var8 = 'da22';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var9 = await self.clients.get(func0_func0_var8);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var10 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var10;
		}

		try {
			self.onnotificationclick = func0_func0;
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = undefined;
		} catch (e) {console.log(e)}

		return func0_var1;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '73433247');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'http://127.0.0.2:8080/input-1_page-1.html#c9bb2add';
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await self.cookieStore.delete(func1_var0);
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
			check_site_violation('http://127.0.0.2:8080', location.origin, '9ecae0c8');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'http://127.0.0.2:8080/input-1_page-1.html#ea52e3ec';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = await self.cookieStore.delete(func2_var0);
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = undefined;
		} catch (e) {console.log(e)}

		return func2_var2;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '0fb0c6a5');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = 'http://127.0.0.1:8080/input-1_page-1.html#aa1f4b24';
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await self.clients.openWindow(func3_var0);
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await func3_var1.postMessage(event,func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = await self.cookieStore.delete(func3_var4);
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = {name: func3_var0, matchType: func3_var7, };
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = await self.cookieStore.getAll(func3_var6);
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = undefined;
		} catch (e) {console.log(e)}

		return func3_var9;
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
            console.log('[UXSS] [sw-intercept-cookie-42133cb6] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-daae656b] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '3bd5831e');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = 'unrestricted';
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = {expires: Infinity, domain: func4_var0, path: func4_var0, secure: func4_var3, httpOnly: func4_var3, sameSite: func4_var4, };
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = await self.cookieStore.set(func4_var0,func4_var1,func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
