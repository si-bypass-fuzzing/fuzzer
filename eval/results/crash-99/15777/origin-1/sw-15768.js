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
            console.log('[UXSS] [sw-intercept-cookie-cc37aea2] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-c5ba6ff6] ' + '127.0.0.1' + ' ' + splitPair[1]);
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
			check_site_violation('http://127.0.0.1:8080', location.origin, '62b717c3');

		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-15768_page-1.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var0 = 'foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var1 = 82;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var2 = new Array(func0_var1);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var3 = new CSSParserAtRule(func0_var0,func0_var2,func0_var2);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var4 = await func0_var3.toString();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var5 = 84;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var6 = -12;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var7 = 'foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var8 = new DataCue(func0_var5,func0_var6,event,func0_var7);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var9 = '5aa4';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var8.id = func0_var9;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.2:8080/input-15768_page-2.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.2:8080/input-15768_page-1.html#0c4eaa25');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var10 = new HTMLTrackElement();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var11 = 'foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var12 = self.navigator.gpu;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var14 = 'high-performance';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var13 = {powerPreference: func0_var14, forceFallbackAdapter: self.isSecureContext, };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var15 = await func0_var12.requestAdapter(func0_var13);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var16 = 'http://127.0.0.1:8080/input-15768_page-1.html#dfca765e';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var17 = new PresentationRequest(func0_var16);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var18 = await func0_var17.start();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-15768_page-2.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var19 = -67;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var8.endTime = func0_var19;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var20 = undefined;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			event.respondWith(fetch('http://127.0.0.2:8080/input-15768_page-2.html#8939115e').then((resp) => {if (resp.ok) {return resp;} else {return fetch(event.request);}}).catch((err) => {return fetch(event.request);}));
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
