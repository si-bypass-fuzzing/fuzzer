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
	} catch (e) {console.log(e)}
async function func0(event) {
		try {
			await self.skipWaiting();
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, 'a86d646f');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = self.registration.cookies;
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = await func0_var2.subscribe(func0_var3);
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = await self.cookieStore.get(func0_var5);
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = 'http://127.0.0.1:8080/input-8337_page-1.html#838146ff';
		} catch (e) {console.log(e)}

		try {
			var func0_var9 = {tag: func0_var0, };
		} catch (e) {console.log(e)}

		try {
			var func0_var10 = new PeriodicSyncEvent(func0_var8,func0_var9);
		} catch (e) {console.log(e)}

		try {
			var func0_var11 = await func0_var10.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-8337_page-1.html#72ab68c5');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func0_var12 = 'http://127.0.0.2:8080/input-8337_page-2.html#ef196bab';
		} catch (e) {console.log(e)}

		try {
			var func0_var14 = await func0_var2.unsubscribe(func0_var3);
		} catch (e) {console.log(e)}

		try {
			var func0_var15 = 'http://127.0.0.2:8080/input-8337_page-1.html#2276c8ba';
		} catch (e) {console.log(e)}

		try {
			var func0_var17 = 'http://127.0.0.2:8080/input-8337_page-2.html#f8e798a7';
		} catch (e) {console.log(e)}

		try {
			var func0_var19 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var20 = {tag: func0_var0, lastChance: self.isSecureContext, };
		} catch (e) {console.log(e)}

		try {
			var func0_var21 = new SyncEvent(func0_var19,func0_var20);
		} catch (e) {console.log(e)}

		try {
			var func0_var22 = false;
		} catch (e) {console.log(e)}

		try {
			func0_var21.returnValue = func0_var22;
		} catch (e) {console.log(e)}

		try {
			var func0_var23 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func0_var24 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var25 = {id: func0_var0, };
		} catch (e) {console.log(e)}

		try {
			var func0_var26 = new ContentIndexEvent(func0_var24,func0_var25);
		} catch (e) {console.log(e)}

		try {
			var func0_var27 = await func0_var26.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func0_var28 = undefined;
		} catch (e) {console.log(e)}

		return func0_var28;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, 'bb859a15');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = await self.cookieStore.dispatchEvent(event);
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = {data: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = new PushEvent(func1_var3,func1_var4);
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = await func1_var5.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = 'http://127.0.0.1:8080/input-8337_page-2.html#678a0b3e';
		} catch (e) {console.log(e)}

		try {
			var func1_var9 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = {topOrigin: func1_var0, paymentRequestOrigin: func1_var0, modifiers: func1_var9, };
		} catch (e) {console.log(e)}

		try {
			var func1_var10 = new CanMakePaymentEvent(func1_var7,func1_var8);
		} catch (e) {console.log(e)}

		try {
			var func1_var11 = true;
		} catch (e) {console.log(e)}

		try {
			func1_var10.cancelBubble = func1_var11;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func1_var12 = self.navigator.hid;
		} catch (e) {console.log(e)}

		try {
			var func1_var13 = 'foo';
		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, 'ae9b61ed');

			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var1 = await self.cookieStore.delete(func1_func0_var0);
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var2 = 'http://127.0.0.2:8080/input-8337_page-2.html#a378a706';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var3 = {origin: func1_func0_var0, lastEventId: func1_func0_var0, ports: func1_var9, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var4 = new ExtendableMessageEvent(func1_func0_var2,func1_func0_var3);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var5 = await func1_func0_var4.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var6 = await func1_func0_var4.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var7 = true;
			} catch (e) {console.log(e)}

			try {
				event.cancelBubble = func1_func0_var7;
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-8337_page-2.html#cb5901d1');
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var8 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var9 = await func1_func0_var4.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var10 = await func1_func0_var4.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var11 = 'http://127.0.0.2:8080/input-8337_page-2.html#dfb44e90';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var12 = {changed: func1_var9, deleted: func1_var9, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var13 = new ExtendableCookieChangeEvent(func1_func0_var11,func1_func0_var12);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var14 = await func1_func0_var13.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var15 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var17 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var18 = new USBConnectionEvent(func1_func0_var17,func1_func0_var16);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var19 = false;
			} catch (e) {console.log(e)}

			try {
				func1_func0_var18.cancelBubble = func1_func0_var19;
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_url('data:text/html,%3Chtml%3E%5Cn%3Chead%3E%5Cn%3Cscript%3EIPCFuzzer.deactivate_renderer_checks%28%29%3B%5CnIPCFuzzer.activate_leak_sanitizer%28%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3Ebbb5af70%3C/h1%3E%3Cp%3Efoo%3C/p%3E%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%22f865f824%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E');
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var20 = await func1_var5.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var21 = await func1_var10.respondWith(func1_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var22 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var22;
		}

		try {
			var func1_var14 = {handleEvent: func1_func0};
		} catch (e) {console.log(e)}

		try {
			var func1_var15 = await func1_var12.removeEventListener(func1_var13,func1_var14,func1_var2);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-8337_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func1_var16 = {url: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var17 = await self.cookieStore.getAll(func1_var16);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin('http://127.0.0.1:8080/input-8337_page-2.html#c3131dbe');
		} catch (e) {console.log(e)}

		try {
			var func1_var18 = await func1_var5.preventDefault();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.1:8080/input-8337_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-8337_page-2.html#4d100f28');
		} catch (e) {console.log(e)}

		try {
			var func1_var19 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func1_var20 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var21 = false;
		} catch (e) {console.log(e)}

		try {
			var func1_var22 = await func1_var10.initEvent(func1_var19,func1_var20,func1_var21);
		} catch (e) {console.log(e)}

		try {
			var func1_var23 = 'http://127.0.0.2:8080/input-8337_page-1.html#20254ab2';
		} catch (e) {console.log(e)}

		try {
			var func1_var24 = {changed: func1_var9, deleted: func1_var9, };
		} catch (e) {console.log(e)}

		try {
			var func1_var25 = new ExtendableCookieChangeEvent(func1_var23,func1_var24);
		} catch (e) {console.log(e)}

		try {
			var func1_var26 = await func1_var25.waitUntil(func1_var17);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-8337_page-1.html#edbc158c');
		} catch (e) {console.log(e)}

		try {
			var func1_var27 = undefined;
		} catch (e) {console.log(e)}

		return func1_var27;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '60a7c1b3');

		} catch (e) {console.log(e)}

async function func2_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, 'ac9aa124');

			} catch (e) {console.log(e)}

			try {
				var func2_func0_var0 = self.registration.cookies;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var1 = await func2_func0_var0.getSubscriptions();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin('http://127.0.0.2:8080/input-8337_page-1.html#f0fcda39');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var2 = true;
			} catch (e) {console.log(e)}

			try {
				event.returnValue = func2_func0_var2;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var3 = event.data;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var4 = await func2_func0_var3.arrayBuffer();
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var5 = 'http://127.0.0.1:8080/input-8337_page-1.html#6be8de8a';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var6 = {};
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var7 = new InstallEvent(func2_func0_var5,func2_func0_var6);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var8 = await func2_func0_var7.composedPath();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_schemeful_site('data:text/html,foo');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-8337_page-2.html');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var9 = await func2_func0_var3.blob();
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var10 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var11 = await func2_func0_var0.unsubscribe(func2_func0_var1);
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-8337_page-2.html#34ee7727');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-8337_page-2.html');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var12 = 'http://127.0.0.1:8080/input-8337_page-1.html#af290940';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var13 = {id: func2_func0_var5, };
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var14 = new ContentIndexEvent(func2_func0_var12,func2_func0_var13);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var15 = await func2_func0_var14.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var16 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var17 = new AbortPaymentEvent(func2_func0_var16,func2_func0_var6);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var18 = await func2_func0_var17.composedPath();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var19 = undefined;
			} catch (e) {console.log(e)}

			return func2_func0_var19;
		}

		try {
			self.onpush = func2_func0;
		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8337_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = 'http://127.0.0.2:8080/input-8337_page-1.html#b9bcc81e';
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = {};
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = new PushSubscriptionChangeEvent(func2_var2,func2_var3);
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = await func2_var4.waitUntil(func2_var5);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.2:8080/input-8337_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-8337_page-2.html#fa6985ba');
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = undefined;
		} catch (e) {console.log(e)}

		return func2_var7;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, 'bdf11d34');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin('data:text/plain,foo');
		} catch (e) {console.log(e)}

		try {
			var func3_var0 = await self.clients.claim();
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = 'http://127.0.0.1:8080/input-8337_page-1.html#9322f42c';
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = await self.clients.openWindow(func3_var1);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-8337_page-1.html');
		} catch (e) {console.log(e)}

async function func3_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, 'ba80df37');

			} catch (e) {console.log(e)}

			try {
				var func3_func0_var0 = 'http://127.0.0.2:8080/input-8337_page-1.html#68791687';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var2 = new Array(event);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var1 = {changed: func3_func0_var2, deleted: func3_func0_var2, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var3 = new ExtendableCookieChangeEvent(func3_func0_var0,func3_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var4 = true;
			} catch (e) {console.log(e)}

			try {
				func3_func0_var3.returnValue = func3_func0_var4;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var5 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var7 = await event.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var8 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var9 = {};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var10 = new AbortPaymentEvent(func3_func0_var8,func3_func0_var9);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var11 = await func3_func0_var10.respondWith(func3_var0);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var12 = self.navigator.usb;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var13 = 'about:blank';
			} catch (e) {console.log(e)}

async function func3_func0_func0(event) {
				try {
					check_site_violation('http://127.0.0.1:8080', location.origin, '8f8b7c16');

				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var0 = 'http://127.0.0.2:8080/input-8337_page-1.html#67ba32d0';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var2 = await self.serviceWorker.dispatchEvent(event);
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-8337_page-2.html#e2a72dcb');
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var3 = 'http://127.0.0.1:8080/input-8337_page-2.html#9387ff6c';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var4 = {topOrigin: func3_func0_func0_var0, paymentRequestOrigin: func3_func0_func0_var0, methodData: func3_func0_var2, modifiers: func3_func0_var2, };
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var5 = new CanMakePaymentEvent(func3_func0_func0_var3,func3_func0_func0_var4);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var6 = false;
				} catch (e) {console.log(e)}

				try {
					func3_func0_func0_var5.cancelBubble = func3_func0_func0_var6;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var7 = 'http://127.0.0.1:8080/input-8337_page-1.html#8233d894';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var8 = new FetchEvent(func3_func0_func0_var7,func3_func0_var6);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var9 = await func3_func0_func0_var8.respondWith(func3_var0);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var10 = 'foo';
				} catch (e) {console.log(e)}

async function func3_func0_func0_func0(event) {
					try {
						check_site_violation('http://127.0.0.1:8080', location.origin, '28d1b775');

					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-8337_page-2.html#860c0527');
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var0 = 'http://127.0.0.2:8080/input-8337_page-1.html#1bb67ba9';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var1 = await func3_var2.navigate(func3_func0_func0_func0_var0);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var2 = 'foo';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var4 = await func3_func0_var12.getDevices();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var5 = await func3_func0_func0_var5.stopImmediatePropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var6 = await func3_func0_func0_var5.stopPropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var7 = self.navigator.hid;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var8 = await func3_func0_func0_func0_var7.dispatchEvent(event);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var9 = false;
					} catch (e) {console.log(e)}

					try {
						event.returnValue = func3_func0_func0_func0_var9;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var10 = await func3_func0_func0_var5.waitUntil(func3_func0_func0_func0_var1);
					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var11 = false;
					} catch (e) {console.log(e)}

					try {
						event.returnValue = func3_func0_func0_func0_var11;
					} catch (e) {console.log(e)}

					try {
						self.serviceWorker.onerror = eval;
					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_storage_key('http://127.0.0.2:8080/input-8337_page-2.html#ce5d69a9');
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var12 = 'foo';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var13 = await self.serviceWorker.on(func3_func0_func0_func0_var12);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var14 = 'foo';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var15 = {};
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var16 = new PushSubscriptionChangeEvent(func3_func0_func0_func0_var14,func3_func0_func0_func0_var15);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var17 = await func3_func0_func0_func0_var16.composedPath();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var18 = undefined;
					} catch (e) {console.log(e)}

					return func3_func0_func0_func0_var18;
				}

				try {
					var func3_func0_func0_var11 = {handleEvent: func3_func0_func0_func0};
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var12 = await self.serviceWorker.removeEventListener(func3_func0_func0_var10,func3_func0_func0_var11);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var13 = await event.preventDefault();
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_origin('http://127.0.0.2:8080/input-8337_page-1.html#d874b13c');
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var14 = event.data;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var15 = await func3_func0_func0_var14.blob();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var16 = 'http://127.0.0.1:8080/input-8337_page-1.html#677763e8';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var17 = false;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var18 = true;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var19 = await event.initEvent(func3_func0_func0_var16,func3_func0_func0_var17,func3_func0_func0_var18);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var20 = await func3_func0_var3.waitUntil(func3_var0);
				} catch (e) {console.log(e)}

				try {
					self.serviceWorker.onerror = eval;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var21 = true;
				} catch (e) {console.log(e)}

				try {
					func3_func0_func0_var5.returnValue = func3_func0_func0_var21;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var22 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var24 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var26 = 'http://127.0.0.2:8080/input-8337_page-1.html#7e264cf1';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var27 = new InstallEvent(func3_func0_func0_var26,func3_func0_var9);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var28 = await func3_func0_func0_var27.waitUntil(func3_var0);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var29 = 'http://127.0.0.2:8080/input-8337_page-1.html#a5e25c16';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var30 = true;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var31 = true;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var32 = await func3_func0_func0_var27.initEvent(func3_func0_func0_var29,func3_func0_func0_var30,func3_func0_func0_var31);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var33 = undefined;
				} catch (e) {console.log(e)}

				return func3_func0_func0_var33;
			}

			try {
				var func3_func0_var14 = {handleEvent: func3_func0_func0};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var15 = await func3_func0_var12.addEventListener(func3_func0_var13,func3_func0_var14,func3_func0_var4);
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_url_replace_host('http://127.0.0.2:8080/input-8337_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var16 = 'http://127.0.0.1:8080/input-8337_page-2.html#57326265';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var18 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var19 = {};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var20 = new PushSubscriptionChangeEvent(func3_func0_var18,func3_func0_var19);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var21 = await func3_func0_var20.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var22 = true;
			} catch (e) {console.log(e)}

			try {
				event.cancelBubble = func3_func0_var22;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var23 = self.navigator.hid;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var24 = await func3_func0_var23.dispatchEvent(event);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var25 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var27 = undefined;
			} catch (e) {console.log(e)}

			return func3_func0_var27;
		}

		try {
			self.onnotificationclose = func3_func0;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%223aa0c113%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B');
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await func3_var2.focus();
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = await self.cookieStore.getAll(func3_var5);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('about:blank');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
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
        if (splitPair[0] == 'sanitize' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-48f9b94c] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-14e0df16] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '89c13e9c');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = {data: event, origin: func4_var0, lastEventId: func4_var0, ports: func4_var2, };
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = new ExtendableMessageEvent(func4_var0,func4_var1);
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = await func4_var3.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = 'http://127.0.0.2:8080/input-8337_page-2.html#affdf04c';
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = self.navigator.hid;
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = {filters: func4_var2, exclusionFilters: func4_var2, };
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = await func4_var7.requestDevice(func4_var8);
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = await func4_var3.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var12 = {};
		} catch (e) {console.log(e)}

		try {
			var func4_var13 = new PushSubscriptionChangeEvent(func4_var11,func4_var12);
		} catch (e) {console.log(e)}

		try {
			var func4_var14 = await func4_var13.preventDefault();
		} catch (e) {console.log(e)}

		try {
			self.oninstall = eval;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-8337_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func4_var15 = await self.serviceWorker.dispatchEvent(event);
		} catch (e) {console.log(e)}

		try {
			func4_var7.onconnect = eval;
		} catch (e) {console.log(e)}

		try {
			var func4_var16 = {includeUserActivation: func4_var15, };
		} catch (e) {console.log(e)}

		try {
			var func4_var17 = await self.serviceWorker.postMessage(event,func4_var16);
		} catch (e) {console.log(e)}

		try {
			var func4_var18 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var19 = new USBConnectionEvent(func4_var18,func4_var6);
		} catch (e) {console.log(e)}

		try {
			var func4_var20 = await func4_var19.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func4_var21 = false;
		} catch (e) {console.log(e)}

		try {
			func4_var13.returnValue = func4_var21;
		} catch (e) {console.log(e)}

		try {
			var func4_var22 = await self.serviceWorker.postMessage(event,func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var24 = 'lax';
		} catch (e) {console.log(e)}

		try {
			var func4_var23 = {name: func4_var0, value: func4_var0, domain: func4_var0, expires: Infinity, sameSite: func4_var24, partitioned: func4_var15, };
		} catch (e) {console.log(e)}

		try {
			var func4_var25 = await self.cookieStore.set(func4_var23);
		} catch (e) {console.log(e)}

		try {
			var func4_var26 = func4_var19.device;
		} catch (e) {console.log(e)}

		try {
			var func4_var27 = await func4_var26.forget();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8337_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func4_var28 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
