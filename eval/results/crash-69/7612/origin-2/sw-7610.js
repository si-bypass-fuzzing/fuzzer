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
			check_site_violation('http://127.0.0.2:8080', location.origin, '0d5b7b16');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = undefined;
		} catch (e) {console.log(e)}

		return func0_var0;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '22998602');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = await event.composedPath();
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
			check_site_violation('http://127.0.0.2:8080', location.origin, '2e94ddac');

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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'be63a97e');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func3_var0;
		} catch (e) {console.log(e)}

async function func3_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '03a44e64');

			} catch (e) {console.log(e)}

			try {
				var func3_func0_var0 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var1 = await event.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var2 = undefined;
			} catch (e) {console.log(e)}

			return func3_func0_var2;
		}

		try {
			self.onpush = func3_func0;
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await self.cookieStore.dispatchEvent(event);
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
            console.log('[UXSS] [sw-intercept-cookie-a965c449] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-8eb4704f] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '9ac978c4');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = -55;
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = -52;
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = 34;
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = 90;
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = 'none';
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = 'pixelated';
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = {colorSpaceConversion: func4_var6, resizeWidth: func4_var1, resizeHeight: func4_var1, resizeQuality: func4_var7, };
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = await self.createImageBitmap('',func4_var1,func4_var2,func4_var3,func4_var4,func4_var5);
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = await self.cookieStore.delete(func4_var10);
		} catch (e) {console.log(e)}

		try {
			var func4_var12 = 'http://127.0.0.1:8080/input-7610_page-1.html#6251c1a7';
		} catch (e) {console.log(e)}

		try {
			var func4_var13 = await self.cookieStore.removeEventListener(func4_var12,null,'');
		} catch (e) {console.log(e)}

		try {
			var func4_var14 = 'http://127.0.0.1:8080/input-7610_page-2.html#c15a7777';
		} catch (e) {console.log(e)}

		try {
			var func4_var15 = 'http://127.0.0.2:8080/input-7610_page-2.html#3c269cde';
		} catch (e) {console.log(e)}

		try {
			var func4_var17 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var18 = 'lax';
		} catch (e) {console.log(e)}

		try {
			var func4_var16 = {expires: func4_var1, domain: func4_var10, path: func4_var10, secure: func4_var17, httpOnly: func4_var17, sameSite: func4_var18, };
		} catch (e) {console.log(e)}

		try {
			var func4_var19 = await self.cookieStore.set(func4_var14,func4_var15,func4_var16);
		} catch (e) {console.log(e)}

		try {
			var func4_var20 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
