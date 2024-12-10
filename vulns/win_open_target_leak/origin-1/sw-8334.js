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
			check_site_violation('http://127.0.0.1:8080', location.origin, '917f834b');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('data:text/html,foo');
		} catch (e) {console.log(e)}

		try {
			var func0_var0 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = 'http://127.0.0.1:8080/input-8334_page-2.html#0182086f';
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await self.clients.openWindow(func0_var4);
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = {includeUserActivation: self.isSecureContext, };
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = await func0_var3.postMessage(event,func0_var5);
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var9 = {currency: func0_var1, value: func0_var1, };
		} catch (e) {console.log(e)}

		try {
			var func0_var10 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func0_var12 = 'pickup';
		} catch (e) {console.log(e)}

		try {
			var func0_var11 = {requestPayerName: self.isSecureContext, requestPayerEmail: self.isSecureContext, requestPayerPhone: self.isSecureContext, requestShipping: self.isSecureContext, shippingType: func0_var12, };
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = {topOrigin: func0_var1, paymentRequestOrigin: func0_var1, paymentRequestId: func0_var1, total: func0_var9, modifiers: func0_var10, instrumentKey: func0_var1, paymentOptions: func0_var11, shippingOptions: func0_var10, };
		} catch (e) {console.log(e)}

		try {
			var func0_var13 = new PaymentRequestEvent(func0_var7,func0_var8);
		} catch (e) {console.log(e)}

		try {
			var func0_var14 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func0_var15 = await func0_var13.respondWith(func0_var14);
		} catch (e) {console.log(e)}

		try {
			var func0_var16 = undefined;
		} catch (e) {console.log(e)}

		return func0_var16;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '05faf675');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = self.navigator.usb;
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = 'http://127.0.0.2:8080/input-8334_page-1.html#0754be46';
		} catch (e) {console.log(e)}

async function func1_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, 'c3ac051b');

			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-8334_page-1.html#989d2f48');
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var0 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var1 = {tag: func1_func0_var0, lastChance: self.isSecureContext, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var2 = new SyncEvent(func1_func0_var0,func1_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var3 = await func1_func0_var2.preventDefault();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-8334_page-1.html#086012f9');
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var4 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var6 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var7 = {};
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var8 = new InstallEvent(func1_func0_var6,func1_func0_var7);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var9 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var10 = false;
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var11 = false;
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var12 = await func1_func0_var8.initEvent(func1_func0_var9,func1_func0_var10,func1_func0_var11);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var13 = await func1_func0_var8.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-8334_page-1.html#6c68b4fb');
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var14 = 'http://127.0.0.2:8080/input-8334_page-1.html#5da1a37f';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var15 = {tag: func1_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var16 = new PeriodicSyncEvent(func1_func0_var14,func1_func0_var15);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var17 = true;
			} catch (e) {console.log(e)}

			try {
				func1_func0_var16.cancelBubble = func1_func0_var17;
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var18 = 'http://127.0.0.2:8080/input-8334_page-1.html#c4f28fe1';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var20 = new Array(event);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var19 = {topOrigin: func1_func0_var0, paymentRequestOrigin: func1_func0_var0, methodData: func1_func0_var20, modifiers: func1_func0_var20, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var21 = new CanMakePaymentEvent(func1_func0_var18,func1_func0_var19);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var22 = await func1_func0_var21.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var23 = 'data:text/plain,foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var25 = {currency: func1_func0_var0, value: func1_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var27 = 'delivery';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var26 = {requestPayerName: self.isSecureContext, requestPayerEmail: self.isSecureContext, requestPayerPhone: self.isSecureContext, requestShipping: self.isSecureContext, shippingType: func1_func0_var27, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var24 = {topOrigin: func1_func0_var0, paymentRequestOrigin: func1_func0_var0, paymentRequestId: func1_func0_var0, methodData: func1_func0_var20, total: func1_func0_var25, modifiers: func1_func0_var20, instrumentKey: func1_func0_var0, paymentOptions: func1_func0_var26, shippingOptions: func1_func0_var20, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var28 = new PaymentRequestEvent(func1_func0_var23,func1_func0_var24);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var29 = await func1_func0_var28.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var30 = await func1_func0_var8.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var31 = 'http://127.0.0.2:8080/input-8334_page-2.html#eae18075';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var32 = {id: func1_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var33 = new ContentIndexEvent(func1_func0_var31,func1_func0_var32);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var34 = await func1_func0_var33.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var35 = 'http://127.0.0.1:8080/input-8334_page-1.html#02a306b5';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var37 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var38 = await func1_func0_var2.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var39 = 'http://127.0.0.1:8080/input-8334_page-1.html#0cbd81cc';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var41 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var42 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var43 = new BackgroundFetchUpdateUIEvent(func1_func0_var42,func1_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var44 = await func1_func0_var43.updateUI();
			} catch (e) {console.log(e)}

			try {
				var func1_func0_var45 = undefined;
			} catch (e) {console.log(e)}

			return func1_func0_var45;
		}

		try {
			var func1_var2 = {handleEvent: func1_func0};
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = await func1_var0.addEventListener(func1_var1,func1_var2,self.isSecureContext);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-8334_page-2.html#ac5f59e2');
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = 'http://127.0.0.2:8080/input-8334_page-1.html#2d6bd939';
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = {};
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = new AbortPaymentEvent(func1_var6,func1_var7);
		} catch (e) {console.log(e)}

		try {
			var func1_var9 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func1_var10 = await func1_var8.waitUntil(func1_var9);
		} catch (e) {console.log(e)}

		try {
			func1_var0.ondisconnect = eval;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8334_page-2.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8334_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func1_var11 = false;
		} catch (e) {console.log(e)}

		try {
			func1_var8.cancelBubble = func1_var11;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-8334_page-2.html#3c2144f5');
		} catch (e) {console.log(e)}

		try {
			var func1_var12 = undefined;
		} catch (e) {console.log(e)}

		return func1_var12;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '2ce21885');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-8334_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = {id: func2_var0, };
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = new ContentIndexEvent(func2_var0,func2_var1);
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = false;
		} catch (e) {console.log(e)}

		try {
			func2_var2.cancelBubble = func2_var3;
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = 'data:text/html,%3Chtml%3E%5Cn%3Chead%3E%5Cn%3Cscript%3EIPCFuzzer.deactivate_renderer_checks%28%29%3B%5CnIPCFuzzer.activate_leak_sanitizer%28%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3E7edbde44%3C/h1%3E%3Cp%3Efoo%3C/p%3E%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%229142c81b%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E';
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = {tag: func2_var0, };
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = new PeriodicSyncEvent(func2_var4,func2_var5);
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = true;
		} catch (e) {console.log(e)}

		try {
			func2_var6.cancelBubble = func2_var7;
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = 'foo';
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-8334_page-1.html#7017fe54');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.1:8080/input-8334_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var10 = 'http://127.0.0.2:8080/input-8334_page-1.html#065b6458';
		} catch (e) {console.log(e)}

async function func2_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, '0063bb65');

			} catch (e) {console.log(e)}

			try {
				var func2_func0_var0 = 'data:blank';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var1 = {};
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var2 = new PushSubscriptionChangeEvent(func2_func0_var0,func2_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var3 = await func2_func0_var2.composedPath();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-8334_page-1.html');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin('http://127.0.0.2:8080/input-8334_page-2.html#1f853214');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var4 = 'data:text/html,%3Chtml%3E%5Cn%3Chead%3E%5Cn%3Cscript%3EIPCFuzzer.deactivate_renderer_checks%28%29%3B%5CnIPCFuzzer.activate_leak_sanitizer%28%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3E613fd553%3C/h1%3E%3Cp%3Efoo%3C/p%3E%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%22028e5aaa%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var5 = {tag: func2_func0_var0, lastChance: self.isSecureContext, };
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var6 = new SyncEvent(func2_func0_var4,func2_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var7 = await func2_func0_var6.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var8 = self.navigator.hid;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var9 = 'http://127.0.0.2:8080/input-8334_page-2.html#c7a4b0ff';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var10 = await func2_func0_var8.on(func2_func0_var9);
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-8334_page-2.html');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var11 = new Promise(eval);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var12 = await func2_func0_var6.waitUntil(func2_func0_var11);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var13 = await func2_func0_var10.subscribe();
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var14 = await func2_func0_var2.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var15 = undefined;
			} catch (e) {console.log(e)}

			return func2_func0_var15;
		}

		try {
			var func2_var11 = {handleEvent: func2_func0};
		} catch (e) {console.log(e)}

		try {
			var func2_var12 = await self.serviceWorker.addEventListener(func2_var10,func2_var11);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.1:8080/input-8334_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var13 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var15 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var16 = {};
		} catch (e) {console.log(e)}

		try {
			var func2_var17 = new PushSubscriptionChangeEvent(func2_var15,func2_var16);
		} catch (e) {console.log(e)}

		try {
			var func2_var18 = false;
		} catch (e) {console.log(e)}

		try {
			func2_var17.cancelBubble = func2_var18;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-8334_page-1.html#ad361fd2');
		} catch (e) {console.log(e)}

		try {
			var func2_var19 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var20 = {};
		} catch (e) {console.log(e)}

		try {
			var func2_var21 = new InstallEvent(func2_var19,func2_var20);
		} catch (e) {console.log(e)}

		try {
			var func2_var22 = await func2_var21.composedPath();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-8334_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var23 = 'http://127.0.0.2:8080/input-8334_page-2.html#1bd07b9d';
		} catch (e) {console.log(e)}

		try {
			var func2_var24 = false;
		} catch (e) {console.log(e)}

		try {
			var func2_var25 = false;
		} catch (e) {console.log(e)}

		try {
			var func2_var26 = await func2_var21.initEvent(func2_var23,func2_var24,func2_var25);
		} catch (e) {console.log(e)}

		try {
			var func2_var27 = 'data:blank';
		} catch (e) {console.log(e)}

		try {
			var func2_var29 = undefined;
		} catch (e) {console.log(e)}

		return func2_var29;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '9df623df');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = 'javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%22f920d512%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B';
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = true;
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = true;
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await event.initEvent(func3_var0,func3_var1,func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = true;
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = await event.initEvent(func3_var4,func3_var5,func3_var6);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%2242a45037%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B');
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = true;
		} catch (e) {console.log(e)}

		try {
			event.cancelBubble = func3_var8;
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = 'http://127.0.0.1:8080/input-8334_page-2.html#9b46dc4c';
		} catch (e) {console.log(e)}

		try {
			var func3_var11 = 35;
		} catch (e) {console.log(e)}

		try {
			var func3_var12 = new Array(func3_var11);
		} catch (e) {console.log(e)}

		try {
			var func3_var13 = {currency: func3_var0, value: func3_var0, };
		} catch (e) {console.log(e)}

		try {
			var func3_var15 = 'shipping';
		} catch (e) {console.log(e)}

		try {
			var func3_var14 = {requestPayerName: func3_var1, requestPayerPhone: func3_var1, requestShipping: func3_var1, shippingType: func3_var15, };
		} catch (e) {console.log(e)}

		try {
			var func3_var10 = {topOrigin: func3_var0, paymentRequestOrigin: func3_var0, paymentRequestId: func3_var0, methodData: func3_var12, total: func3_var13, modifiers: func3_var12, instrumentKey: func3_var0, paymentOptions: func3_var14, shippingOptions: func3_var12, };
		} catch (e) {console.log(e)}

		try {
			var func3_var16 = new PaymentRequestEvent(func3_var9,func3_var10);
		} catch (e) {console.log(e)}

		try {
			var func3_var17 = await func3_var16.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var18 = 'http://127.0.0.1:8080/input-8334_page-1.html#70105ff0';
		} catch (e) {console.log(e)}

async function func3_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, '9e47d160');

			} catch (e) {console.log(e)}

			try {
				var func3_func0_var0 = false;
			} catch (e) {console.log(e)}

			try {
				event.cancelBubble = func3_func0_var0;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var1 = self.navigator.usb;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var2 = 'data:text/plain,foo';
			} catch (e) {console.log(e)}

async function func3_func0_func0(event) {
				try {
					check_site_violation('http://127.0.0.1:8080', location.origin, '6c737b58');

				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var0 = {name: self.origin, url: self.origin, };
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var1 = await self.cookieStore.getAll(func3_func0_func0_var0);
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-8334_page-2.html');
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var2 = 'http://127.0.0.1:8080/input-8334_page-1.html#5a6be44e';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var3 = {tag: self.origin, };
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var4 = new PeriodicSyncEvent(func3_func0_func0_var2,func3_func0_func0_var3);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var5 = await func3_func0_func0_var4.stopPropagation();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var6 = self.navigator.hid;
				} catch (e) {console.log(e)}

				try {
					func3_func0_func0_var6.onconnect = eval;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var7 = event.data;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var8 = await func3_func0_func0_var7.blob();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var9 = 'foo';
				} catch (e) {console.log(e)}

async function func3_func0_func0_func0(event) {
					try {
						check_site_violation('http://127.0.0.1:8080', location.origin, '1e1ecadd');

					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var0 = 'http://127.0.0.1:8080/input-8334_page-1.html#683aa506';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var1 = {deleted: func3_var12, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var2 = new ExtendableCookieChangeEvent(func3_func0_func0_func0_var0,func3_func0_func0_func0_var1);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var3 = true;
					} catch (e) {console.log(e)}

					try {
						func3_func0_func0_func0_var2.returnValue = func3_func0_func0_func0_var3;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var4 = {filters: func3_var12, exclusionFilters: func3_var12, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var5 = await func3_func0_var1.requestDevice(func3_func0_func0_func0_var4);
					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_url('http://127.0.0.2:8080/input-8334_page-1.html#612c7dd8');
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var6 = 'foo';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var7 = {};
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var8 = new InstallEvent(func3_func0_func0_func0_var6,func3_func0_func0_func0_var7);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var9 = false;
					} catch (e) {console.log(e)}

					try {
						func3_func0_func0_func0_var8.cancelBubble = func3_func0_func0_func0_var9;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var10 = 'foo';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var11 = {tag: func3_func0_func0_func0_var0, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var12 = new SyncEvent(func3_func0_func0_func0_var10,func3_func0_func0_func0_var11);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var13 = await func3_func0_func0_func0_var12.stopPropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var14 = 'foo';
					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8334_page-1.html');
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var16 = 'http://127.0.0.2:8080/input-8334_page-2.html#8f15d3d5';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var18 = {};
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var19 = await self.structuredClone(event,func3_func0_func0_func0_var18);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var20 = await func3_func0_func0_var8.arrayBuffer();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var21 = 'http://127.0.0.1:8080/input-8334_page-2.html#3003dac0';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var22 = new BackgroundFetchEvent(func3_func0_func0_func0_var21,func3_func0_func0_func0_var17);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var23 = true;
					} catch (e) {console.log(e)}

					try {
						func3_func0_func0_func0_var22.cancelBubble = func3_func0_func0_func0_var23;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var24 = await func3_func0_func0_func0_var12.composedPath();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var25 = 'data:blank';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var26 = new BackgroundFetchUpdateUIEvent(func3_func0_func0_func0_var25,func3_func0_func0_func0_var17);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var27 = await func3_func0_func0_func0_var26.stopPropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var28 = 'foo';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var30 = undefined;
					} catch (e) {console.log(e)}

					return func3_func0_func0_func0_var30;
				}

				try {
					var func3_func0_func0_var10 = {handleEvent: func3_func0_func0_func0};
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var11 = await func3_func0_func0_var6.addEventListener(func3_func0_func0_var9,func3_func0_func0_var10,self.isSecureContext);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var12 = 'foo';
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-8334_page-2.html');
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var14 = 'http://127.0.0.2:8080/input-8334_page-2.html#df52ed35';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var15 = await self.clients.openWindow(func3_func0_func0_var14);
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_origin('http://127.0.0.2:8080/input-8334_page-2.html#f93617d5');
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var16 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var17 = await func3_var16.changeShippingOption(func3_func0_func0_var16);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var18 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var19 = {};
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var20 = new InstallEvent(func3_func0_func0_var18,func3_func0_func0_var19);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var21 = await func3_func0_func0_var20.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var22 = await func3_func0_func0_var20.preventDefault();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var23 = true;
				} catch (e) {console.log(e)}

				try {
					func3_func0_func0_var4.cancelBubble = func3_func0_func0_var23;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var24 = undefined;
				} catch (e) {console.log(e)}

				return func3_func0_func0_var24;
			}

			try {
				var func3_func0_var3 = {handleEvent: func3_func0_func0};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var4 = await func3_func0_var1.addEventListener(func3_func0_var2,func3_func0_var3,func3_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var5 = self.registration.cookies;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var6 = await func3_func0_var5.subscribe(func3_var12);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var7 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var8 = {tag: func3_func0_var2, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var9 = new PeriodicSyncEvent(func3_func0_var7,func3_func0_var8);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var10 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var11 = false;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var12 = false;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var13 = await func3_func0_var9.initEvent(func3_func0_var10,func3_func0_var11,func3_func0_var12);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var14 = 'http://127.0.0.2:8080/input-8334_page-1.html#43a9478c';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var16 = await func3_func0_var5.subscribe(func3_var12);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var17 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var18 = {changed: func3_var12, deleted: func3_var12, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var19 = new ExtendableCookieChangeEvent(func3_func0_var17,func3_func0_var18);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var20 = await func3_func0_var19.waitUntil(func3_func0_var6);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var21 = 'http://127.0.0.2:8080/input-8334_page-1.html#eaf7970b';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var23 = await func3_var16.respondWith(func3_func0_var6);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var24 = await func3_func0_var5.subscribe(func3_var12);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var25 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var26 = {};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var27 = new AbortPaymentEvent(func3_func0_var25,func3_func0_var26);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var28 = false;
			} catch (e) {console.log(e)}

			try {
				func3_func0_var27.returnValue = func3_func0_var28;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var29 = await func3_func0_var9.waitUntil(func3_func0_var6);
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_url_replace_host('http://127.0.0.2:8080/input-8334_page-2.html');
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var30 = undefined;
			} catch (e) {console.log(e)}

			return func3_func0_var30;
		}

		try {
			var func3_var19 = {handleEvent: func3_func0};
		} catch (e) {console.log(e)}

		try {
			var func3_var20 = await self.serviceWorker.removeEventListener(func3_var18,func3_var19,func3_var1);
		} catch (e) {console.log(e)}

		try {
			var func3_var21 = 'http://127.0.0.1:8080/input-8334_page-1.html#90a81242';
		} catch (e) {console.log(e)}

		try {
			var func3_var22 = {data: event, origin: func3_var0, lastEventId: func3_var0, ports: func3_var12, };
		} catch (e) {console.log(e)}

		try {
			var func3_var23 = new ExtendableMessageEvent(func3_var21,func3_var22);
		} catch (e) {console.log(e)}

		try {
			var func3_var24 = true;
		} catch (e) {console.log(e)}

		try {
			func3_var23.cancelBubble = func3_var24;
		} catch (e) {console.log(e)}

		try {
			var func3_var25 = event.data;
		} catch (e) {console.log(e)}

		try {
			var func3_var26 = await func3_var25.blob();
		} catch (e) {console.log(e)}

		try {
			var func3_var27 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var28 = {tag: func3_var0, };
		} catch (e) {console.log(e)}

		try {
			var func3_var29 = new PeriodicSyncEvent(func3_var27,func3_var28);
		} catch (e) {console.log(e)}

		try {
			var func3_var30 = await func3_var29.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var31 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var32 = await self.serviceWorker.removeEventListener(func3_var31,func3_var19,func3_var1);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-8334_page-2.html#0d2fd564');
		} catch (e) {console.log(e)}

		try {
			var func3_var33 = await func3_var29.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-8334_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func3_var34 = true;
		} catch (e) {console.log(e)}

		try {
			func3_var16.cancelBubble = func3_var34;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.2:8080/input-8334_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func3_var35 = await func3_var26.text();
		} catch (e) {console.log(e)}

		try {
			var func3_var36 = self.navigator.usb;
		} catch (e) {console.log(e)}

		try {
			func3_var36.ondisconnect = eval;
		} catch (e) {console.log(e)}

		try {
			var func3_var37 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var38 = await self.removeEventListener(func3_var37,func3_var19,func3_var1);
		} catch (e) {console.log(e)}

		try {
			var func3_var39 = undefined;
		} catch (e) {console.log(e)}

		return func3_var39;
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
            console.log('[UXSS] [sw-intercept-cookie-54a35f29] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-7a7e0bae] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '41728539');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = {tag: func4_var0, };
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = new PeriodicSyncEvent(func4_var0,func4_var1);
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = true;
		} catch (e) {console.log(e)}

		try {
			func4_var2.cancelBubble = func4_var3;
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = 'http://127.0.0.2:8080/input-8334_page-1.html#f9243539';
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = {};
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = new PushSubscriptionChangeEvent(func4_var4,func4_var5);
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = await func4_var6.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-8334_page-2.html#442bd037');
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = self.registration.cookies;
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = await func4_var8.getSubscriptions();
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = 'http://127.0.0.1:8080/input-8334_page-2.html#d314478f';
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = {data: func4_var0, };
		} catch (e) {console.log(e)}

		try {
			var func4_var12 = new PushEvent(func4_var10,func4_var11);
		} catch (e) {console.log(e)}

		try {
			var func4_var13 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var14 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var15 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var16 = await func4_var12.initEvent(func4_var13,func4_var14,func4_var15);
		} catch (e) {console.log(e)}

		try {
			var func4_var17 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var19 = 'data:text/html,%3Chtml%3E%5Cn%3Chead%3E%5Cn%3Cscript%3EIPCFuzzer.deactivate_renderer_checks%28%29%3B%5CnIPCFuzzer.activate_leak_sanitizer%28%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3Eadd3c52a%3C/h1%3E%3Cp%3Efoo%3C/p%3E%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%22d9b3f3c8%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E';
		} catch (e) {console.log(e)}

		try {
			var func4_var21 = 5;
		} catch (e) {console.log(e)}

		try {
			var func4_var22 = new Array(func4_var21);
		} catch (e) {console.log(e)}

		try {
			var func4_var20 = {topOrigin: func4_var0, methodData: func4_var22, modifiers: func4_var22, };
		} catch (e) {console.log(e)}

		try {
			var func4_var23 = new CanMakePaymentEvent(func4_var19,func4_var20);
		} catch (e) {console.log(e)}

		try {
			var func4_var24 = await func4_var23.waitUntil(func4_var9);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-8334_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func4_var25 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var26 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var27 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var28 = await func4_var23.initEvent(func4_var25,func4_var26,func4_var27);
		} catch (e) {console.log(e)}

		try {
			var func4_var29 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var30 = 'data:text/html,foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var32 = 'http://127.0.0.2:8080/input-8334_page-1.html#68cdb038';
		} catch (e) {console.log(e)}

async function func4_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, '56766137');

			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8334_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var0 = await func4_var8.getSubscriptions();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8334_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var1 = 'http://127.0.0.2:8080/input-8334_page-2.html#b9757a87';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var2 = true;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var3 = await func4_var12.initEvent(func4_func0_var1,func4_func0_var2);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var4 = 'about:blank';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var5 = {};
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var6 = new InstallEvent(func4_func0_var4,func4_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var7 = await func4_func0_var6.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var8 = 'http://127.0.0.2:8080/input-8334_page-1.html#5b4e2138';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var9 = new BackgroundFetchUpdateUIEvent(func4_func0_var8,func4_var31);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var10 = await func4_func0_var9.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var11 = 'http://127.0.0.2:8080/input-8334_page-2.html#9012f1b4';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var12 = new USBConnectionEvent(func4_func0_var11,func4_var18);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var13 = true;
			} catch (e) {console.log(e)}

			try {
				func4_func0_var12.cancelBubble = func4_func0_var13;
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_storage_key('data:text/html,%3Chtml%3E%5Cn%3Chead%3E%5Cn%3Cscript%3EIPCFuzzer.deactivate_renderer_checks%28%29%3B%5CnIPCFuzzer.activate_leak_sanitizer%28%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3E86d4de82%3C/h1%3E%3Cp%3Efoo%3C/p%3E%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%221c1d273b%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E');
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var14 = await func4_var8.getSubscriptions();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var15 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var16 = true;
			} catch (e) {console.log(e)}

			try {
				func4_var12.returnValue = func4_func0_var16;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var17 = await func4_var8.unsubscribe(func4_func0_var0);
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin('http://127.0.0.1:8080/input-8334_page-2.html#c26d7886');
			} catch (e) {console.log(e)}

			try {
				self.serviceWorker.onstatechange = eval;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var18 = await func4_func0_var9.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-8334_page-1.html#4dbec725');
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var19 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var20 = 'http://127.0.0.2:8080/input-8334_page-1.html#055f6aa0';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var21 = new AbortPaymentEvent(func4_func0_var20,func4_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var22 = await func4_func0_var21.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var23 = undefined;
			} catch (e) {console.log(e)}

			return func4_func0_var23;
		}

		try {
			var func4_var33 = {handleEvent: func4_func0};
		} catch (e) {console.log(e)}

		try {
			var func4_var34 = await self.serviceWorker.removeEventListener(func4_var32,func4_var33,func4_var3);
		} catch (e) {console.log(e)}

		try {
			var func4_var35 = await self.serviceWorker.postMessage(event,func4_var22);
		} catch (e) {console.log(e)}

		try {
			var func4_var36 = 'http://127.0.0.2:8080/input-8334_page-2.html#5b0952ad';
		} catch (e) {console.log(e)}

		try {
			var func4_var37 = {};
		} catch (e) {console.log(e)}

		try {
			var func4_var38 = new InstallEvent(func4_var36,func4_var37);
		} catch (e) {console.log(e)}

		try {
			var func4_var39 = await func4_var38.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var40 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var41 = {changed: func4_var22, deleted: func4_var22, };
		} catch (e) {console.log(e)}

		try {
			var func4_var42 = new ExtendableCookieChangeEvent(func4_var40,func4_var41);
		} catch (e) {console.log(e)}

		try {
			var func4_var43 = await func4_var42.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func4_var44 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func4_var45 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch('http://127.0.0.1:8080/input-8334_page-2.html#ee83b953').then((resp) => {if (resp.ok) {return resp;} else {return fetch(event.request);}}).catch((err) => {return fetch(event.request);}));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
