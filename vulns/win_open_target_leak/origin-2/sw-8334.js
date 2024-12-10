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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'd3a10a53');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = 'http://127.0.0.1:8080/input-8334_page-1.html#9ca86cb6';
		} catch (e) {console.log(e)}

		try {
			var func0_var1 = {};
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = new PushSubscriptionChangeEvent(func0_var0,func0_var1);
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = await func0_var2.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = 'http://127.0.0.1:8080/input-8334_page-2.html#2262dccf';
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var7 = {data: func0_var0, };
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = new PushEvent(func0_var6,func0_var7);
		} catch (e) {console.log(e)}

		try {
			var func0_var10 = 'none';
		} catch (e) {console.log(e)}

		try {
			var func0_var9 = {name: func0_var0, value: func0_var0, domain: func0_var0, path: func0_var0, expires: Infinity, sameSite: func0_var10, partitioned: self.isSecureContext, };
		} catch (e) {console.log(e)}

		try {
			var func0_var11 = await self.cookieStore.set(func0_var9);
		} catch (e) {console.log(e)}

		try {
			var func0_var12 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var14 = await event.waitUntil(func0_var11);
		} catch (e) {console.log(e)}

		try {
			var func0_var15 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var17 = await func0_var2.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func0_var18 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var19 = {changed: func0_var17, deleted: func0_var17, };
		} catch (e) {console.log(e)}

		try {
			var func0_var20 = new ExtendableCookieChangeEvent(func0_var18,func0_var19);
		} catch (e) {console.log(e)}

		try {
			var func0_var21 = true;
		} catch (e) {console.log(e)}

		try {
			func0_var20.cancelBubble = func0_var21;
		} catch (e) {console.log(e)}

		try {
			var func0_var22 = false;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func0_var22;
		} catch (e) {console.log(e)}

		try {
			var func0_var23 = 'data:text/html,foo';
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '94d14178');

			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = await self.clients.claim();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var2 = new NotificationEvent(func0_func0_var1,func0_var16);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var3 = await func0_func0_var2.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var5 = 'http://127.0.0.2:8080/input-8334_page-1.html#a49df43c';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var4 = await self.clients.openWindow(func0_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var6 = {includeUserActivation: self.isSecureContext, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var7 = await func0_func0_var4.postMessage(event,func0_func0_var6);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var8 = 'http://127.0.0.1:8080/input-8334_page-2.html#b8305245';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var9 = new HIDConnectionEvent(func0_func0_var8,func0_var13);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var10 = await func0_func0_var9.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var11 = await event.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var12 = await func0_func0_var9.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var13 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var14 = false;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var15 = false;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var16 = await func0_func0_var2.initEvent(func0_func0_var13,func0_func0_var14,func0_func0_var15);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var17 = await event.addRoutes('');
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var18 = false;
			} catch (e) {console.log(e)}

			try {
				func0_var20.returnValue = func0_func0_var18;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var19 = true;
			} catch (e) {console.log(e)}

			try {
				event.returnValue = func0_func0_var19;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var20 = await func0_func0_var9.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var21 = await event.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var22 = await func0_func0_var2.waitUntil(func0_func0_var0);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var23 = await func0_var20.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var24 = 'http://127.0.0.1:8080/input-8334_page-2.html#85ca6ba7';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var25 = {topOrigin: func0_func0_var1, paymentRequestOrigin: func0_func0_var1, methodData: func0_func0_var11, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var26 = new CanMakePaymentEvent(func0_func0_var24,func0_func0_var25);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var27 = true;
			} catch (e) {console.log(e)}

			try {
				func0_func0_var26.returnValue = func0_func0_var27;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var28 = true;
			} catch (e) {console.log(e)}

			try {
				func0_func0_var2.cancelBubble = func0_func0_var28;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var29 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var30 = true;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var31 = false;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var32 = await func0_var2.initEvent(func0_func0_var29,func0_func0_var30,func0_func0_var31);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var33 = await event.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var34 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var34;
		}

		try {
			var func0_var24 = {handleEvent: func0_func0};
		} catch (e) {console.log(e)}

		try {
			var func0_var25 = await self.serviceWorker.addEventListener(func0_var23,func0_var24,self.isSecureContext);
		} catch (e) {console.log(e)}

		try {
			var func0_var26 = 'about:blank';
		} catch (e) {console.log(e)}

		try {
			var func0_var27 = new HIDConnectionEvent(func0_var26,func0_var13);
		} catch (e) {console.log(e)}

		try {
			var func0_var28 = await func0_var27.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func0_var29 = undefined;
		} catch (e) {console.log(e)}

		return func0_var29;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '6033e843');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var1 = {id: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = new ContentIndexEvent(func1_var0,func1_var1);
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = await func1_var2.initEvent(func1_var3,func1_var4,func1_var5);
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = 'http://127.0.0.1:8080/input-8334_page-2.html#849c3153';
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = {tag: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var9 = new PeriodicSyncEvent(func1_var7,func1_var8);
		} catch (e) {console.log(e)}

		try {
			var func1_var10 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func1_var11 = await func1_var9.waitUntil(func1_var10);
		} catch (e) {console.log(e)}

		try {
			var func1_var12 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func1_var13 = await func1_var9.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func1_var14 = await event.stopPropagation();
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
			check_site_violation('http://127.0.0.2:8080', location.origin, '07943e04');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = 'http://127.0.0.2:8080/input-8334_page-2.html#1ce68fe0';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = {id: func2_var0, };
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = new ContentIndexEvent(func2_var0,func2_var1);
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = 'http://127.0.0.2:8080/input-8334_page-2.html#0d0beebe';
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = true;
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = false;
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = await func2_var2.initEvent(func2_var3,func2_var4,func2_var5);
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = await func2_var2.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = 'http://127.0.0.1:8080/input-8334_page-2.html#2da92d4c';
		} catch (e) {console.log(e)}

		try {
			var func2_var9 = true;
		} catch (e) {console.log(e)}

		try {
			var func2_var10 = false;
		} catch (e) {console.log(e)}

		try {
			var func2_var11 = await func2_var2.initEvent(func2_var8,func2_var9,func2_var10);
		} catch (e) {console.log(e)}

		try {
			var func2_var12 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var14 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var16 = true;
		} catch (e) {console.log(e)}

		try {
			func2_var2.returnValue = func2_var16;
		} catch (e) {console.log(e)}

		try {
			var func2_var17 = 'data:text/html,%3Chtml%3E%5Cn%3Chead%3E%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3E22ab4de0%3C/h1%3E%3Cp%3Efoo%3C/p%3E8bf18cb9455f4a8e8fa93d14ab5ebb5d%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.2%3A8080%22%2C%20location.origin%2C%20%228d793714%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E';
		} catch (e) {console.log(e)}

		try {
			var func2_var18 = {tag: func2_var0, };
		} catch (e) {console.log(e)}

		try {
			var func2_var19 = new PeriodicSyncEvent(func2_var17,func2_var18);
		} catch (e) {console.log(e)}

		try {
			var func2_var20 = await func2_var19.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var21 = self.navigator.hid;
		} catch (e) {console.log(e)}

		try {
			func2_var21.onconnect = eval;
		} catch (e) {console.log(e)}

		try {
			var func2_var22 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var24 = false;
		} catch (e) {console.log(e)}

		try {
			event.cancelBubble = func2_var24;
		} catch (e) {console.log(e)}

		try {
			var func2_var25 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var26 = await self.cookieStore.get(func2_var25);
		} catch (e) {console.log(e)}

		try {
			var func2_var27 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var28 = {};
		} catch (e) {console.log(e)}

		try {
			var func2_var29 = new PushEvent(func2_var27,func2_var28);
		} catch (e) {console.log(e)}

		try {
			var func2_var30 = await func2_var29.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func2_var31 = 'http://127.0.0.2:8080/input-8334_page-1.html#b28e7d7d';
		} catch (e) {console.log(e)}

		try {
			var func2_var32 = new FetchEvent(func2_var31,func2_var15);
		} catch (e) {console.log(e)}

		try {
			var func2_var33 = await func2_var32.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func2_var34 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func2_var35 = undefined;
		} catch (e) {console.log(e)}

		return func2_var35;
	}
	try {
		self.onmessage = func2;
	} catch (e) {console.log(e)}
async function func3(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '0de81d66');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = 'http://127.0.0.2:8080/input-8334_page-2.html#02d444ba';
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = '01f7';
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await self.clients.get(func3_var2);
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = {};
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = new AbortPaymentEvent(func3_var4,func3_var5);
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = 'http://127.0.0.2:8080/input-8334_page-2.html#549d224d';
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var10 = await func3_var6.initEvent(func3_var7,func3_var8,func3_var9);
		} catch (e) {console.log(e)}

		try {
			var func3_var11 = await func3_var6.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var12 = 'http://127.0.0.2:8080/input-8334_page-1.html#ab8e4006';
		} catch (e) {console.log(e)}

		try {
			var func3_var14 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var16 = 10;
		} catch (e) {console.log(e)}

		try {
			var func3_var17 = new Array(func3_var16);
		} catch (e) {console.log(e)}

		try {
			var func3_var15 = {changed: func3_var17, };
		} catch (e) {console.log(e)}

		try {
			var func3_var18 = new ExtendableCookieChangeEvent(func3_var14,func3_var15);
		} catch (e) {console.log(e)}

		try {
			var func3_var19 = false;
		} catch (e) {console.log(e)}

		try {
			func3_var18.returnValue = func3_var19;
		} catch (e) {console.log(e)}

		try {
			var func3_var20 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var21 = {};
		} catch (e) {console.log(e)}

		try {
			var func3_var22 = new PushSubscriptionChangeEvent(func3_var20,func3_var21);
		} catch (e) {console.log(e)}

		try {
			var func3_var23 = await func3_var22.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func3_var24 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var26 = {currency: func3_var0, value: func3_var0, };
		} catch (e) {console.log(e)}

		try {
			var func3_var28 = 'shipping';
		} catch (e) {console.log(e)}

		try {
			var func3_var27 = {requestPayerName: func3_var8, requestPayerEmail: func3_var8, requestPayerPhone: func3_var8, requestShipping: func3_var8, shippingType: func3_var28, };
		} catch (e) {console.log(e)}

		try {
			var func3_var25 = {topOrigin: func3_var0, paymentRequestOrigin: func3_var0, paymentRequestId: func3_var0, methodData: func3_var17, total: func3_var26, modifiers: func3_var17, instrumentKey: func3_var0, paymentOptions: func3_var27, shippingOptions: func3_var17, };
		} catch (e) {console.log(e)}

		try {
			var func3_var29 = new PaymentRequestEvent(func3_var24,func3_var25);
		} catch (e) {console.log(e)}

		try {
			var func3_var30 = false;
		} catch (e) {console.log(e)}

		try {
			func3_var29.cancelBubble = func3_var30;
		} catch (e) {console.log(e)}

		try {
			var func3_var31 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

async function func3_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, 'fef9d4f3');

			} catch (e) {console.log(e)}

			try {
				var func3_func0_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

async function func3_func0_func0(event) {
				try {
					check_site_violation('http://127.0.0.2:8080', location.origin, '76b912f1');

				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

async function func3_func0_func0_func0(event) {
					try {
						check_site_violation('http://127.0.0.2:8080', location.origin, '373ed552');

					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var1 = 'http://127.0.0.1:8080/input-8334_page-1.html#87cdb4aa';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var2 = await self.cookieStore.set(func3_func0_func0_func0_var0,func3_func0_func0_func0_var1);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var3 = {name: func3_func0_func0_func0_var0, url: func3_func0_func0_func0_var0, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var4 = await self.cookieStore.getAll(func3_func0_func0_func0_var3);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var5 = await event.waitUntil(func3_func0_func0_func0_var2);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var7 = 'none';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var6 = {name: func3_func0_func0_func0_var0, value: func3_func0_func0_func0_var0, domain: func3_func0_func0_func0_var0, path: func3_func0_func0_func0_var0, expires: Infinity, sameSite: func3_func0_func0_func0_var7, partitioned: self.isSecureContext, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var8 = await self.cookieStore.set(func3_func0_func0_func0_var6);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var9 = self.navigator.usb;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var10 = {filters: func3_var17, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var11 = await func3_func0_func0_func0_var9.requestDevice(func3_func0_func0_func0_var10);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var12 = 'data:blank';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var13 = {origin: func3_func0_func0_func0_var0, lastEventId: func3_func0_func0_func0_var0, source: self.serviceWorker, ports: func3_var17, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var14 = new ExtendableMessageEvent(func3_func0_func0_func0_var12,func3_func0_func0_func0_var13);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var15 = false;
					} catch (e) {console.log(e)}

					try {
						func3_func0_func0_func0_var14.returnValue = func3_func0_func0_func0_var15;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var16 = self.registration.cookies;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var17 = await func3_func0_func0_func0_var16.getSubscriptions();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var18 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var19 = {tag: func3_func0_func0_func0_var0, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var20 = new PeriodicSyncEvent(func3_func0_func0_func0_var18,func3_func0_func0_func0_var19);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var21 = await func3_func0_func0_func0_var20.stopPropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var22 = await func3_func0_func0_func0_var9.dispatchEvent(event);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var23 = await func3_func0_func0_func0_var20.stopPropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var24 = {includeUserActivation: self.isSecureContext, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var25 = await self.serviceWorker.postMessage(event,func3_func0_func0_func0_var24);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var26 = 'http://127.0.0.2:8080/input-8334_page-1.html#752b005d';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var27 = new InstallEvent(func3_func0_func0_func0_var26,func3_var5);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var28 = true;
					} catch (e) {console.log(e)}

					try {
						func3_func0_func0_func0_var27.returnValue = func3_func0_func0_func0_var28;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var29 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var30 = await func3_var29.changePaymentMethod(func3_func0_func0_func0_var29,{});
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func0_var31 = undefined;
					} catch (e) {console.log(e)}

					return func3_func0_func0_func0_var31;
				}

				try {
					var func3_func0_func0_var1 = {handleEvent: func3_func0_func0_func0};
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var2 = await self.cookieStore.removeEventListener(func3_func0_func0_var0,func3_func0_func0_var1);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var3 = 'http://127.0.0.2:8080/input-8334_page-2.html#5599de44';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var5 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var6 = new BackgroundFetchEvent(func3_func0_func0_var5,func3_func0_func0_var4);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var7 = true;
				} catch (e) {console.log(e)}

				try {
					func3_func0_func0_var6.cancelBubble = func3_func0_func0_var7;
				} catch (e) {console.log(e)}

async function func3_func0_func0_func1(event) {
					try {
						check_site_violation('http://127.0.0.2:8080', location.origin, 'c184715a');

					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var1 = 'http://127.0.0.1:8080/input-8334_page-2.html#6d5aeb12';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var0 = await func3_var29.openWindow(func3_func0_func0_func1_var1);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var2 = await func3_func0_func0_func1_var0.postMessage(event,func3_var17);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var3 = event.data;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var4 = await func3_func0_func0_func1_var3.json();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var5 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var6 = new HIDConnectionEvent(func3_func0_func0_func1_var5,func3_var13);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var7 = 'http://127.0.0.1:8080/input-8334_page-1.html#c449bc9c';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var8 = await func3_func0_func0_func1_var6.initEvent(func3_func0_func0_func1_var7);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var9 = await func3_func0_func0_var6.preventDefault();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var10 = await func3_func0_func0_var6.waitUntil(func3_var3);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var11 = await func3_func0_func0_var6.stopImmediatePropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var12 = await event.stopPropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var13 = {name: func3_func0_func0_func1_var1, domain: func3_func0_func0_func1_var1, path: func3_func0_func0_func1_var1, partitioned: self.isSecureContext, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var14 = await self.cookieStore.delete(func3_func0_func0_func1_var13);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var15 = await func3_func0_func0_func1_var3.arrayBuffer();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var16 = -26;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var17 = await self.setTimeout(func3_func0_func0_func1_var14,func3_func0_func0_func1_var16,event);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var18 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
					} catch (e) {console.log(e)}

async function func3_func0_func0_func1_func0(event) {
						try {
							check_site_violation('http://127.0.0.2:8080', location.origin, '2627f921');

						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var0 = 'http://127.0.0.1:8080/input-8334_page-1.html#49be5c2a';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var1 = {tag: func3_func0_func0_func1_func0_var0, lastChance: self.isSecureContext, };
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var2 = new SyncEvent(func3_func0_func0_func1_func0_var0,func3_func0_func0_func1_func0_var1);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var3 = await func3_func0_func0_func1_func0_var2.preventDefault();
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var4 = 'http://127.0.0.1:8080/input-8334_page-1.html#f3033bb3';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var5 = await func3_func0_func0_func1_var0.navigate(func3_func0_func0_func1_func0_var4);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var6 = await func3_func0_func0_func1_var0.postMessage(event,func3_var17);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var7 = 'data:blank';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var8 = new ExtendableMessageEvent(func3_func0_func0_func1_func0_var7);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var9 = true;
						} catch (e) {console.log(e)}

						try {
							func3_func0_func0_func1_func0_var8.cancelBubble = func3_func0_func0_func1_func0_var9;
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var10 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var11 = {tag: func3_func0_func0_func1_func0_var0, };
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var12 = new PeriodicSyncEvent(func3_func0_func0_func1_func0_var10,func3_func0_func0_func1_func0_var11);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var13 = await func3_func0_func0_func1_func0_var12.preventDefault();
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var14 = await func3_func0_func0_func1_func0_var8.stopImmediatePropagation();
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var15 = await func3_func0_func0_func1_func0_var12.stopPropagation();
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var16 = await func3_func0_func0_var6.stopPropagation();
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var17 = 'http://127.0.0.1:8080/input-8334_page-1.html#7adfc224';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var18 = new InstallEvent(func3_func0_func0_func1_func0_var17,func3_var5);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var19 = await func3_func0_func0_func1_func0_var18.waitUntil(func3_func0_func0_func1_func0_var5);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var20 = 'javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.2%3A8080%22%2C%20location.origin%2C%20%2230773887%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var22 = 'http://127.0.0.1:8080/input-8334_page-2.html#332925fb';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var23 = new USBConnectionEvent(func3_func0_func0_func1_func0_var22,func3_func0_func0_func1_func0_var21);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var24 = await func3_func0_func0_func1_func0_var23.composedPath();
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var25 = 'http://127.0.0.2:8080/input-8334_page-2.html#514bdc15';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var26 = new FetchEvent(func3_func0_func0_func1_func0_var25,func3_func0_func0_func1_var19);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var27 = await func3_func0_func0_func1_func0_var26.respondWith(func3_func0_func0_func1_func0_var5);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var28 = await func3_var29.waitUntil(func3_func0_func0_func1_func0_var5);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var29 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var30 = false;
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var31 = false;
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var32 = await func3_func0_func0_func1_func0_var23.initEvent(func3_func0_func0_func1_func0_var29,func3_func0_func0_func1_func0_var30,func3_func0_func0_func1_func0_var31);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var33 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var34 = true;
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var35 = await func3_func0_func0_func1_var6.initEvent(func3_func0_func0_func1_func0_var33,func3_func0_func0_func1_func0_var34);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var36 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var37 = new BackgroundFetchUpdateUIEvent(func3_func0_func0_func1_func0_var36,func3_func0_func0_var4);
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var38 = await func3_func0_func0_func1_func0_var37.stopPropagation();
						} catch (e) {console.log(e)}

						try {
							var func3_func0_func0_func1_func0_var39 = undefined;
						} catch (e) {console.log(e)}

						return func3_func0_func0_func1_func0_var39;
					}

					try {
						self.onnotificationclose = func3_func0_func0_func1_func0;
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var20 = {includeUserActivation: self.isSecureContext, };
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var21 = await self.serviceWorker.postMessage(event,func3_func0_func0_func1_var20);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var22 = await func3_var18.waitUntil(func3_func0_func0_func1_var14);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var23 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var24 = new NotificationEvent(func3_func0_func0_func1_var23,func3_var1);
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var25 = await func3_func0_func0_func1_var24.stopPropagation();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var26 = await func3_var6.composedPath();
					} catch (e) {console.log(e)}

					try {
						var func3_func0_func0_func1_var27 = undefined;
					} catch (e) {console.log(e)}

					return func3_func0_func0_func1_var27;
				}

				try {
					self.onnotificationclick = func3_func0_func0_func1;
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var8 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var10 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var11 = await self.cookieStore.delete(func3_func0_func0_var10);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var12 = 'http://127.0.0.2:8080/input-8334_page-2.html#39445a8b';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var13 = await self.clients.openWindow(func3_func0_func0_var12);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var14 = 'data:text/html,%3Chtml%3E%5Cn%3Chead%3E%3Cscript%3Enavigator.serviceWorker.register%28%22/sw.js%22%29.then%28%28reg%29%20%3D%3E%20%7Breg.update%28%29%3B%7D%29.catch%28%28e%29%20%3D%3E%20%7B%7D%29%3B%3C%5C/script%3E%5Cn%3Cscript%3Etry%20%7B%5Cn%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_iframe_site_violation%28src%2C%20frame%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20frame.contentWindow.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Biframe-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Iframe%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cntry%20%7B%5Cn%09function%20check_window_site_violation%28src%2C%20win%2C%20token%29%7B%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cn%20%20%20%20let%20cookie_site%20%3D%20win.document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%20%7B%5Cn%20%20%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20%20%20if%28cookie_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bwin-cookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Window%20Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%7D%5Cn%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%3C%5C/script%3E%5Cn%3C/head%3E%5Cn%3Cbody%3E%5Cn%3Ch1%3E3706459f%3C/h1%3E%3Cp%3Efoo%3C/p%3E8bf18cb9455f4a8e8fa93d14ab5ebb5d%5Cn%3Cscript%3E%5Cnasync%20function%20foo%28%29%20%7B%5Cn%09try%20%7B%5Cn%09%09function%20check_site_violation%28src%2C%20exec%2C%20token%29%7B%5Cn%5Cnlet%20fetch_url%20%3D%20new%20URL%28src%29%3B%5Cnlet%20exec_url%20%3D%20new%20URL%28exec%29%3B%5Cnif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%5Cn%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%5Cn%20%20return%20true%3B%5Cn%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cntry%20%7B%5Cn%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%5Cn%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%5Cn%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%5Cn%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%5Cn%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%20%20cookieStore.get%28%22sanitize_partitioned%22%29%5Cn%20%20%20%20.then%28c%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%5Cn%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cntry%20%7B%5Cn%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%5Cn%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%5Cn%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%5Cn%20%20%20%20%20%20return%20true%3B%5Cn%20%20%7D%5Cn%7D%20catch%20%28error%29%20%7B%5Cn%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%5Cn%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%5Cn%5Cn%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%5Cn%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%5Cn%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%5Cn%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%5Cn%5Cn%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%5Cn%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%20%20%20%20db.close%28%29%3B%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%5Cn%20%20%20%20%7D%3B%5Cn%7D%20catch%20%28e%29%20%7B%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%5Cn%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%5Cn%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%20%20%20%20readOriginPrivateFilesystem%28%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%20%20try%20%7B%5Cn%20%20%20%20function%20onFsError%28error%29%20%7B%5Cn%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%5Cn%20%20%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20f.text%28%29%5Cn%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%5Cn%20%20%20%20%20%20%20%20%7D%29%3B%5Cn%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20function%20onFsRead%28fs%29%20%7B%5Cn%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%5Cn%20%20%7D%5Cn%5Cn%20%20try%20%7B%5Cn%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%5Cn%5Cn%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%5Cn%20%20%20%20%20%20x.send%28%29%3B%5Cn%20%20%20%20%7D%29%3B%5Cn%20%20%7D%20catch%20%28error%29%20%7B%5Cn%7D%5Cn%5Cn%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%5Cn%20%20hosts.forEach%28host%20%3D%3E%20%7B%5Cn%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%5Cn%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%5Cn%20%20%20%20try%20%7B%5Cn%20%20%20%20%20%20fetch%28url%2C%20%7B%5Cn%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%5Cn%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%5Cn%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%5Cn%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%5Cn%20%20%7D%29%3B%5Cn%20%20return%20false%3B%5Cn%7D%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%09try%20%7B%5Cn%09%09check_site_violation%28%22http%3A//127.0.0.2%3A8080%22%2C%20location.origin%2C%20%226e8cfbc9%22%29%3B%5Cn%5Cn%09%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%5Cn%7D%5Cnfoo%28%29%3B%5Cn%3C%5C/script%3E%5Cn%3C/body%3E%5Cn%3C/html%3E';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var15 = {tag: func3_func0_func0_var0, lastChance: func3_func0_func0_var7, };
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var16 = new SyncEvent(func3_func0_func0_var14,func3_func0_func0_var15);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var17 = await func3_func0_func0_var16.waitUntil(func3_func0_func0_var11);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var18 = 'data:text/plain,foo';
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var19 = new HIDConnectionEvent(func3_func0_func0_var18,func3_var13);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var20 = await func3_func0_func0_var19.stopImmediatePropagation();
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var21 = await func3_var18.waitUntil(func3_func0_func0_var11);
				} catch (e) {console.log(e)}

				try {
					var func3_func0_func0_var22 = undefined;
				} catch (e) {console.log(e)}

				return func3_func0_func0_var22;
			}

			try {
				var func3_func0_var1 = {handleEvent: func3_func0_func0};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var2 = await self.serviceWorker.addEventListener(func3_func0_var0,func3_func0_var1,self.isSecureContext);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var3 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var4 = {tag: func3_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var5 = new PeriodicSyncEvent(func3_func0_var3,func3_func0_var4);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var6 = true;
			} catch (e) {console.log(e)}

			try {
				func3_func0_var5.cancelBubble = func3_func0_var6;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var7 = await self.serviceWorker.postMessage(event);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var8 = true;
			} catch (e) {console.log(e)}

			try {
				func3_var18.returnValue = func3_func0_var8;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var9 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var10 = new HIDConnectionEvent(func3_func0_var9,func3_var13);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var11 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var12 = true;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var13 = await func3_func0_var10.initEvent(func3_func0_var11,func3_func0_var12);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var14 = await func3_var6.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var15 = {country: func3_func0_var0, addressLine: func3_var17, region: func3_func0_var0, city: func3_func0_var0, dependentLocality: func3_func0_var0, postalCode: func3_func0_var0, sortingCode: func3_func0_var0, organization: func3_func0_var0, recipient: func3_func0_var0, phone: func3_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var16 = await func3_var29.changeShippingAddress(func3_func0_var15);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var17 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var19 = true;
			} catch (e) {console.log(e)}

			try {
				func3_func0_var10.returnValue = func3_func0_var19;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var20 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var21 = false;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var22 = true;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var23 = await event.initEvent(func3_func0_var20,func3_func0_var21,func3_func0_var22);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var24 = await func3_func0_var5.waitUntil(func3_func0_var16);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var25 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var26 = await self.serviceWorker.on(func3_func0_var25);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var27 = await func3_func0_var5.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var28 = undefined;
			} catch (e) {console.log(e)}

			return func3_func0_var28;
		}

		try {
			var func3_var32 = {handleEvent: func3_func0};
		} catch (e) {console.log(e)}

		try {
			var func3_var33 = await self.serviceWorker.removeEventListener(func3_var31,func3_var32,func3_var8);
		} catch (e) {console.log(e)}

		try {
			var func3_var34 = 'http://127.0.0.1:8080/input-8334_page-2.html#bb2dc7a1';
		} catch (e) {console.log(e)}

		try {
			var func3_var35 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var36 = false;
		} catch (e) {console.log(e)}

		try {
			var func3_var37 = await event.initEvent(func3_var34,func3_var35,func3_var36);
		} catch (e) {console.log(e)}

		try {
			var func3_var38 = 'http://127.0.0.2:8080/input-8334_page-2.html#cafc7254';
		} catch (e) {console.log(e)}

		try {
			var func3_var40 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var42 = await func3_var6.respondWith(func3_var3);
		} catch (e) {console.log(e)}

		try {
			var func3_var43 = 'http://127.0.0.1:8080/input-8334_page-1.html#4113ab77';
		} catch (e) {console.log(e)}

		try {
			var func3_var44 = {tag: func3_var0, };
		} catch (e) {console.log(e)}

		try {
			var func3_var45 = new PeriodicSyncEvent(func3_var43,func3_var44);
		} catch (e) {console.log(e)}

		try {
			var func3_var46 = true;
		} catch (e) {console.log(e)}

		try {
			func3_var45.cancelBubble = func3_var46;
		} catch (e) {console.log(e)}

		try {
			var func3_var47 = 'data:blank';
		} catch (e) {console.log(e)}

		try {
			var func3_var48 = await self.serviceWorker.removeEventListener(func3_var47,func3_var32,func3_var8);
		} catch (e) {console.log(e)}

		try {
			var func3_var49 = true;
		} catch (e) {console.log(e)}

		try {
			func3_var18.returnValue = func3_var49;
		} catch (e) {console.log(e)}

		try {
			var func3_var50 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var52 = undefined;
		} catch (e) {console.log(e)}

		return func3_var52;
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
            console.log('[UXSS] [sw-intercept-cookie-8d986912] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-2adce74d] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '16eb1299');

		} catch (e) {console.log(e)}

		try {
			var func4_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var1 = false;
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = true;
		} catch (e) {console.log(e)}

		try {
			var func4_var3 = await event.initEvent(func4_var0,func4_var1,func4_var2);
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = 'dccb';
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = await self.clients.get(func4_var4);
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = {currency: func4_var0, value: func4_var0, };
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = {topOrigin: func4_var0, paymentRequestOrigin: func4_var0, paymentRequestId: func4_var0, methodData: func4_var8, total: func4_var9, modifiers: func4_var8, instrumentKey: func4_var0, shippingOptions: func4_var8, };
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = new PaymentRequestEvent(func4_var6,func4_var7);
		} catch (e) {console.log(e)}

		try {
			var func4_var11 = 'http://127.0.0.1:8080/input-8334_page-1.html#644ae7b5';
		} catch (e) {console.log(e)}

		try {
			var func4_var12 = await func4_var10.changePaymentMethod(func4_var11,{});
		} catch (e) {console.log(e)}

		try {
			var func4_var14 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var15 = {};
		} catch (e) {console.log(e)}

		try {
			var func4_var16 = new AbortPaymentEvent(func4_var14,func4_var15);
		} catch (e) {console.log(e)}

		try {
			var func4_var17 = await func4_var16.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func4_var18 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func4_var19 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func4_var20 = false;
		} catch (e) {console.log(e)}

		try {
			func4_var16.returnValue = func4_var20;
		} catch (e) {console.log(e)}

		try {
			var func4_var21 = await event.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func4_var22 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var23 = await self.serviceWorker.on(func4_var22);
		} catch (e) {console.log(e)}

		try {
			var func4_var24 = self.navigator.hid;
		} catch (e) {console.log(e)}

		try {
			var func4_var25 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var26 = await func4_var24.on(func4_var25);
		} catch (e) {console.log(e)}

		try {
			var func4_var27 = await func4_var16.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func4_var28 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch('http://127.0.0.1:8080/input-8334_page-2.html#d8fa074f').then((resp) => {if (resp.ok) {return resp;} else {return fetch(event.request);}}).catch((err) => {return fetch(event.request);}));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
