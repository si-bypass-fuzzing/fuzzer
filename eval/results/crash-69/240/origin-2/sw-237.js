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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'b4f0fac5');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = true;
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await event.initEvent(func0_var0,func0_var1,func0_var2);
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var4;
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = false;
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = false;
		} catch (e) {console.log(e)}

		try {
			var func0_var9 = await event.initEvent(func0_var6,func0_var7,func0_var8);
		} catch (e) {console.log(e)}

		try {
			var func0_var10 = 'http://127.0.0.1:8080/input-237_page-1.html#5767801f';
		} catch (e) {console.log(e)}

		try {
			var func0_var11 = await self.clients.openWindow(func0_var10);
		} catch (e) {console.log(e)}

		try {
			var func0_var12 = undefined;
		} catch (e) {console.log(e)}

		return func0_var12;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '64b5bc82');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'http://127.0.0.1:8080/input-237_page-1.html#73982ed5';
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await self.cookieStore.addEventListener(func1_var0,null,'');
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = false;
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = 'strict';
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = {name: func1_var0, domain: func1_var0, path: func1_var0, secure: func1_var3, sameSite: func1_var4, };
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = await self.cookieStore.delete(func1_var2);
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = 'all';
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = {includeUncontrolled: func1_var3, type: func1_var7, };
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = await self.clients.matchAll(func1_var6);
		} catch (e) {console.log(e)}

		try {
			var func1_var9 = {name: func1_var0, value: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var10 = await self.cookieStore.set(func1_var9);
		} catch (e) {console.log(e)}

		try {
			var func1_var11 = undefined;
		} catch (e) {console.log(e)}

		return func1_var11;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '8dfd60e2');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = 'ef37';
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = await self.clients.get(func2_var1);
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = undefined;
		} catch (e) {console.log(e)}

		return func2_var3;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'b50d4561');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func3_var0;
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = '087b';
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = await self.clients.get(func3_var1);
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = 'http://127.0.0.1:8080/input-237_page-1.html#1dc902fb';
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await self.cookieStore.delete(func3_var3);
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = await event.waitUntil(func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = event.data;
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = await func3_var6.arrayBuffer();
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = await func3_var6.arrayBuffer();
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
            console.log('[UXSS] [sw-intercept-cookie-1616970f] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-e2f51c72] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '169c9781');

		} catch (e) {console.log(e)}

		try {
			var func4_var1 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func4_var0 = {name: self.origin, url: self.origin, matchType: func4_var1, };
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = await self.cookieStore.getAll(func4_var0);
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = await event.initEvent(func4_var3,func4_var4,func4_var5);
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = 'all';
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = {includeUncontrolled: func4_var4, type: func4_var9, };
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = await self.clients.matchAll(func4_var8);
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
