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
			check_site_violation('http://127.0.0.1:8080', location.origin, 'fc9282d3');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = false;
		} catch (e) {console.log(e)}

		try {
			event.cancelBubble = func0_var0;
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = 'http://127.0.0.1:8080/input-8341_page-2.html#36a5cf3e';
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, 'ed249234');

			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-8341_page-2.html');
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = 'http://127.0.0.1:8080/input-8341_page-2.html#fe9068a0';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = await self.clients.openWindow(func0_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var2 = 'http://127.0.0.1:8080/input-8341_page-1.html#492170ff';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var3 = await self.clients.openWindow(func0_func0_var2);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var4 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var5 = {};
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var6 = new AbortPaymentEvent(func0_func0_var4,func0_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var7 = await func0_func0_var6.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var8 = await func0_func0_var6.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var9 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var11 = new Array(event);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var12 = {currency: func0_func0_var0, value: func0_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var14 = 'delivery';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var13 = {requestPayerName: self.isSecureContext, requestPayerEmail: self.isSecureContext, requestShipping: self.isSecureContext, shippingType: func0_func0_var14, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var10 = {topOrigin: func0_func0_var0, paymentRequestOrigin: func0_func0_var0, paymentRequestId: func0_func0_var0, methodData: func0_func0_var11, total: func0_func0_var12, modifiers: func0_func0_var11, instrumentKey: func0_func0_var0, paymentOptions: func0_func0_var13, shippingOptions: func0_func0_var11, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var15 = new PaymentRequestEvent(func0_func0_var9,func0_func0_var10);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var16 = await func0_func0_var15.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var17 = 'http://127.0.0.1:8080/input-8341_page-1.html#c660c9f1';
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8341_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var19 = 'http://127.0.0.2:8080/input-8341_page-2.html#d36aa313';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var20 = new BackgroundFetchEvent(func0_func0_var19,func0_func0_var18);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var21 = await func0_func0_var20.waitUntil(func0_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var22 = -79;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var23 = await self.setInterval(func0_func0_var1,func0_func0_var22,event);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var24 = await event.waitUntil(func0_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var25 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8341_page-2.html');
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var26 = 'http://127.0.0.1:8080/input-8341_page-1.html#dad0413b';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var28 = await func0_func0_var6.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var29 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var30 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var30;
		}

		try {
			self.onbackgroundfetchsuccess = func0_func0;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-8341_page-1.html');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-8341_page-2.html#55e80691');
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = self.navigator.usb;
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = await func0_var4.dispatchEvent(event);
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = {data: func0_var2, };
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = new PushEvent(func0_var6,func0_var7);
		} catch (e) {console.log(e)}

		try {
			var func0_var9 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var10 = await func0_var8.initEvent(func0_var9);
		} catch (e) {console.log(e)}

		try {
			var func0_var11 = 'http://127.0.0.2:8080/input-8341_page-2.html#ec7c58f7';
		} catch (e) {console.log(e)}

		try {
			var func0_var12 = await self.cookieStore.delete(func0_var11);
		} catch (e) {console.log(e)}

		try {
			var func0_var13 = self.navigator.hid;
		} catch (e) {console.log(e)}

		try {
			var func0_var14 = 'foo';
		} catch (e) {console.log(e)}

async function func0_func1(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, '3ee6f646');

			} catch (e) {console.log(e)}

			try {
				var func0_func1_var0 = await event.waitUntil(func0_var12);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var1 = 'http://127.0.0.2:8080/input-8341_page-1.html#2df8d51e';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var3 = new Array(event);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var4 = {currency: func0_func1_var1, value: func0_func1_var1, };
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var6 = 'delivery';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var5 = {requestPayerName: self.isSecureContext, requestPayerEmail: self.isSecureContext, requestPayerPhone: self.isSecureContext, requestShipping: self.isSecureContext, shippingType: func0_func1_var6, };
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var2 = {topOrigin: func0_func1_var1, paymentRequestOrigin: func0_func1_var1, paymentRequestId: func0_func1_var1, methodData: func0_func1_var3, total: func0_func1_var4, instrumentKey: func0_func1_var1, paymentOptions: func0_func1_var5, shippingOptions: func0_func1_var3, };
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var7 = new PaymentRequestEvent(func0_func1_var1,func0_func1_var2);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var8 = await func0_func1_var7.waitUntil(func0_var12);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var9 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var11 = 'javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%2212faed6f%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var12 = new USBConnectionEvent(func0_func1_var11,func0_func1_var10);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var13 = true;
			} catch (e) {console.log(e)}

			try {
				func0_func1_var12.cancelBubble = func0_func1_var13;
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var14 = 'foo';
			} catch (e) {console.log(e)}

async function func0_func1_func0(event) {
				try {
					check_site_violation('http://127.0.0.1:8080', location.origin, 'f239ea0a');

				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var0 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var1 = new ExtendableCookieChangeEvent(func0_func1_func0_var0);
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var2 = await func0_func1_func0_var1.composedPath();
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var3 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var4 = new NotificationEvent(func0_func1_func0_var3,func0_var3);
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var5 = false;
				} catch (e) {console.log(e)}

				try {
					func0_func1_func0_var4.cancelBubble = func0_func1_func0_var5;
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var6 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var7 = {id: func0_func1_func0_var0, };
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var8 = new ContentIndexEvent(func0_func1_func0_var6,func0_func1_func0_var7);
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var9 = false;
				} catch (e) {console.log(e)}

				try {
					func0_func1_func0_var8.returnValue = func0_func1_func0_var9;
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var10 = await func0_func1_var12.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var11 = self.registration.cookies;
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var12 = await func0_func1_func0_var11.getSubscriptions();
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var13 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var15 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var16 = await func0_var13.on(func0_func1_func0_var15);
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var17 = await event.addRoutes('');
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-8341_page-1.html');
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_url('http://127.0.0.2:8080/input-8341_page-1.html#ef642c3f');
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var18 = await func0_var8.waitUntil(func0_func1_func0_var12);
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var19 = await func0_func1_func0_var16.subscribe('');
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var21 = 'all';
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var20 = {includeUncontrolled: func0_func1_func0_var5, type: func0_func1_func0_var21, };
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var22 = await self.clients.matchAll(func0_func1_func0_var20);
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_origin('http://127.0.0.2:8080/input-8341_page-2.html#5bc77762');
				} catch (e) {console.log(e)}

				try {
					var func0_func1_func0_var23 = undefined;
				} catch (e) {console.log(e)}

				return func0_func1_func0_var23;
			}

			try {
				var func0_func1_var15 = {handleEvent: func0_func1_func0};
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var16 = await func0_var4.addEventListener(func0_func1_var14,func0_func1_var15,self.isSecureContext);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var17 = 'http://127.0.0.2:8080/input-8341_page-2.html#a9047a65';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var19 = false;
			} catch (e) {console.log(e)}

			try {
				event.returnValue = func0_func1_var19;
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var20 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var21 = {};
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var22 = new AbortPaymentEvent(func0_func1_var20,func0_func1_var21);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var23 = true;
			} catch (e) {console.log(e)}

			try {
				func0_func1_var22.cancelBubble = func0_func1_var23;
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var24 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var25 = false;
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var26 = await func0_func1_var22.initEvent(func0_func1_var24,func0_func1_var25);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var27 = {country: func0_func1_var1, addressLine: func0_func1_var3, region: func0_func1_var1, city: func0_func1_var1, dependentLocality: func0_func1_var1, postalCode: func0_func1_var1, sortingCode: func0_func1_var1, organization: func0_func1_var1, recipient: func0_func1_var1, phone: func0_func1_var1, };
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var28 = await func0_func1_var7.changeShippingAddress(func0_func1_var27);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var29 = await func0_func1_var12.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var30 = false;
			} catch (e) {console.log(e)}

			try {
				func0_func1_var7.returnValue = func0_func1_var30;
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var31 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var33 = await func0_var4.dispatchEvent(event);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var34 = 'http://127.0.0.1:8080/input-8341_page-1.html#f1aff4a4';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var35 = {paymentRequestOrigin: func0_func1_var1, modifiers: func0_func1_var3, };
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var36 = new CanMakePaymentEvent(func0_func1_var34,func0_func1_var35);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var37 = true;
			} catch (e) {console.log(e)}

			try {
				func0_func1_var36.cancelBubble = func0_func1_var37;
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_url_replace_host('http://127.0.0.2:8080/input-8341_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var38 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var39 = await self.cookieStore.get(func0_func1_var38);
			} catch (e) {console.log(e)}

			try {
				var func0_func1_var40 = undefined;
			} catch (e) {console.log(e)}

			return func0_func1_var40;
		}

		try {
			var func0_var15 = {handleEvent: func0_func1};
		} catch (e) {console.log(e)}

		try {
			var func0_var16 = await func0_var13.removeEventListener(func0_var14,func0_var15,func0_var0);
		} catch (e) {console.log(e)}

		try {
			var func0_var17 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func0_var19 = 49;
		} catch (e) {console.log(e)}

		try {
			var func0_var20 = new Array(func0_var19);
		} catch (e) {console.log(e)}

		try {
			var func0_var18 = {changed: func0_var20, deleted: func0_var20, };
		} catch (e) {console.log(e)}

		try {
			var func0_var21 = new ExtendableCookieChangeEvent(func0_var17,func0_var18);
		} catch (e) {console.log(e)}

		try {
			var func0_var22 = await func0_var21.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var23 = 'http://127.0.0.1:8080/input-8341_page-1.html#e07dbdac';
		} catch (e) {console.log(e)}

		try {
			var func0_var24 = {tag: func0_var2, };
		} catch (e) {console.log(e)}

		try {
			var func0_var25 = new PeriodicSyncEvent(func0_var23,func0_var24);
		} catch (e) {console.log(e)}

		try {
			var func0_var26 = await func0_var25.waitUntil(func0_var12);
		} catch (e) {console.log(e)}

		try {
			var func0_var27 = 'data:text/html,%3Chtml%3E%5Cn%3Chead%3E%5Cn%3Cscript%3EIPCFuzzer.deactivate_renderer_checks%28%29%3B%5CnIPCFuzzer.activate_leak_sanitizer%28%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3Ea2f00776%3C/h1%3E%3Cp%3Efoo%3C/p%3E%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%2204a19041%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E';
		} catch (e) {console.log(e)}

		try {
			var func0_var28 = {topOrigin: func0_var2, paymentRequestOrigin: func0_var2, methodData: func0_var20, };
		} catch (e) {console.log(e)}

		try {
			var func0_var29 = new CanMakePaymentEvent(func0_var27,func0_var28);
		} catch (e) {console.log(e)}

		try {
			var func0_var30 = false;
		} catch (e) {console.log(e)}

		try {
			func0_var29.cancelBubble = func0_var30;
		} catch (e) {console.log(e)}

		try {
			var func0_var31 = 'http://127.0.0.1:8080/input-8341_page-2.html#b3807514';
		} catch (e) {console.log(e)}

		try {
			var func0_var33 = {currency: func0_var2, value: func0_var2, };
		} catch (e) {console.log(e)}

		try {
			var func0_var35 = 'pickup';
		} catch (e) {console.log(e)}

		try {
			var func0_var34 = {requestPayerName: func0_var0, requestPayerEmail: func0_var0, requestPayerPhone: func0_var0, requestShipping: func0_var0, shippingType: func0_var35, };
		} catch (e) {console.log(e)}

		try {
			var func0_var32 = {topOrigin: func0_var2, paymentRequestOrigin: func0_var2, methodData: func0_var20, total: func0_var33, modifiers: func0_var20, instrumentKey: func0_var2, paymentOptions: func0_var34, shippingOptions: func0_var20, };
		} catch (e) {console.log(e)}

		try {
			var func0_var36 = new PaymentRequestEvent(func0_var31,func0_var32);
		} catch (e) {console.log(e)}

		try {
			var func0_var37 = 'http://127.0.0.2:8080/input-8341_page-1.html#728b69f0';
		} catch (e) {console.log(e)}

		try {
			var func0_var38 = await func0_var36.openWindow(func0_var37);
		} catch (e) {console.log(e)}

		try {
			var func0_var39 = 'http://127.0.0.2:8080/input-8341_page-1.html#4d32de6c';
		} catch (e) {console.log(e)}

		try {
			var func0_var40 = {tag: func0_var2, lastChance: func0_var0, };
		} catch (e) {console.log(e)}

		try {
			var func0_var41 = new SyncEvent(func0_var39,func0_var40);
		} catch (e) {console.log(e)}

		try {
			var func0_var42 = await func0_var41.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func0_var43 = func0_var8.data;
		} catch (e) {console.log(e)}

		try {
			var func0_var44 = await func0_var43.json();
		} catch (e) {console.log(e)}

		try {
			var func0_var45 = await func0_var41.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func0_var46 = undefined;
		} catch (e) {console.log(e)}

		return func0_var46;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, 'c5debad5');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-8341_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = {currency: func1_var0, value: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = 'pickup';
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = {requestPayerName: self.isSecureContext, requestPayerPhone: self.isSecureContext, requestShipping: self.isSecureContext, shippingType: func1_var5, };
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = {topOrigin: func1_var0, paymentRequestOrigin: func1_var0, paymentRequestId: func1_var0, methodData: func1_var2, total: func1_var3, modifiers: func1_var2, instrumentKey: func1_var0, paymentOptions: func1_var4, shippingOptions: func1_var2, };
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = new PaymentRequestEvent(func1_var0,func1_var1);
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = await func1_var6.respondWith(func1_var7);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-8341_page-1.html#db80d44c');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-8341_page-2.html#56d3af17');
		} catch (e) {console.log(e)}

		try {
			var func1_var9 = undefined;
		} catch (e) {console.log(e)}

		return func1_var9;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '8bfc748b');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = 69;
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = new Array(func2_var2);
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = {changed: func2_var3, deleted: func2_var3, };
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = new ExtendableCookieChangeEvent(func2_var0,func2_var1);
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = await func2_var4.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = 'http://127.0.0.1:8080/input-8341_page-1.html#c964569c';
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = {data: event, origin: func2_var0, source: self.serviceWorker, ports: func2_var3, };
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = new ExtendableMessageEvent(func2_var6,func2_var7);
		} catch (e) {console.log(e)}

		try {
			var func2_var9 = await func2_var8.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func2_var10 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var11 = {tag: func2_var0, lastChance: self.isSecureContext, };
		} catch (e) {console.log(e)}

		try {
			var func2_var12 = new SyncEvent(func2_var10,func2_var11);
		} catch (e) {console.log(e)}

		try {
			var func2_var13 = await func2_var12.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var14 = self.registration.cookies;
		} catch (e) {console.log(e)}

		try {
			var func2_var15 = await func2_var14.getSubscriptions();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-8341_page-2.html#9592efaf');
		} catch (e) {console.log(e)}

		try {
			self.onerror = eval;
		} catch (e) {console.log(e)}

		try {
			var func2_var16 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.1:8080/input-8341_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func2_var17 = 'http://127.0.0.2:8080/input-8341_page-2.html#aadf250e';
		} catch (e) {console.log(e)}

		try {
			var func2_var18 = {id: func2_var0, };
		} catch (e) {console.log(e)}

		try {
			var func2_var19 = new ContentIndexEvent(func2_var17,func2_var18);
		} catch (e) {console.log(e)}

		try {
			var func2_var20 = await func2_var19.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var21 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var23 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var24 = {tag: func2_var0, };
		} catch (e) {console.log(e)}

		try {
			var func2_var25 = new PeriodicSyncEvent(func2_var23,func2_var24);
		} catch (e) {console.log(e)}

		try {
			var func2_var26 = await func2_var25.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func2_var27 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func2_var28 = new USBConnectionEvent(func2_var27,func2_var22);
		} catch (e) {console.log(e)}

		try {
			var func2_var29 = false;
		} catch (e) {console.log(e)}

		try {
			func2_var28.cancelBubble = func2_var29;
		} catch (e) {console.log(e)}

async function func2_func0(event) {
			try {
				check_site_violation('http://127.0.0.1:8080', location.origin, 'f94b1a3e');

			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-8341_page-2.html');
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin_replace_host('http://127.0.0.1:8080/input-8341_page-1.html');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var0 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				IPCFuzzer.mutate_origin('http://127.0.0.1:8080/input-8341_page-1.html#2a116111');
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var1 = 'foo';
			} catch (e) {console.log(e)}

async function func2_func0_func0(event) {
				try {
					check_site_violation('http://127.0.0.1:8080', location.origin, '5c5bedef');

				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var0 = 'data:text/html,foo';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var2 = await func2_var19.waitUntil(func2_var15);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var3 = self.navigator.usb;
				} catch (e) {console.log(e)}

				try {
					func2_func0_func0_var3.ondisconnect = eval;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var4 = true;
				} catch (e) {console.log(e)}

				try {
					event.cancelBubble = func2_func0_func0_var4;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var5 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var6 = {};
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var7 = new AbortPaymentEvent(func2_func0_func0_var5,func2_func0_func0_var6);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var8 = false;
				} catch (e) {console.log(e)}

				try {
					func2_func0_func0_var7.cancelBubble = func2_func0_func0_var8;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var9 = 'http://127.0.0.2:8080/input-8341_page-2.html#aad68062';
				} catch (e) {console.log(e)}

async function func2_func0_func0_func0(event) {
					try {
						check_site_violation('http://127.0.0.1:8080', location.origin, 'ce224a1f');

					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var0 = await func2_func0_func0_var3.getDevices();
					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-8341_page-2.html#cbfb770b');
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var1 = await func2_func0_func0_var7.stopImmediatePropagation();
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var2 = await event.composedPath();
					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-8341_page-1.html');
					} catch (e) {console.log(e)}

async function func2_func0_func0_func0_func0(event) {
						try {
							check_site_violation('http://127.0.0.1:8080', location.origin, 'ccc487dc');

						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var0 = await func2_var28.preventDefault();
						} catch (e) {console.log(e)}

						try {
							IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.2:8080/input-8341_page-2.html');
						} catch (e) {console.log(e)}

						try {
							IPCFuzzer.mutate_origin('data:text/html,%3Chtml%3E%5Cn%3Chead%3E%5Cn%3Cscript%3EIPCFuzzer.deactivate_renderer_checks%28%29%3B%5CnIPCFuzzer.activate_leak_sanitizer%28%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3E9acfe8b4%3C/h1%3E%3Cp%3Efoo%3C/p%3E%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%22f9daff71%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E');
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var1 = await func2_var19.preventDefault();
						} catch (e) {console.log(e)}

						try {
							IPCFuzzer.mutate_site_for_cookies('http://127.0.0.2:8080/input-8341_page-1.html#9276ab84');
						} catch (e) {console.log(e)}

						try {
							IPCFuzzer.mutate_origin_replace_host('http://127.0.0.2:8080/input-8341_page-1.html');
						} catch (e) {console.log(e)}

						try {
							IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-8341_page-1.html');
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var2 = 'foo';
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var3 = 'http://127.0.0.1:8080/input-8341_page-1.html#920480a0';
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var4 = await self.cookieStore.set(func2_func0_func0_func0_func0_var2,func2_func0_func0_func0_func0_var3);
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var5 = 'foo';
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var7 = 'http://127.0.0.1:8080/input-8341_page-1.html#b32b551b';
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var8 = {};
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var9 = new PushSubscriptionChangeEvent(func2_func0_func0_func0_func0_var7,func2_func0_func0_func0_func0_var8);
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var10 = await func2_func0_func0_func0_func0_var9.stopImmediatePropagation();
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var11 = await event.preventDefault();
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var12 = 'foo';
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var13 = await self.cookieStore.removeEventListener(func2_func0_func0_func0_func0_var12,null,self.isSecureContext);
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var14 = 'http://127.0.0.2:8080/input-8341_page-1.html#c3708961';
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var16 = {currency: func2_func0_func0_func0_func0_var2, value: func2_func0_func0_func0_func0_var2, };
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var18 = 'delivery';
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var17 = {requestPayerName: self.isSecureContext, requestPayerEmail: self.isSecureContext, requestPayerPhone: self.isSecureContext, requestShipping: self.isSecureContext, shippingType: func2_func0_func0_func0_func0_var18, };
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var15 = {topOrigin: func2_func0_func0_func0_func0_var2, paymentRequestOrigin: func2_func0_func0_func0_func0_var2, paymentRequestId: func2_func0_func0_func0_func0_var2, methodData: func2_func0_func0_func0_var2, total: func2_func0_func0_func0_func0_var16, modifiers: func2_func0_func0_func0_var2, instrumentKey: func2_func0_func0_func0_func0_var2, paymentOptions: func2_func0_func0_func0_func0_var17, };
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var19 = new PaymentRequestEvent(func2_func0_func0_func0_func0_var14,func2_func0_func0_func0_func0_var15);
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var20 = await func2_func0_func0_func0_func0_var19.waitUntil(func2_func0_func0_func0_func0_var4);
						} catch (e) {console.log(e)}

						try {
							var func2_func0_func0_func0_func0_var21 = undefined;
						} catch (e) {console.log(e)}

						return func2_func0_func0_func0_func0_var21;
					}

					try {
						self.onabortpayment = func2_func0_func0_func0_func0;
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var3 = 'foo';
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var5 = 'http://127.0.0.1:8080/input-8341_page-1.html#096da7e8';
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var7 = false;
					} catch (e) {console.log(e)}

					try {
						func2_func0_func0_var7.cancelBubble = func2_func0_func0_func0_var7;
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var8 = 'javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%22f6a4b069%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B';
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var9 = new BackgroundFetchEvent(func2_func0_func0_func0_var8,func2_func0_func0_var1);
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var10 = await func2_func0_func0_func0_var9.stopPropagation();
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var11 = await func2_func0_func0_var7.stopImmediatePropagation();
					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_url('http://127.0.0.1:8080/input-8341_page-2.html#0c8015ed');
					} catch (e) {console.log(e)}

					try {
						IPCFuzzer.mutate_url('http://127.0.0.2:8080/input-8341_page-1.html#cd265e28');
					} catch (e) {console.log(e)}

					try {
						var func2_func0_func0_func0_var12 = undefined;
					} catch (e) {console.log(e)}

					return func2_func0_func0_func0_var12;
				}

				try {
					var func2_func0_func0_var10 = {handleEvent: func2_func0_func0_func0};
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var11 = await self.cookieStore.addEventListener(func2_func0_func0_var9,func2_func0_func0_var10,func2_func0_func0_var4);
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-8341_page-2.html#76031774');
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var12 = await event.preventDefault();
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var13 = self.navigator.hid;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var14 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var15 = await func2_func0_func0_var13.removeEventListener(func2_func0_func0_var14,func2_func0_func0_var10,func2_func0_func0_var4);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var16 = await event.preventDefault();
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var17 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var18 = {};
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var19 = new PushEvent(func2_func0_func0_var17,func2_func0_func0_var18);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var20 = await func2_func0_func0_var19.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var21 = await func2_var28.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var22 = 'http://127.0.0.1:8080/input-8341_page-2.html#b43bc2ef';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var23 = false;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var24 = true;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var25 = await func2_func0_func0_var19.initEvent(func2_func0_func0_var22,func2_func0_func0_var23,func2_func0_func0_var24);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var26 = await func2_var28.composedPath();
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var27 = false;
				} catch (e) {console.log(e)}

				try {
					func2_func0_func0_var7.cancelBubble = func2_func0_func0_var27;
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-8341_page-1.html#d9a8ee3d');
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func0_var28 = undefined;
				} catch (e) {console.log(e)}

				return func2_func0_func0_var28;
			}

			try {
				var func2_func0_var2 = {handleEvent: func2_func0_func0};
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var3 = await self.serviceWorker.addEventListener(func2_func0_var1,func2_func0_var2,self.isSecureContext);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var4 = false;
			} catch (e) {console.log(e)}

			try {
				func2_var4.returnValue = func2_func0_var4;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var5 = await func2_var14.subscribe(func2_var3);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var6 = 'http://127.0.0.1:8080/input-8341_page-2.html#b33453bd';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var7 = await self.cookieStore.getAll(func2_func0_var6);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var8 = 'foo';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var9 = await self.atob(func2_func0_var8);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var10 = 'data:text/html,foo';
			} catch (e) {console.log(e)}

async function func2_func0_func1(event) {
				try {
					check_site_violation('http://127.0.0.1:8080', location.origin, '99a3852b');

				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var0 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var1 = true;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var2 = true;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var3 = await event.initEvent(func2_func0_func1_var0,func2_func0_func1_var1,func2_func0_func1_var2);
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.1:8080/input-8341_page-2.html');
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var4 = await event.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var5 = await event.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var6 = false;
				} catch (e) {console.log(e)}

				try {
					event.cancelBubble = func2_func0_func1_var6;
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var7 = 'foo';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var8 = await self.cookieStore.delete(func2_func0_func1_var7);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var9 = await self.serviceWorker.dispatchEvent(event);
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_storage_key_replace_host('http://127.0.0.2:8080/input-8341_page-2.html');
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_schemeful_site_replace_host('http://127.0.0.2:8080/input-8341_page-2.html');
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var10 = await func2_var4.waitUntil(func2_func0_func1_var8);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var11 = {name: func2_func0_func1_var0, url: func2_func0_func1_var0, };
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var12 = await self.cookieStore.get(func2_func0_func1_var11);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var14 = 'strict';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var13 = {name: func2_func0_func1_var0, value: func2_func0_func1_var0, domain: func2_func0_func1_var0, path: func2_func0_func1_var0, expires: Infinity, sameSite: func2_func0_func1_var14, partitioned: func2_func0_func1_var1, };
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var15 = await self.cookieStore.set(func2_func0_func1_var13);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var17 = 'sharedworker';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var16 = {includeUncontrolled: func2_func0_func1_var1, type: func2_func0_func1_var17, };
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var18 = await self.clients.matchAll(func2_func0_func1_var16);
				} catch (e) {console.log(e)}

				try {
					IPCFuzzer.mutate_origin('http://127.0.0.2:8080/input-8341_page-1.html#264096cf');
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var19 = 'http://127.0.0.1:8080/input-8341_page-1.html#8220d137';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var21 = {currency: func2_func0_func1_var0, value: func2_func0_func1_var0, };
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var23 = 'delivery';
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var22 = {requestPayerName: func2_func0_func1_var1, requestPayerEmail: func2_func0_func1_var1, requestPayerPhone: func2_func0_func1_var1, requestShipping: func2_func0_func1_var1, shippingType: func2_func0_func1_var23, };
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var20 = {topOrigin: func2_func0_func1_var0, paymentRequestOrigin: func2_func0_func1_var0, paymentRequestId: func2_func0_func1_var0, methodData: func2_var3, total: func2_func0_func1_var21, modifiers: func2_var3, paymentOptions: func2_func0_func1_var22, shippingOptions: func2_var3, };
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var24 = new PaymentRequestEvent(func2_func0_func1_var19,func2_func0_func1_var20);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var25 = await func2_func0_func1_var24.respondWith(func2_func0_func1_var8);
				} catch (e) {console.log(e)}

				try {
					var func2_func0_func1_var26 = undefined;
				} catch (e) {console.log(e)}

				return func2_func0_func1_var26;
			}

			try {
				self.onabortpayment = func2_func0_func1;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var12 = 'http://127.0.0.2:8080/input-8341_page-1.html#fb2061d2';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var13 = false;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var14 = true;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var15 = await func2_var8.initEvent(func2_func0_var12,func2_func0_var13,func2_func0_var14);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var16 = await func2_var19.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var17 = 'http://127.0.0.1:8080/input-8341_page-2.html#b6049b46';
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var18 = {data: func2_func0_var1, };
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var19 = new PushEvent(func2_func0_var17,func2_func0_var18);
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var20 = false;
			} catch (e) {console.log(e)}

			try {
				func2_func0_var19.returnValue = func2_func0_var20;
			} catch (e) {console.log(e)}

			try {
				var func2_func0_var21 = undefined;
			} catch (e) {console.log(e)}

			return func2_func0_var21;
		}

		try {
			self.onsync = func2_func0;
		} catch (e) {console.log(e)}

		try {
			var func2_var30 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func2_var31 = await func2_var12.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var32 = undefined;
		} catch (e) {console.log(e)}

		return func2_var32;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, '3c8f607a');

		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%2241e8ff0d%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B');
		} catch (e) {console.log(e)}

		try {
			var func3_var0 = 'http://127.0.0.1:8080/input-8341_page-1.html#0fd4ed63';
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = {};
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = new PushSubscriptionChangeEvent(func3_var0,func3_var1);
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = false;
		} catch (e) {console.log(e)}

		try {
			func3_var2.returnValue = func3_var3;
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url('data:text/html,%3Chtml%3E%5Cn%3Chead%3E%5Cn%3Cscript%3EIPCFuzzer.deactivate_renderer_checks%28%29%3B%5CnIPCFuzzer.activate_leak_sanitizer%28%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3E88270834%3C/h1%3E%3Cp%3Efoo%3C/p%3E%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.1%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.1%3A8080%22%2C%20location.origin%2C%20%226e43c333%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E');
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = {data: event, origin: func3_var0, lastEventId: func3_var0, source: self.serviceWorker, };
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = new ExtendableMessageEvent(func3_var5,func3_var6);
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = await func3_var7.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = self.registration.cookies;
		} catch (e) {console.log(e)}

		try {
			var func3_var10 = await func3_var9.subscribe(func3_var4);
		} catch (e) {console.log(e)}

		try {
			var func3_var11 = 'http://127.0.0.1:8080/input-8341_page-1.html#0ee7c3dc';
		} catch (e) {console.log(e)}

		try {
			var func3_var12 = {topOrigin: func3_var0, paymentRequestOrigin: func3_var0, methodData: func3_var4, };
		} catch (e) {console.log(e)}

		try {
			var func3_var13 = new CanMakePaymentEvent(func3_var11,func3_var12);
		} catch (e) {console.log(e)}

		try {
			var func3_var14 = true;
		} catch (e) {console.log(e)}

		try {
			func3_var13.returnValue = func3_var14;
		} catch (e) {console.log(e)}

		try {
			var func3_var15 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var17 = 'http://127.0.0.2:8080/input-8341_page-1.html#74beaf5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var19 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var20 = {};
		} catch (e) {console.log(e)}

		try {
			var func3_var21 = new InstallEvent(func3_var19,func3_var20);
		} catch (e) {console.log(e)}

		try {
			var func3_var22 = await func3_var21.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var23 = 'http://127.0.0.2:8080/input-8341_page-1.html#5084c07f';
		} catch (e) {console.log(e)}

		try {
			var func3_var24 = new FetchEvent(func3_var23,func3_var18);
		} catch (e) {console.log(e)}

		try {
			var func3_var25 = false;
		} catch (e) {console.log(e)}

		try {
			func3_var24.cancelBubble = func3_var25;
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-8341_page-1.html#7a3f8b7f');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies_replace_host('http://127.0.0.1:8080/input-8341_page-2.html');
		} catch (e) {console.log(e)}

		try {
			var func3_var26 = await func3_var9.unsubscribe(func3_var4);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_url_replace_host('http://127.0.0.1:8080/input-8341_page-1.html');
		} catch (e) {console.log(e)}

		try {
			var func3_var27 = await func3_var9.subscribe(func3_var4);
		} catch (e) {console.log(e)}

		try {
			var func3_var28 = 'http://127.0.0.2:8080/input-8341_page-1.html#cedfc9bb';
		} catch (e) {console.log(e)}

		try {
			var func3_var29 = {tag: func3_var0, lastChance: func3_var3, };
		} catch (e) {console.log(e)}

		try {
			var func3_var30 = new SyncEvent(func3_var28,func3_var29);
		} catch (e) {console.log(e)}

		try {
			var func3_var31 = await func3_var30.waitUntil(func3_var10);
		} catch (e) {console.log(e)}

		try {
			var func3_var32 = undefined;
		} catch (e) {console.log(e)}

		return func3_var32;
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
            console.log('[UXSS] [sw-intercept-cookie-66bae919] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.1') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-c7cc1354] ' + '127.0.0.1' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.1:8080', location.origin, 'ef9683ea');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = 'foo';
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = 35;
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = new Array(func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = {topOrigin: func4_var0, paymentRequestOrigin: func4_var0, methodData: func4_var3, modifiers: func4_var3, };
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = new CanMakePaymentEvent(func4_var0,func4_var1);
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = await func4_var4.waitUntil(func4_var5);
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_site_for_cookies('http://127.0.0.1:8080/input-8341_page-2.html#534abfa7');
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = true;
		} catch (e) {console.log(e)}

		try {
			func4_var4.cancelBubble = func4_var7;
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = true;
		} catch (e) {console.log(e)}

		try {
			func4_var4.returnValue = func4_var8;
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_storage_key('http://127.0.0.1:8080/input-8341_page-2.html#3672b6a0');
		} catch (e) {console.log(e)}

		try {
			IPCFuzzer.mutate_schemeful_site('http://127.0.0.1:8080/input-8341_page-1.html#927ad501');
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
