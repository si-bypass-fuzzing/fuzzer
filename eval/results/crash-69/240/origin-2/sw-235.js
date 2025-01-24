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
			check_site_violation('http://127.0.0.2:8080', location.origin, '73b27650');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = 'http://127.0.0.2:8080/input-235_page-2.html#287d6405';
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '63562d4f');

			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = false;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var2 = 'sharedworker';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = {includeUncontrolled: func0_func0_var1, type: func0_func0_var2, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var3 = await self.clients.matchAll(func0_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var4 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var5 = await event.waitUntil(func0_func0_var3);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var6 = await self.cookieStore.getAll();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var7 = await self.cookieStore.dispatchEvent(event);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var8 = await self.clients.matchAll(func0_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var9 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var9;
		}

		try {
			var func0_var1 = {handleEvent: func0_func0};
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await self.cookieStore.removeEventListener(func0_var0,func0_var1,'');
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await self.cookieStore.getChangeSubscriptions();
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = true;
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = await event.initEvent(func0_var4,func0_var5);
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = {name: func0_var0, value: func0_var0, };
		} catch (e) {console.log(e)}

		try {
			var func0_var9 = await self.cookieStore.set(func0_var8);
		} catch (e) {console.log(e)}

		try {
			var func0_var10 = undefined;
		} catch (e) {console.log(e)}

		return func0_var10;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'c6df2716');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func1_var0;
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = undefined;
		} catch (e) {console.log(e)}

		return func1_var1;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '1e900bc8');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = 'http://127.0.0.2:8080/input-235_page-1.html#00d522ae';
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = await self.importScripts(func2_var1);
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = {name: func2_var1, url: func2_var1, matchType: func2_var6, };
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = await self.cookieStore.get(func2_var5);
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = await self.cookieStore.get();
		} catch (e) {console.log(e)}

		try {
			var func2_var9 = undefined;
		} catch (e) {console.log(e)}

		return func2_var9;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'f09ff43b');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func3_var2;
		} catch (e) {console.log(e)}

async function func3_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '480ccc38');

			} catch (e) {console.log(e)}

			try {
				var func3_func0_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

async function func3_func0_func0(event) {
				try {
					check_site_violation('http://127.0.0.2:8080', location.origin, '740e749b');

				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var0 = await event.preventDefault();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var1 = await event.waitUntil(func3_var1);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var2 = await event.stopPropagation();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var3 = {name: self.origin, value: self.origin, };
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var4 = await self.cookieStore.set(func3_func0_func0_var3);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var5 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var6 = true;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var7 = false;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var8 = await event.initEvent(func3_func0_func0_var5,func3_func0_func0_var6,func3_func0_func0_var7);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var9 = await event.stopPropagation();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var10 = true;
				} catch (e) {console.log(e)}

				try {
					event.returnValue = func3_func0_func0_var10;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var11 = await event.preventDefault();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var12 = undefined;
				} catch (e) {console.log(e)}

				return func3_func0_func0_var12;
			}

			try {
				var func3_func0_var1 = {handleEvent: func3_func0_func0};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var2 = await self.cookieStore.addEventListener(func3_func0_var0,func3_func0_var1,func3_var2);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var3 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var4 = true;
			} catch (e) {console.log(e)}

			try {
				event.returnValue = func3_func0_var4;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var5 = '15c3';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var6 = await self.clients.get(func3_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var7 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var9 = 'starts-with';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var8 = {name: func3_func0_var0, url: func3_func0_var0, matchType: func3_func0_var9, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var10 = await self.cookieStore.get(func3_func0_var8);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var11 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var12 = event.data;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var13 = await func3_func0_var12.text();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var14 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var16 = 'unsafe-url';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var17 = 'cors';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var18 = 'include';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var19 = 'default';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var20 = 'error';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var15 = {method: func3_func0_var0, headers: '', body: func3_func0_var0, referrer: func3_func0_var0, referrerPolicy: func3_func0_var16, mode: func3_func0_var17, credentials: func3_func0_var18, cache: func3_func0_var19, redirect: func3_func0_var20, integrity: func3_func0_var0, keepalive: func3_func0_var4, window: event, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var21 = await self.fetch(func3_func0_var0,func3_func0_var15);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var22 = {};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var23 = await self.clients.matchAll(func3_func0_var22);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var24 = undefined;
			} catch (e) {console.log(e)}

			return func3_func0_var24;
		}

		try {
			self.onbackgroundfetchclick = func3_func0;
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await self.cookieStore.dispatchEvent(event);
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
            console.log('[UXSS] [sw-intercept-cookie-af36cdb6] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-92ec6792] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '7d749cc7');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func4_var0;
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
