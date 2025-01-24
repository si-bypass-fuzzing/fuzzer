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
        if (splitPair[0] == 'sanitize' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-2b638bf7] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-570a5cc4] ' + '127.0.0.2' + ' ' + splitPair[1]);
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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'dff68422');

		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var0 = new HTMLBRElement();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var0.ontouchmove = eval;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var1 = new HTMLSourceElement();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var1.oncancel = eval;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var2 = 'http://127.0.0.2:8080/input-15772_page-1.html#ebb2054e';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var4 = new CSSLab(Infinity,Infinity,Infinity,Infinity);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var4.alpha = '';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var5 = 'http://127.0.0.2:8080/input-15772_page-2.html#7d194bae';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var6 = new BroadcastChannel(func0_var5);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var7 = await func0_var6.close();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var8 = 'http://127.0.0.1:8080/input-15772_page-2.html#e50baca8';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var9 = new CSSKeywordValue(func0_var8);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var10 = await func0_var9.toString();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var11 = new Array(event);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var12 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var13 = {lastModified: Infinity, };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var14 = new File(func0_var11,func0_var12,func0_var13);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var15 = await func0_var14.stream();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var16 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var18 = 'individualization-request';
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var19 = 37;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var20 = new ArrayBuffer(func0_var19,func0_var11);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var17 = {messageType: func0_var18, message: func0_var20, };
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var21 = new MediaKeyMessageEvent(func0_var16,func0_var17);
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var22 = await func0_var21.preventDefault();
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			func0_var1.onmousedown = eval;
		} catch (e) {console.log('JS_EXCEPTION',e);}
finally {console.log('JS_FINALLY');}

		try {
			var func0_var23 = undefined;
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
