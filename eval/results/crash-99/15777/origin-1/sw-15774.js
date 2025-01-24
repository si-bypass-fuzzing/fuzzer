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
            console.log('[UXSS] [sw-intercept-cookie-eec5c206] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-cce1d56f] ' + '127.0.0.1' + ' ' + splitPair[1]);
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
			check_site_violation('http://127.0.0.1:8080', location.origin, '297dca8e');

		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var2 = 'data:text/html,foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var3 = new WebSocket(func0_var2,func0_var2);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var3.onclose = eval;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var4 = new Document();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var5 = 16;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var6 = -38;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var7 = await func0_var4.caretRangeFromPoint(func0_var5,func0_var6);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var8 = new CloseWatcher();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var8.oncancel = eval;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.2:8080/input-15774_page-1.html#7940c14c');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var10 = 'foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var11 = {detail: event, startTime: func0_var5, };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var9 = await self.performance.mark(func0_var10,func0_var11);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var12 = await func0_var9.toJSON();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var13 = 'data:blank';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var14 = {track: '', };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var15 = new TrackEvent(func0_var13,func0_var14);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var16 = await func0_var15.composedPath();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-15774_page-1.html#778a0b1a');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var17 = await func0_var7.getBoundingClientRect();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-15774_page-2.html#78b3dacc');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var18 = 'http://127.0.0.1:8080/input-15774_page-2.html#280d0bf5';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var19 = await func0_var8.addEventListener(func0_var18,null,self.isSecureContext);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var20 = undefined;
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
