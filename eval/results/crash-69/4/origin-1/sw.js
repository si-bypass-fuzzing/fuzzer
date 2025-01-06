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
			check_site_violation('http://127.0.0.1:8080', location.origin, '86bdf29c');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-4_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func0_var0 = 'http://127.0.0.2:8080/input-4_page-1.html#e0be725e';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = await self.clients.openWindow(func0_var0);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.2:8080/input-4_page-1.html#ee2899c0');
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await event.waitUntil(func0_var1);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-4_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var3;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-4_page-1.html#ae189144');
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-4_page-1.html#ed60d540');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-4_page-1.html#f011d47a');
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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'c329d86e');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin('http://127.0.0.2:8080/input-4_page-2.html#7d6ca3ce');
		} catch (e) {console.log(e)}

		try {
			var func1_var0 = await self.cookieStore.getChangeSubscriptions();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin('http://127.0.0.1:8080/input-4_page-1.html#d24d94c0');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-4_page-1.html#8c38b58a');
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await self.cookieStore.getChangeSubscriptions();
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = 'foo';
		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, '2cf93e3d');

			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-4_page-1.html');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.1:8080/input-4_page-2.html');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-4_page-2.html#4f93c75d');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-4_page-1.html');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-4_page-2.html');
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = await self.cookieStore.subscribeToChanges(func1_var0);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var1 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var1;
		}

		try {
			var func1_var3 = {handleEvent: func1_func0};
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = await self.cookieStore.removeEventListener(func1_var2,func1_var3,'');
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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'a0f686a2');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-4_page-1.html#06935dca');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-4_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var0 = undefined;
		} catch (e) {console.log(e)}

		return func2_var0;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, 'e110d92e');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-4_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-4_page-1.html#3a1abeaa');
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func3_var1;
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = 'd1dd';
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await self.clients.get(func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = 'http://127.0.0.1:8080/input-4_page-1.html#f0c5e5b9';
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = true;
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = await event.initEvent(func3_var4,func3_var5,func3_var6);
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
            console.log('[UXSS] [sw-intercept-cookie-d1252f7d] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-958e274b] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '500be6fc');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-4_page-1.html#4ab4ae26');
		} catch (e) {console.log(e)}

		try {
			var func4_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await self.cookieStore.delete(func4_var0);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.2:8080/input-4_page-1.html#cb114c02');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-4_page-1.html#d6ef4080');
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
