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
			check_site_violation('http://127.0.0.1:8080', location.origin, '4eb3b7bc');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-651_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin('http://127.0.0.1:8080/input-651_page-1.html#c781ce17');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-651_page-1.html#4e6d31b5');
		} catch (e) {console.log(e)}

		try {
			var func0_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-651_page-1.html#b09d9964');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-651_page-2.html');
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
			check_site_violation('http://127.0.0.1:8080', location.origin, '86d87757');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-651_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-651_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-651_page-1.html#b756e6cf');
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func1_var0 = {name: self.origin, url: self.origin, matchType: func1_var1, };
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = await self.cookieStore.getAll(func1_var0);
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-651_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-651_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-651_page-1.html');
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
			check_site_violation('http://127.0.0.1:8080', location.origin, '6bba258c');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-651_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-651_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-651_page-2.html#e0a32445');
		} catch (e) {console.log(e)}

		try {
			var func2_var0 = '8778';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = await self.clients.get(func2_var0);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-651_page-1.html#22764105');
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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'b014f7f2');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.1:8080/input-651_page-1.html');
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
			var func3_var5 = 'starts-with';
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = {name: self.origin, matchType: func3_var5, };
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = await self.cookieStore.get(func3_var4);
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = undefined;
		} catch (e) {console.log(e)}

		return func3_var8;
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
            console.log('[UXSS] [sw-intercept-cookie-482822e2] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-11112072] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '59f01979');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-651_page-1.html#31b5decc');
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var0 = {includeUncontrolled: func4_var1, };
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = await self.clients.matchAll(func4_var0);
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await self.cookieStore.dispatchEvent(event);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.2:8080/input-651_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.1:8080/input-651_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-651_page-2.html#f8c35b29');
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func4_var4;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.2:8080/input-651_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-651_page-1.html#689b0db2');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.2:8080/input-651_page-1.html#d6eb59bb');
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = await self.cookieStore.delete(func4_var5);
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
