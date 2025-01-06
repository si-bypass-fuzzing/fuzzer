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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'c28a923e');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = await self.cookieStore.get(func0_var0);
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = true;
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = 'window';
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = {includeUncontrolled: func0_var4, type: func0_var5, };
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = await self.clients.matchAll(func0_var3);
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
			check_site_violation('http://127.0.0.2:8080', location.origin, '20586978');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 78;
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = 34;
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = 76;
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = 71;
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = 'none';
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = 'premultiply';
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = 'none';
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = 'pixelated';
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = {imageOrientation: func1_var5, premultiplyAlpha: func1_var6, colorSpaceConversion: func1_var7, resizeWidth: func1_var0, resizeHeight: func1_var0, resizeQuality: func1_var8, };
		} catch (e) {console.log(e)}

		try {
			var func1_var9 = await self.createImageBitmap('',func1_var0,func1_var1,func1_var2,func1_var3,func1_var4);
		} catch (e) {console.log(e)}

		try {
			var func1_var10 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, 'a4824704');

			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = 14;
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var1 = new Array(func1_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var2 = await self.cookieStore.subscribeToChanges(func1_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var3 = '28dc';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var4 = await self.clients.get(func1_func0_var3);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var5 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var6 = await self.cookieStore.get(func1_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var7 = 'http://127.0.0.1:8080/input-1229_page-2.html#2771aa58';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var8 = true;
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var9 = await event.initEvent(func1_func0_var7,func1_func0_var8);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var10 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var10;
		}

		try {
			var func1_var11 = {handleEvent: func1_func0};
		} catch (e) {console.log(e)}

		try {
			var func1_var12 = await self.cookieStore.removeEventListener(func1_var10,func1_var11,'');
		} catch (e) {console.log(e)}

		try {
			var func1_var13 = await self.cookieStore.dispatchEvent(event);
		} catch (e) {console.log(e)}

		try {
			var func1_var14 = undefined;
		} catch (e) {console.log(e)}

		return func1_var14;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '8fd19c22');

		} catch (e) {console.log(e)}

		try {
			var func2_var1 = 'strict-origin';
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = 'navigate';
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = 'include';
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = 'force-cache';
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = 'manual';
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = false;
		} catch (e) {console.log(e)}

		try {
			var func2_var0 = {method: self.origin, headers: '', body: self.origin, referrer: self.origin, referrerPolicy: func2_var1, mode: func2_var2, credentials: func2_var3, cache: func2_var4, redirect: func2_var5, integrity: self.origin, keepalive: func2_var6, window: event, };
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = await self.fetch(self.origin,func2_var0);
		} catch (e) {console.log(e)}

		try {
			var func2_var9 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = {url: self.origin, matchType: func2_var9, };
		} catch (e) {console.log(e)}

		try {
			var func2_var10 = await self.cookieStore.get(func2_var8);
		} catch (e) {console.log(e)}

		try {
			var func2_var11 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var12 = 'a041';
		} catch (e) {console.log(e)}

		try {
			var func2_var13 = await self.clients.get(func2_var12);
		} catch (e) {console.log(e)}

		try {
			var func2_var14 = undefined;
		} catch (e) {console.log(e)}

		return func2_var14;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '75e67843');

		} catch (e) {console.log(e)}

		try {
			var func3_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = 'all';
		} catch (e) {console.log(e)}

		try {
			var func3_var0 = {includeUncontrolled: func3_var1, type: func3_var2, };
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await self.clients.matchAll(func3_var0);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = await event.waitUntil(func3_var3);
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = {url: self.origin, matchType: func3_var7, };
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = await self.cookieStore.getAll(func3_var6);
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var10 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func3_var11 = undefined;
		} catch (e) {console.log(e)}

		return func3_var11;
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
            console.log('[UXSS] [sw-intercept-cookie-08f5c6a8] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-635279dc] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '1889edda');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = 'http://127.0.0.2:8080/input-1229_page-1.html#e4a17c0b';
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await event.initEvent(func4_var0,func4_var1,func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = '3bf3';
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = await self.clients.get(func4_var4);
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = '1982';
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = await self.clients.get(func4_var6);
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
