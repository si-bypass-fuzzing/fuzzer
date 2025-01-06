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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'e15503cb');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = 'http://127.0.0.2:8080/input-7608_page-1.html#692042ef';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = await self.cookieStore.delete(func0_var0);
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var3;
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = undefined;
		} catch (e) {console.log(e)}

		return func0_var4;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '199de76c');

		} catch (e) {console.log(e)}

		try {
			var func1_var1 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = 'sharedworker';
		} catch (e) {console.log(e)}

		try {
			var func1_var0 = {includeUncontrolled: func1_var1, type: func1_var2, };
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = await self.clients.matchAll(func1_var0);
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = 'http://127.0.0.2:8080/input-7608_page-1.html#76e10ab0';
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = await self.clients.openWindow(func1_var5);
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = 'http://127.0.0.1:8080/input-7608_page-1.html#0ec48973';
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = await func1_var4.navigate(func1_var6);
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = undefined;
		} catch (e) {console.log(e)}

		return func1_var8;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '4227a33b');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'http://127.0.0.1:8080/input-7608_page-1.html#0d3c572b';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = 'http://127.0.0.2:8080/input-7608_page-2.html#08d6501e';
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = false;
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = 'lax';
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = {domain: func2_var0, path: func2_var0, secure: func2_var3, httpOnly: func2_var3, sameSite: func2_var4, };
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = await self.cookieStore.set(func2_var0,func2_var1,func2_var2);
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = 'http://127.0.0.2:8080/input-7608_page-1.html#ed82bfde';
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = await self.cookieStore.set(func2_var6,func2_var7,func2_var2);
		} catch (e) {console.log(e)}

		try {
			var func2_var9 = 'http://127.0.0.1:8080/input-7608_page-2.html#38a4a456';
		} catch (e) {console.log(e)}

		try {
			var func2_var10 = await self.clients.openWindow(func2_var9);
		} catch (e) {console.log(e)}

		try {
			var func2_var11 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var13 = 'starts-with';
		} catch (e) {console.log(e)}

		try {
			var func2_var12 = {name: func2_var0, url: func2_var0, matchType: func2_var13, };
		} catch (e) {console.log(e)}

		try {
			var func2_var14 = await self.cookieStore.getAll(func2_var12);
		} catch (e) {console.log(e)}

		try {
			var func2_var15 = 95;
		} catch (e) {console.log(e)}

		try {
			var func2_var16 = new Array(func2_var15);
		} catch (e) {console.log(e)}

		try {
			var func2_var17 = await func2_var10.postMessage(event,func2_var16);
		} catch (e) {console.log(e)}

		try {
			var func2_var18 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var19 = '0c2b';
		} catch (e) {console.log(e)}

		try {
			var func2_var20 = await self.clients.get(func2_var19);
		} catch (e) {console.log(e)}

		try {
			var func2_var21 = undefined;
		} catch (e) {console.log(e)}

		return func2_var21;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '7bacef9e');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await event.waitUntil(func3_var0);
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = undefined;
		} catch (e) {console.log(e)}

		return func3_var2;
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
            console.log('[UXSS] [sw-intercept-cookie-00b4fab7] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-2dce5d1f] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '0990a5ad');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await self.cookieStore.dispatchEvent(event);
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
