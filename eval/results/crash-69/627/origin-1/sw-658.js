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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'd8f8e9b6');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-658_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-658_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin('http://127.0.0.2:8080/input-658_page-1.html#6de04802');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-658_page-2.html#51b45eba');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-658_page-1.html#ce9ee0e8');
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = 'http://127.0.0.1:8080/input-658_page-2.html#dfe4ba63';
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = await self.clients.openWindow(func0_var3);
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = undefined;
		} catch (e) {console.log(e)}

		return func0_var5;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '12199eb3');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = await self.cookieStore.getChangeSubscriptions();
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = 'lax';
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = {name: self.origin, domain: self.origin, secure: func1_var2, sameSite: func1_var3, };
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = await self.cookieStore.delete(func1_var1);
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
			check_site_violation('http://127.0.0.1:8080', location.origin, '1c26d7a6');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-658_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-658_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'http://127.0.0.1:8080/input-658_page-1.html#8f6a789c';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = await self.clients.openWindow(func2_var0);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-658_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-658_page-2.html#71147b5d');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.2:8080/input-658_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-658_page-2.html#b71c4038');
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = {name: func2_var0, url: func2_var0, matchType: func2_var3, };
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = await self.cookieStore.get(func2_var2);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-658_page-2.html');
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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'ec5969d4');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-658_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func3_var0 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			self.cookieStore.onchange = eval;
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func3_var2;
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = 'http://127.0.0.2:8080/input-658_page-1.html#0bdf8e18';
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await self.clients.openWindow(func3_var3);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.2:8080/input-658_page-1.html#ba32115a');
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
            console.log('[UXSS] [sw-intercept-cookie-888248af] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-18a807d9] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, 'e895d3db');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.2:8080/input-658_page-2.html#e634cbb5');
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = 'http://127.0.0.1:8080/input-658_page-1.html#59f8ad28';
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await self.clients.openWindow(func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = await func4_var3.focus();
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
