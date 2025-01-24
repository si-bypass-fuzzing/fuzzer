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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'c12d1c77');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = await self.removeEventListener(func0_var1,null,'');
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = undefined;
		} catch (e) {console.log(e)}

		return func0_var3;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '545142e5');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'http://127.0.0.1:8080/input-657_page-1.html#17598343';
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = await self.cookieStore.delete(func1_var0);
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '91f8b162');

			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = 'http://127.0.0.2:8080/input-657_page-2.html#db2e352e';
			} catch (e) {console.log(e)}

async function func1_func0_func0(event) {
				try {
					check_site_violation('http://127.0.0.2:8080', location.origin, '3c45f67a');

				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var0 = await event.stopPropagation();
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var1 = false;
				} catch (e) {console.log(e)}

				try {
					event.returnValue = func1_func0_func0_var1;
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var3 = 'worker';
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var2 = {includeUncontrolled: func1_func0_func0_var1, type: func1_func0_func0_var3, };
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var4 = await self.clients.matchAll(func1_func0_func0_var2);
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var5 = 'http://127.0.0.1:8080/input-657_page-2.html#16d99bcc';
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var6 = await self.clients.openWindow(func1_func0_func0_var5);
				} catch (e) {console.log(e)}

				try {
					var func1_func0_func0_var7 = undefined;
				} catch (e) {console.log(e)}

				return func1_func0_func0_var7;
			}

			try {
				var func1_func0_var1 = {handleEvent: func1_func0_func0};
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var2 = await self.cookieStore.removeEventListener(func1_func0_var0,func1_func0_var1,'');
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var3 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var3;
		}

		try {
			var func1_var3 = {handleEvent: func1_func0};
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = await self.cookieStore.removeEventListener(func1_var2,func1_var3,'');
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = await self.cookieStore.delete(func1_var5);
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = undefined;
		} catch (e) {console.log(e)}

		return func1_var8;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '2d0431ae');

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
			check_site_violation('http://127.0.0.2:8080', location.origin, '9dd0e47e');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = 'http://127.0.0.2:8080/input-657_page-2.html#3bc1b670';
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = await self.clients.openWindow(func3_var0);
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = 75;
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = new Array(func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await func3_var1.postMessage(event,func3_var3);
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func3_var5;
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = await func3_var1.focus();
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = undefined;
		} catch (e) {console.log(e)}

		return func3_var7;
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
            console.log('[UXSS] [sw-intercept-cookie-f42eeb0a] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-bb71d181] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '818dc277');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = await event.initEvent(func4_var1,func4_var2,func4_var3);
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = 'http://127.0.0.1:8080/input-657_page-1.html#9a5374ca';
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = await self.clients.openWindow(func4_var5);
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = await event.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = await event.initEvent(func4_var8,func4_var9,func4_var10);
		} catch (e) {console.log(e)}

		try {
			var func4_var12 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
