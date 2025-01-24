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
			check_site_violation('http://127.0.0.2:8080', location.origin, '2eab7f0f');

		} catch (e) {console.log(e)}

		try {
			self.onactivate = eval;
		} catch (e) {console.log(e)}

		try {
			var func0_var0 = await self.cookieStore.getChangeSubscriptions();
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = true;
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = {includeUncontrolled: func0_var2, };
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await self.clients.matchAll(func0_var1);
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = await self.cookieStore.subscribeToChanges(func0_var0);
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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'b1858230');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = undefined;
		} catch (e) {console.log(e)}

		return func1_var0;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '12fa625b');

		} catch (e) {console.log(e)}

		try {
			var func2_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = 'window';
		} catch (e) {console.log(e)}

		try {
			var func2_var0 = {includeUncontrolled: func2_var1, type: func2_var2, };
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = await self.clients.matchAll(func2_var0);
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = undefined;
		} catch (e) {console.log(e)}

		return func2_var4;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'bc7666f5');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await event.waitUntil(func3_var0);
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = undefined;
		} catch (e) {console.log(e)}

		return func3_var2;
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
            console.log('[UXSS] [sw-intercept-cookie-01ec374e] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-633cee6a] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'c2c73d07');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func4_var2;
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch('http://127.0.0.2:8080/input-654_page-2.html#7b955f96').then((resp) => {if (resp.ok) {return resp;} else {return fetch(event.request);}}).catch((err) => {return fetch(event.request);}));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
