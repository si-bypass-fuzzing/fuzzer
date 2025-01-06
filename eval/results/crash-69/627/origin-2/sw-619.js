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
			check_site_violation('http://127.0.0.2:8080', location.origin, '17de1927');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = '290d';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = await self.clients.get(func0_var0);
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = {name: func0_var0, value: func0_var0, };
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = await self.cookieStore.set(func0_var3);
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
			check_site_violation('http://127.0.0.2:8080', location.origin, '77146d9c');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = undefined;
		} catch (e) {console.log(e)}

		return func1_var1;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'e9be8164');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'http://127.0.0.2:8080/input-619_page-1.html#b1bf6ef2';
		} catch (e) {console.log(e)}

async function func2_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '512f3738');

			} catch (e) {console.log(e)}

			try {
				var func2_func0_var0 = {name: self.origin, value: self.origin, };
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var1 = await self.cookieStore.set(func2_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var3 = 'equals';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var2 = {name: self.origin, url: self.origin, matchType: func2_func0_var3, };
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var4 = await self.cookieStore.getAll(func2_func0_var2);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var5 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var6 = '0390';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var7 = await self.clients.get(func2_func0_var6);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var8 = undefined;
			} catch (e) {console.log(e)}

			return func2_func0_var8;
		}

		try {
			var func2_var1 = {handleEvent: func2_func0};
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = await self.cookieStore.removeEventListener(func2_var0,func2_var1,'');
		} catch (e) {console.log(e)}

		try {
			self.oninstall = eval;
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = {name: func2_var0, matchType: func2_var4, };
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = await self.cookieStore.getAll(func2_var3);
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = undefined;
		} catch (e) {console.log(e)}

		return func2_var6;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'd5d2c599');

		} catch (e) {console.log(e)}

		try {
			var func3_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = 'worker';
		} catch (e) {console.log(e)}

		try {
			var func3_var0 = {includeUncontrolled: func3_var1, type: func3_var2, };
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await self.clients.matchAll(func3_var0);
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = {name: self.origin, url: self.origin, matchType: func3_var5, };
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = await self.cookieStore.getAll(func3_var4);
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = event.data;
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = await func3_var7.json();
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = await self.cookieStore.get(func3_var4);
		} catch (e) {console.log(e)}

		try {
			var func3_var10 = undefined;
		} catch (e) {console.log(e)}

		return func3_var10;
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
            console.log('[UXSS] [sw-intercept-cookie-ab46997e] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-83f4f60b] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'ebcf5e0c');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = 'equals';
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = {name: self.origin, url: self.origin, matchType: func4_var4, };
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = await self.cookieStore.getAll(func4_var3);
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
