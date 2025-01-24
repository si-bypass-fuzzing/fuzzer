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
	} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}
async function func0(event) {
		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
				for (const pair of event.request.headers.getSetCookie()) {
        splitPair = pair.split('=');
        if (splitPair[0] == 'sanitize' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-4ee4f6b1] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-4054336c] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			await self.skipWaiting();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, 'a542d5bd');

		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-15767_page-1.html#39ea62c1');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var0 = self.registration.navigationPreload;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var1 = await func0_var0.enable();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.1:8080/input-15767_page-2.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var3 = 'externref';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var2 = {element: func0_var3, initial: Infinity, };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var4 = new Table(func0_var2,event);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var5 = -16;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var6 = await func0_var4.get(func0_var5);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var7 = globalThis.document;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var8 = await func0_var7.hasChildNodes();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.2:8080/input-15767_page-2.html#e478fbab');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var9 = 'foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var10 = {beta: Infinity, gamma: Infinity, };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var11 = new DeviceOrientationEvent(func0_var9,func0_var10);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var12 = false;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var11.returnValue = func0_var12;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-15767_page-2.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.2:8080/input-15767_page-1.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var13 = false;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			event.returnValue = func0_var13;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var14 = new HTMLTextAreaElement();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var15 = 'data:text/plain,foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var14.ariaReadOnly = func0_var15;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-15767_page-2.html#ba0c024d');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-15767_page-1.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var16 = undefined;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}
	try {
		self.onactivate = func0;
	} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}
	try {
		self.onmessage = func0;
	} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}
	try {
		self.onpush = func0;
	} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}
	try {
		self.onfetch = func0;
	} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}
