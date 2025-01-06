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
			check_site_violation('http://127.0.0.2:8080', location.origin, '8a892d4b');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = 'http://127.0.0.1:8080/input-655_page-1.html#22940360';
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '66e3cbc1');

			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = 'http://127.0.0.2:8080/input-655_page-2.html#485e950e';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = await self.clients.openWindow(func0_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var2 = 'http://127.0.0.1:8080/input-655_page-1.html#5feb6dda';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var3 = await self.cookieStore.delete(func0_func0_var2);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var4 = 'http://127.0.0.2:8080/input-655_page-1.html#cc92b924';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var5 = await self.clients.openWindow(func0_func0_var4);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var6 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var6;
		}

		try {
			var func0_var2 = {handleEvent: func0_func0};
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await self.cookieStore.addEventListener(func0_var1,func0_var2,'');
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = undefined;
		} catch (e) {console.log(e)}

		return func0_var4;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '1e5822e5');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '088e8eb6');

			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = 'http://127.0.0.1:8080/input-655_page-2.html#0b4a955e';
			} catch (e) {console.log(e)}

async function func1_func0_func0(event) {
				try {
					check_site_violation('http://127.0.0.2:8080', location.origin, '22a060a9');

				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var0 = false;
				} catch (e) {console.log(e)}

				try {
					event.returnValue = func1_func0_func0_var0;
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var1 = {name: self.origin, value: self.origin, };
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var2 = await self.cookieStore.set(func1_func0_func0_var1);
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var3 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var4 = await self.cookieStore.getAll(func1_func0_func0_var3);
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var5 = undefined;
				} catch (e) {console.log(e)}

				return func1_func0_func0_var5;
			}

			try {
				var func1_func0_var1 = {handleEvent: func1_func0_func0};
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var2 = await self.cookieStore.addEventListener(func1_func0_var0,func1_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var3 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var4 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var4;
		}

		try {
			var func1_var1 = {handleEvent: func1_func0};
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = await self.cookieStore.addEventListener(func1_var0,func1_var1,'');
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = undefined;
		} catch (e) {console.log(e)}

		return func1_var3;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'fe6fa865');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = false;
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = 'worker';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = {includeUncontrolled: func2_var2, type: func2_var3, };
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = await self.clients.matchAll(func2_var1);
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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'ef49d117');

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
            console.log('[UXSS] [sw-intercept-cookie-62814ed7] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-022943e4] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '0800c1ec');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = await event.waitUntil(func4_var0);
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
