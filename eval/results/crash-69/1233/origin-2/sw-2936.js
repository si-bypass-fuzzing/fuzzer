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
			check_site_violation('http://127.0.0.2:8080', location.origin, '0843c1ef');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = await event.waitUntil(func0_var0);
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await event.stopPropagation();
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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'd7db7937');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await self.cookieStore.subscribeToChanges(func1_var0);
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = await self.cookieStore.getChangeSubscriptions();
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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'e0277082');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
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
			check_site_violation('http://127.0.0.2:8080', location.origin, '7924df44');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = 23;
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await self.setTimeout(self.origin,func3_var0,event);
		} catch (e) {console.log(e)}

		try {
			self.onactivate = eval;
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = event.data;
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await func3_var2.arrayBuffer();
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await func3_var2.blob();
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = await func3_var2.text();
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = await self.clients.matchAll();
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = 'http://127.0.0.1:8080/input-2935_page-1.html#9596aa35';
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = await self.clients.openWindow(func3_var7);
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = '5d9c';
		} catch (e) {console.log(e)}

		try {
			var func3_var10 = await self.clients.get(func3_var9);
		} catch (e) {console.log(e)}

		try {
			var func3_var11 = await func3_var2.text();
		} catch (e) {console.log(e)}

		try {
			var func3_var12 = await self.cookieStore.getChangeSubscriptions();
		} catch (e) {console.log(e)}

		try {
			var func3_var13 = undefined;
		} catch (e) {console.log(e)}

		return func3_var13;
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
            console.log('[UXSS] [sw-intercept-cookie-9f21a25d] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-17a5b941] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'e0f750b7');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = {name: self.origin, url: self.origin, };
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await self.cookieStore.get(func4_var0);
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = 'http://127.0.0.2:8080/input-2935_page-1.html#576dabcd';
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await self.clients.openWindow(func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = 'window';
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = {includeUncontrolled: func4_var6, type: func4_var7, };
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = await self.clients.matchAll(func4_var5);
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = 'c1b7';
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = await self.clients.get(func4_var9);
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch('http://127.0.0.2:8080/input-2935_page-2.html#6c3d73df').then((resp) => {if (resp.ok) {return resp;} else {return fetch(event.request);}}).catch((err) => {return fetch(event.request);}));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
