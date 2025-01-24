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
            if (text.includes('127.0.0.1')) {
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
            if (text.includes('127.0.0.1')) {
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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'b3eac654');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await self.cookieStore.subscribeToChanges(func0_var1);
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await self.cookieStore.dispatchEvent(event);
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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'b6f22872');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-2932_page-2.html#780314e7');
		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'http://127.0.0.1:8080/input-2932_page-1.html#c522ba13';
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await self.atob(func1_var0);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-2932_page-1.html#2f99f47d');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-2932_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-2932_page-1.html');
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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'e90d03b5');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-2932_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func2_var0 = {url: self.origin, matchType: func2_var1, };
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = await self.cookieStore.get(func2_var0);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-2932_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = await self.cookieStore.delete(func2_var3);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.2:8080/input-2932_page-2.html#24ea256c');
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = undefined;
		} catch (e) {console.log(e)}

		return func2_var5;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '598b59ef');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-2932_page-2.html#739258db');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.2:8080/input-2932_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = event.data;
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = await func3_var1.blob();
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await func3_var1.blob();
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await event.stopImmediatePropagation();
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
        if (splitPair[0] == 'sanitize' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-a727519b] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-0e7c0de4] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '5a8e1c23');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-2932_page-2.html#c0ee409d');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-2932_page-2.html#1433f4b4');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-2932_page-2.html#c9e2b753');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-2932_page-2.html#b5c02d7f');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-2932_page-2.html#34401ca1');
		} catch (e) {console.log(e)}

		try {
			var func4_var0 = 'http://127.0.0.2:8080/input-2932_page-1.html#23455964';
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await self.clients.openWindow(func4_var0);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-2932_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = 'http://127.0.0.2:8080/input-2932_page-2.html#12093cf8';
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await func4_var1.navigate(func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch('http://127.0.0.2:8080/input-2932_page-2.html#834f5a32').then((resp) => {if (resp.ok) {return resp;} else {return fetch(event.request);}}).catch((err) => {return fetch(event.request);}));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
