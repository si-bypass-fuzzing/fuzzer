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
			check_site_violation('http://127.0.0.2:8080', location.origin, '3f1ebea3');

		} catch (e) {console.log(e)}

		try {
			self.onoffline = eval;
		} catch (e) {console.log(e)}

		try {
			var func0_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = true;
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = false;
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await event.initEvent(func0_var0,func0_var1,func0_var2);
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = 'worker';
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = {includeUncontrolled: func0_var1, type: func0_var5, };
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = await self.clients.matchAll(func0_var4);
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = await self.cookieStore.subscribeToChanges(func0_var7);
		} catch (e) {console.log(e)}

		try {
			var func0_var9 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var9;
		} catch (e) {console.log(e)}

		try {
			var func0_var10 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '524646f1');

			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = await event.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var1;
		}

		try {
			var func0_var11 = {handleEvent: func0_func0};
		} catch (e) {console.log(e)}

		try {
			var func0_var12 = await self.cookieStore.addEventListener(func0_var10,func0_var11,func0_var1);
		} catch (e) {console.log(e)}

		try {
			var func0_var13 = undefined;
		} catch (e) {console.log(e)}

		return func0_var13;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'dc482dc3');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'bde9';
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await self.clients.get(func1_var0);
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = 'http://127.0.0.1:8080/input-3862_page-2.html#86099b6b';
		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '40a9b233');

			} catch (e) {console.log(e)}

			try {
				var func1_func0_var1 = true;
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var2 = 'all';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = {includeUncontrolled: func1_func0_var1, type: func1_func0_var2, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var3 = await self.clients.matchAll(func1_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var5 = 'http://127.0.0.2:8080/input-3862_page-2.html#6acfc82a';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var4 = await self.clients.openWindow(func1_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var6 = 'http://127.0.0.2:8080/input-3862_page-2.html#2070a6c5';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var7 = await func1_func0_var4.navigate(func1_func0_var6);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var8 = await event.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var9 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var10 = await self.cookieStore.getChangeSubscriptions();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var11 = {name: func1_func0_var5, value: func1_func0_var5, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var12 = await self.cookieStore.set(func1_func0_var11);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var13 = 'http://127.0.0.1:8080/input-3862_page-1.html#d624a21f';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var14 = await func1_func0_var4.navigate(func1_func0_var13);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var15 = 'http://127.0.0.1:8080/input-3862_page-1.html#2b6ecf7b';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var16 = await self.clients.openWindow(func1_func0_var15);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var17 = await func1_func0_var4.postMessage(event);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var18 = '0e81';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var19 = await self.clients.get(func1_func0_var18);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var20 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var20;
		}

		try {
			var func1_var3 = {handleEvent: func1_func0};
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = await self.cookieStore.addEventListener(func1_var2,func1_var3,'');
		} catch (e) {console.log(e)}

async function func1_func1(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '486e0fe4');

			} catch (e) {console.log(e)}

			try {
				var func1_func1_var0 = 'http://127.0.0.1:8080/input-3862_page-1.html#0d160f07';
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var1 = true;
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var2 = await event.initEvent(func1_func1_var0,func1_func1_var1);
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var3 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				self.onmessage = eval;
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var4 = await event.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var5 = await event.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var6 = 'http://127.0.0.2:8080/input-3862_page-2.html#cf1f3a03';
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var7 = true;
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var8 = true;
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var9 = await event.initEvent(func1_func1_var6,func1_func1_var7,func1_func1_var8);
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var10 = await event.waitUntil(func1_func1_var3);
			} catch (e) {console.log(e)}

			try {
				var func1_func1_var11 = undefined;
			} catch (e) {console.log(e)}

			return func1_func1_var11;
		}

		try {
			self.oncanmakepayment = func1_func1;
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = undefined;
		} catch (e) {console.log(e)}

		return func1_var5;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'd176c189');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'http://127.0.0.1:8080/input-3862_page-1.html#78f9ad0e';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = await self.clients.openWindow(func2_var0);
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = 45;
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = new Array(func2_var2);
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = await func2_var1.postMessage(event,func2_var3);
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = 'http://127.0.0.2:8080/input-3862_page-2.html#9544af89';
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = await self.clients.openWindow(func2_var5);
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
			check_site_violation('http://127.0.0.2:8080', location.origin, '9de05f1c');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = await self.cookieStore.get(func3_var1);
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			self.onoffline = eval;
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func3_var4;
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
            console.log('[UXSS] [sw-intercept-cookie-887768bf] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-6878dea2] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '64d2fa83');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = 'http://127.0.0.2:8080/input-3862_page-2.html#ef3ffa2a';
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = await self.clients.openWindow(func4_var1);
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await func4_var2.postMessage(event);
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = await func4_var2.focus();
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = await func4_var2.focus();
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
