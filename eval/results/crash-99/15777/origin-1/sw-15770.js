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
            console.log('[UXSS] [sw-intercept-cookie-7955e404] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-4b5153e6] ' + '127.0.0.1' + ' ' + splitPair[1]);
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
			check_site_violation('http://127.0.0.1:8080', location.origin, '3da0cc97');

		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var1 = 'foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var2 = 36;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var0 = await self.indexedDB.open(func0_var1,func0_var2);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var0.onupgradeneeded = eval;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var3 = new HTMLScriptElement();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var4 = await func0_var3.hasChildNodes();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var5 = new MediaSource();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-15770_page-1.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var6 = 'foo';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-15770_page-2.html#393df975');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-15770_page-2.html#0fef4160');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var10 = 'open';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var11 = 'named';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var9 = {mode: func0_var10, delegatesFocus: func0_var4, slotAssignment: func0_var11, };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var8 = await func0_var3.attachShadow(func0_var9);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var12 = await func0_var8.dispatchEvent(event);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-15770_page-1.html#0979dd19');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var13 = true;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			event.cancelBubble = func0_var13;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-15770_page-2.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-15770_page-2.html#c619e59e');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var14 = await func0_var8.contains(func0_var3);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var15 = 'http://127.0.0.1:8080/input-15770_page-1.html#3e802b56';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var16 = await func0_var5.addSourceBuffer(func0_var15);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-15770_page-1.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-15770_page-1.html');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var18 = 's32';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var17 = {format: func0_var18, sampleRate: func0_var2, numberOfFrames: func0_var2, numberOfChannels: func0_var2, timestamp: func0_var2, data: '', };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var19 = new AudioData(func0_var17);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var20 = {planeIndex: func0_var2, frameOffset: func0_var2, frameCount: func0_var2, format: func0_var18, };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var21 = await func0_var19.copyTo('',func0_var20);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-15770_page-2.html#42f49241');
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var22 = await func0_var5.clearLiveSeekableRange();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var23 = {};
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var24 = new LinearAccelerationSensor(func0_var23);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var25 = await func0_var24.dispatchEvent(event);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var26 = undefined;
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
