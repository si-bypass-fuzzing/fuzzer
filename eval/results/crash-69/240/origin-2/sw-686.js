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
			check_site_violation('http://127.0.0.2:8080', location.origin, '5c2b0c88');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = undefined;
		} catch (e) {console.log(e)}

		return func0_var0;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'b69156a1');

		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '1c180ffa');

			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = event.data;
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var1 = await func1_func0_var0.json();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var2 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var3 = {name: self.origin, value: self.origin, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var4 = await self.cookieStore.set(func1_func0_var3);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var5 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var5;
		}

		try {
			self.onpush = func1_func0;
		} catch (e) {console.log(e)}

		try {
			var func1_var0 = undefined;
		} catch (e) {console.log(e)}

		return func1_var0;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '308ac2f2');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = 'http://127.0.0.1:8080/input-686_page-2.html#3b32b362';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = await self.clients.openWindow(func2_var2);
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = 71;
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = new Array(func2_var3);
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = await func2_var1.postMessage(event,func2_var4);
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = 'http://127.0.0.2:8080/input-686_page-1.html#bb02b2ba';
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = await func2_var1.navigate(func2_var7);
		} catch (e) {console.log(e)}

		try {
			var func2_var9 = '2deb';
		} catch (e) {console.log(e)}

		try {
			var func2_var10 = await self.clients.get(func2_var9);
		} catch (e) {console.log(e)}

		try {
			var func2_var11 = await func2_var1.postMessage(event,func2_var4);
		} catch (e) {console.log(e)}

		try {
			var func2_var13 = true;
		} catch (e) {console.log(e)}

		try {
			var func2_var14 = 'sharedworker';
		} catch (e) {console.log(e)}

		try {
			var func2_var12 = {includeUncontrolled: func2_var13, type: func2_var14, };
		} catch (e) {console.log(e)}

		try {
			var func2_var15 = await self.clients.matchAll(func2_var12);
		} catch (e) {console.log(e)}

		try {
			var func2_var16 = undefined;
		} catch (e) {console.log(e)}

		return func2_var16;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '3891d8ad');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = event.data;
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await func3_var0.blob();
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = '3edc';
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await self.clients.get(func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = true;
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = true;
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = await event.initEvent(func3_var5,func3_var6,func3_var7);
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
            console.log('[UXSS] [sw-intercept-cookie-4ea27d79] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-067b5c25] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'a76cbe0f');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = 'http://127.0.0.2:8080/input-686_page-2.html#817a30a3';
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await self.cookieStore.removeEventListener(func4_var0,null,'');
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = 'e68d';
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await self.clients.get(func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = 'fb42';
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = await self.clients.get(func4_var4);
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = 'lax';
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = {name: func4_var0, domain: func4_var0, path: func4_var0, secure: func4_var8, sameSite: func4_var9, };
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = await self.cookieStore.delete(func4_var7);
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var12 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var13 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var14 = await event.initEvent(func4_var11,func4_var12,func4_var13);
		} catch (e) {console.log(e)}

		try {
			var func4_var15 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
