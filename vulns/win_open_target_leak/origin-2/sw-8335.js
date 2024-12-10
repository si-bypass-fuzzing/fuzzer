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
			check_site_violation('http://127.0.0.2:8080', location.origin, '1162e230');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = 'http://127.0.0.1:8080/input-8335_page-2.html#68001625';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = {tag: func0_var0, };
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = new PeriodicSyncEvent(func0_var0,func0_var1);
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = false;
		} catch (e) {console.log(e)}

		try {
			func0_var2.cancelBubble = func0_var3;
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = await func0_var2.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = await func0_var2.waitUntil(func0_var5);
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = await func0_var2.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = undefined;
		} catch (e) {console.log(e)}

		return func0_var8;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'd685045d');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'http://127.0.0.2:8080/input-8335_page-1.html#3d4b2de3';
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = 31;
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = new Array(func1_var2);
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = {currency: func1_var0, value: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = 'shipping';
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = {requestPayerName: self.isSecureContext, requestPayerEmail: self.isSecureContext, requestPayerPhone: self.isSecureContext, requestShipping: self.isSecureContext, shippingType: func1_var6, };
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = {topOrigin: func1_var0, paymentRequestOrigin: func1_var0, paymentRequestId: func1_var0, methodData: func1_var3, total: func1_var4, modifiers: func1_var3, instrumentKey: func1_var0, paymentOptions: func1_var5, shippingOptions: func1_var3, };
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = new PaymentRequestEvent(func1_var0,func1_var1);
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func1_var9 = await func1_var7.waitUntil(func1_var8);
		} catch (e) {console.log(e)}

		try {
			var func1_var10 = 'http://127.0.0.2:8080/input-8335_page-1.html#2899ad0a';
		} catch (e) {console.log(e)}

		try {
			var func1_var11 = false;
		} catch (e) {console.log(e)}

		try {
			var func1_var12 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var13 = await func1_var7.initEvent(func1_var10,func1_var11,func1_var12);
		} catch (e) {console.log(e)}

		try {
			var func1_var14 = true;
		} catch (e) {console.log(e)}

		try {
			func1_var7.cancelBubble = func1_var14;
		} catch (e) {console.log(e)}

		try {
			var func1_var15 = undefined;
		} catch (e) {console.log(e)}

		return func1_var15;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '836e400d');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'http://127.0.0.1:8080/input-8335_page-2.html#f9b659f5';
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = 'http://127.0.0.2:8080/input-8335_page-2.html#77451b51';
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = {changed: func2_var4, deleted: func2_var4, };
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = new ExtendableCookieChangeEvent(func2_var2,func2_var3);
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = await func2_var5.waitUntil(func2_var6);
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = undefined;
		} catch (e) {console.log(e)}

		return func2_var8;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '9797bc16');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = 'data:text/plain,foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = {};
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = new PushSubscriptionChangeEvent(func3_var0,func3_var1);
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = 'http://127.0.0.2:8080/input-8335_page-1.html#1706a6f7';
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = true;
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = await func3_var2.initEvent(func3_var3,func3_var4,func3_var5);
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = 'http://127.0.0.1:8080/input-8335_page-2.html#ae0e7a72';
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = {};
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = new InstallEvent(func3_var7,func3_var8);
		} catch (e) {console.log(e)}

		try {
			var func3_var10 = await func3_var9.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var11 = event.data;
		} catch (e) {console.log(e)}

		try {
			var func3_var12 = await func3_var11.text();
		} catch (e) {console.log(e)}

		try {
			var func3_var13 = 'http://127.0.0.2:8080/input-8335_page-1.html#165e18a2';
		} catch (e) {console.log(e)}

		try {
			var func3_var15 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var17 = true;
		} catch (e) {console.log(e)}

		try {
			func3_var9.cancelBubble = func3_var17;
		} catch (e) {console.log(e)}

		try {
			var func3_var18 = 'http://127.0.0.2:8080/input-8335_page-2.html#62779165';
		} catch (e) {console.log(e)}

		try {
			var func3_var20 = await event.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var21 = 'http://127.0.0.1:8080/input-8335_page-2.html#cb776b30';
		} catch (e) {console.log(e)}

		try {
			var func3_var23 = await func3_var9.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var24 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var26 = 27;
		} catch (e) {console.log(e)}

		try {
			var func3_var27 = new Array(func3_var26);
		} catch (e) {console.log(e)}

		try {
			var func3_var25 = {changed: func3_var27, deleted: func3_var27, };
		} catch (e) {console.log(e)}

		try {
			var func3_var28 = new ExtendableCookieChangeEvent(func3_var24,func3_var25);
		} catch (e) {console.log(e)}

		try {
			var func3_var29 = await func3_var28.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var30 = await func3_var28.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var31 = 'http://127.0.0.2:8080/input-8335_page-1.html#4ee3d0cf';
		} catch (e) {console.log(e)}

		try {
			var func3_var32 = {topOrigin: func3_var0, paymentRequestOrigin: func3_var0, methodData: func3_var27, modifiers: func3_var27, };
		} catch (e) {console.log(e)}

		try {
			var func3_var33 = new CanMakePaymentEvent(func3_var31,func3_var32);
		} catch (e) {console.log(e)}

		try {
			var func3_var34 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var35 = true;
		} catch (e) {console.log(e)}

		try {
			var func3_var36 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var37 = await func3_var33.initEvent(func3_var34,func3_var35,func3_var36);
		} catch (e) {console.log(e)}

		try {
			var func3_var38 = await func3_var11.text();
		} catch (e) {console.log(e)}

		try {
			var func3_var39 = 'data:text/plain,foo';
		} catch (e) {console.log(e)}

		try {
			var func3_var41 = await func3_var9.addRoutes('');
		} catch (e) {console.log(e)}

		try {
			var func3_var42 = undefined;
		} catch (e) {console.log(e)}

		return func3_var42;
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
            console.log('[UXSS] [sw-intercept-cookie-b17654b6] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-a6bd9e42] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '9ec4dc4c');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = 'data:text/html,%3Chtml%3E%5Cn%3Chead%3E%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3E67707e8c%3C/h1%3E%3Cp%3Efoo%3C/p%3E8bf18cb9455f4a8e8fa93d14ab5ebb5d%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.2%3A8080%22%2C%20location.origin%2C%20%22c374f73a%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E';
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func4_var2;
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = 'http://127.0.0.2:8080/input-8335_page-2.html#e2d7e462';
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = {tag: func4_var0, };
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = new PeriodicSyncEvent(func4_var3,func4_var4);
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = true;
		} catch (e) {console.log(e)}

		try {
			func4_var5.returnValue = func4_var6;
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = 'http://127.0.0.2:8080/input-8335_page-2.html#f704b49f';
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = 'http://127.0.0.2:8080/input-8335_page-1.html#7517ac4e';
		} catch (e) {console.log(e)}

		try {
			var func4_var12 = await self.serviceWorker.on(func4_var11);
		} catch (e) {console.log(e)}

		try {
			var func4_var13 = 'data:blank';
		} catch (e) {console.log(e)}

		try {
			var func4_var14 = new USBConnectionEvent(func4_var13,func4_var1);
		} catch (e) {console.log(e)}

		try {
			var func4_var15 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var16 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var17 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var18 = await func4_var14.initEvent(func4_var15,func4_var16,func4_var17);
		} catch (e) {console.log(e)}

		try {
			var func4_var19 = 'http://127.0.0.1:8080/input-8335_page-1.html#5bb70dfb';
		} catch (e) {console.log(e)}

		try {
			var func4_var20 = {};
		} catch (e) {console.log(e)}

		try {
			var func4_var21 = new AbortPaymentEvent(func4_var19,func4_var20);
		} catch (e) {console.log(e)}

		try {
			var func4_var22 = await func4_var21.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var23 = {};
		} catch (e) {console.log(e)}

		try {
			var func4_var24 = await func4_var12.subscribe('',func4_var23);
		} catch (e) {console.log(e)}

		try {
			var func4_var25 = 'http://127.0.0.2:8080/input-8335_page-2.html#84d003e1';
		} catch (e) {console.log(e)}

		try {
			var func4_var26 = new BackgroundFetchUpdateUIEvent(func4_var25,func4_var8);
		} catch (e) {console.log(e)}

		try {
			var func4_var27 = await func4_var26.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var28 = true;
		} catch (e) {console.log(e)}

		try {
			func4_var26.cancelBubble = func4_var28;
		} catch (e) {console.log(e)}

		try {
			var func4_var29 = true;
		} catch (e) {console.log(e)}

		try {
			func4_var14.cancelBubble = func4_var29;
		} catch (e) {console.log(e)}

		try {
			var func4_var30 = 'data:text/html,foo';
		} catch (e) {console.log(e)}

async function func4_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '2d7042e7');

			} catch (e) {console.log(e)}

			try {
				var func4_func0_var0 = 'http://127.0.0.2:8080/input-8335_page-1.html#8df94198';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var2 = 19;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var3 = new Array(func4_func0_var2);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var1 = {topOrigin: func4_func0_var0, paymentRequestOrigin: func4_func0_var0, methodData: func4_func0_var3, modifiers: func4_func0_var3, };
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var4 = new CanMakePaymentEvent(func4_func0_var0,func4_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var5 = false;
			} catch (e) {console.log(e)}

			try {
				func4_func0_var4.returnValue = func4_func0_var5;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var6 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var7 = false;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var8 = false;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var9 = await func4_var21.initEvent(func4_func0_var6,func4_func0_var7,func4_func0_var8);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var10 = await func4_var26.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var11 = 'data:text/plain,foo';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var12 = {data: func4_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var13 = new PushEvent(func4_func0_var11,func4_func0_var12);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var14 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var15 = await func4_func0_var13.initEvent(func4_func0_var14);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var16 = true;
			} catch (e) {console.log(e)}

			try {
				func4_var26.cancelBubble = func4_func0_var16;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var17 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var18 = new InstallEvent(func4_func0_var17,func4_var20);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var19 = false;
			} catch (e) {console.log(e)}

			try {
				func4_func0_var18.returnValue = func4_func0_var19;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var21 = 'http://127.0.0.1:8080/input-8335_page-2.html#5a15e009';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var20 = await self.clients.openWindow(func4_func0_var21);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var22 = await func4_func0_var20.postMessage(event,func4_func0_var3);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var23 = await func4_var26.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var24 = await event.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var25 = 'data:text/html,foo';
			} catch (e) {console.log(e)}

async function func4_func0_func0(event) {
				try {
					check_site_violation('http://127.0.0.2:8080', location.origin, '26492aa6');

				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var0 = false;
				} catch (e) {console.log(e)}

				try {
					func4_var26.returnValue = func4_func0_func0_var0;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var1 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var3 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var4 = new HIDConnectionEvent(func4_func0_func0_var3,func4_var10);
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var5 = true;
				} catch (e) {console.log(e)}

				try {
					func4_func0_func0_var4.cancelBubble = func4_func0_func0_var5;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var6 = func4_func0_var13.data;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var7 = await func4_func0_func0_var6.text();
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var8 = func4_var14.device;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var9 = 11;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var10 = await func4_func0_func0_var8.transferOut(func4_func0_func0_var9,'');
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var11 = await self.clients.matchAll();
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var13 = 'vendor';
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var14 = 'endpoint';
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var12 = {requestType: func4_func0_func0_var13, recipient: func4_func0_func0_var14, request: func4_func0_func0_var9, value: func4_func0_func0_var9, index: func4_func0_func0_var9, };
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var15 = await func4_func0_func0_var8.controlTransferOut(func4_func0_func0_var12,'');
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var16 = true;
				} catch (e) {console.log(e)}

				try {
					func4_func0_var13.cancelBubble = func4_func0_func0_var16;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var17 = await func4_var14.composedPath();
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var18 = 'http://127.0.0.2:8080/input-8335_page-1.html#a9e82a01';
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var19 = true;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var20 = false;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var21 = await func4_var5.initEvent(func4_func0_func0_var18,func4_func0_func0_var19,func4_func0_func0_var20);
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var23 = 'all';
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var22 = {includeUncontrolled: func4_func0_func0_var0, type: func4_func0_func0_var23, };
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var24 = await self.clients.matchAll(func4_func0_func0_var22);
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var25 = false;
				} catch (e) {console.log(e)}

				try {
					func4_var5.returnValue = func4_func0_func0_var25;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var26 = await event.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var27 = await func4_func0_var4.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var28 = 'javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.2%3A8080%22%2C%20location.origin%2C%20%22e894f01f%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B';
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var29 = {};
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var30 = new PushSubscriptionChangeEvent(func4_func0_func0_var28,func4_func0_func0_var29);
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var31 = false;
				} catch (e) {console.log(e)}

				try {
					func4_func0_func0_var30.returnValue = func4_func0_func0_var31;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var32 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var33 = {origin: func4_func0_func0_var1, lastEventId: func4_func0_func0_var1, source: self.serviceWorker, ports: func4_func0_func0_var17, };
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var34 = new ExtendableMessageEvent(func4_func0_func0_var32,func4_func0_func0_var33);
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var35 = await func4_func0_func0_var34.composedPath();
				} catch (e) {console.log(e)}

				try {
					self.onactivate = eval;
				} catch (e) {console.log(e)}

				try {
					var func4_func0_func0_var36 = undefined;
				} catch (e) {console.log(e)}

				return func4_func0_func0_var36;
			}

			try {
				var func4_func0_var26 = {handleEvent: func4_func0_func0};
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var27 = await self.serviceWorker.removeEventListener(func4_func0_var25,func4_func0_var26,func4_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var28 = true;
			} catch (e) {console.log(e)}

			try {
				func4_func0_var18.returnValue = func4_func0_var28;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var29 = await func4_var21.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var30 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var31 = false;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var32 = true;
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var33 = await func4_var14.initEvent(func4_func0_var30,func4_func0_var31,func4_func0_var32);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var34 = await func4_var14.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var35 = {includeUserActivation: func4_func0_var5, };
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var36 = await func4_func0_var20.postMessage(event,func4_func0_var35);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var37 = await func4_var26.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var38 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var39 = {data: event, lastEventId: func4_func0_var0, source: self.serviceWorker, ports: func4_func0_var3, };
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var40 = new ExtendableMessageEvent(func4_func0_var38,func4_func0_var39);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var41 = await func4_func0_var40.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var42 = 'http://127.0.0.2:8080/input-8335_page-2.html#c2ebdefb';
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var43 = {};
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var44 = new PushSubscriptionChangeEvent(func4_func0_var42,func4_func0_var43);
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var45 = await func4_func0_var44.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func4_func0_var46 = undefined;
			} catch (e) {console.log(e)}

			return func4_func0_var46;
		}

		try {
			var func4_var31 = {handleEvent: func4_func0};
		} catch (e) {console.log(e)}

		try {
			var func4_var32 = await self.serviceWorker.removeEventListener(func4_var30,func4_var31,func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var33 = await func4_var5.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var34 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func4_var35 = 'http://127.0.0.2:8080/input-8335_page-1.html#7ec93139';
		} catch (e) {console.log(e)}

		try {
			var func4_var36 = new ExtendableMessageEvent(func4_var35);
		} catch (e) {console.log(e)}

		try {
			var func4_var37 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var38 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var39 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var40 = await func4_var36.initEvent(func4_var37,func4_var38,func4_var39);
		} catch (e) {console.log(e)}

		try {
			var func4_var41 = false;
		} catch (e) {console.log(e)}

		try {
			func4_var14.cancelBubble = func4_var41;
		} catch (e) {console.log(e)}

		try {
			var func4_var42 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
