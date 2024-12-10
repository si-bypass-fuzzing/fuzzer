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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'afbd6c13');

		} catch (e) {console.log(e)}

		try {
			var func0_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var2 = 'http://127.0.0.2:8080/input-8343_page-2.html#d6475103';
		} catch (e) {console.log(e)}

		try {
			var func0_var3 = {data: func0_var0, };
		} catch (e) {console.log(e)}

		try {
			var func0_var4 = new PushEvent(func0_var2,func0_var3);
		} catch (e) {console.log(e)}

		try {
			var func0_var5 = await func0_var4.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func0_var6 = 'http://127.0.0.2:8080/input-8343_page-2.html#c8657e1a';
		} catch (e) {console.log(e)}

		try {
			var func0_var8 = 'http://127.0.0.2:8080/input-8343_page-2.html#e1c67e1d';
		} catch (e) {console.log(e)}

		try {
			var func0_var9 = new BackgroundFetchEvent(func0_var8,func0_var7);
		} catch (e) {console.log(e)}

		try {
			var func0_var10 = false;
		} catch (e) {console.log(e)}

		try {
			func0_var9.cancelBubble = func0_var10;
		} catch (e) {console.log(e)}

		try {
			var func0_var11 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var13 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func0_var12 = {deleted: func0_var13, };
		} catch (e) {console.log(e)}

		try {
			var func0_var14 = new ExtendableCookieChangeEvent(func0_var11,func0_var12);
		} catch (e) {console.log(e)}

		try {
			var func0_var15 = true;
		} catch (e) {console.log(e)}

		try {
			func0_var14.cancelBubble = func0_var15;
		} catch (e) {console.log(e)}

		try {
			var func0_var16 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func0_var17 = false;
		} catch (e) {console.log(e)}

		try {
			var func0_var18 = false;
		} catch (e) {console.log(e)}

		try {
			var func0_var19 = await func0_var9.initEvent(func0_var16,func0_var17,func0_var18);
		} catch (e) {console.log(e)}

		try {
			var func0_var20 = self.navigator.usb;
		} catch (e) {console.log(e)}

		try {
			func0_var20.onconnect = eval;
		} catch (e) {console.log(e)}

		try {
			var func0_var22 = 'data:blank';
		} catch (e) {console.log(e)}

		try {
			var func0_var21 = await self.clients.openWindow(func0_var22);
		} catch (e) {console.log(e)}

		try {
			var func0_var23 = await func0_var21.focus();
		} catch (e) {console.log(e)}

		try {
			var func0_var24 = 'http://127.0.0.2:8080/input-8343_page-2.html#efd380de';
		} catch (e) {console.log(e)}

async function func0_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '8241fff7');

			} catch (e) {console.log(e)}

			try {
				var func0_func0_var0 = 'javascript:async%20function%20foo%28%29%20%7Btry%20%7Bfunction%20check_site_violation%28src%2C%20exec%2C%20token%29%7Blet%20fetch_url%20%3D%20new%20URL%28src%29%3Blet%20exec_url%20%3D%20new%20URL%28exec%29%3Bif%28fetch_url.hostname%20%21%3D%20exec_url.hostname%29%7B%20%20console.log%28%22%5BUXSS%5D%20%5Bexec-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20exec_url.hostname%29%3B%20%20return%20true%3B%7D%20%20try%20%7B%20%20%20%20if%28IPCFuzzer.check_isolation%28src%29%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bprocess-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20src%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22Process%20Isolation%20Check%3A%20%22%20%2B%20error%29%3B%20%20%7Dtry%20%7B%20%20let%20cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize%3D%22%29%29%3B%20%20if%20%28cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20cookie_site%20%3D%20cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize%22%29.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%20%20%20%20%7D%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20partitioned_cookie_site%20%3D%20document.cookie.split%28%22%3B%20%22%29.find%28%28row%29%20%3D%3E%20row.startsWith%28%22sanitize_partitioned%3D%22%29%29%3B%20%20if%20%28partitioned_cookie_site%20%21%3D%3D%20null%29%7B%20%20%20%20partitioned_cookie_site%20%3D%20partitioned_cookie_site.split%28%22%3D%22%29%5B1%5D%3B%20%20%20%20if%28fetch_url.hostname%20%21%3D%20partitioned_cookie_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20partitioned_cookie_site%29%3B%20%20%20%20%20%20return%20true%3B%20%20%20%20%7D%20%20%7D%20%20cookieStore.get%28%22sanitize_partitioned%22%29%20%20%20%20.then%28c%20%3D%3E%20%7B%20%20%20%20%20%20if%28fetch_url.hostname%20%21%3D%20c.value%29%20%7B%20console.log%28%22%5BUXSS%5D%20%5Bcookie_partitioned-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20c.value%29%3B%7D%20%20%20%20%7D%29.catch%28e%20%3D%3E%20%7B%7D%29%3B%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22Cookie%3A%20%22%20%2B%20error%29%3B%7Dtry%20%7B%20%20let%20storage_site%20%3D%20localStorage.getItem%28%22sanitize%22%29%3B%20%20if%28storage_site%20%21%3D%20null%20%26%26%20fetch_url.hostname%20%21%3D%20storage_site%29%7B%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5BlocalStorage-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20storage_site%29%20%20%20%20%20%20return%20true%3B%20%20%7D%7D%20catch%20%28error%29%20%7B%20%20console.log%28%22localStorage%3A%20%22%20%2B%20error%29%3B%7D%20%20try%20%7B%20%20%20%20let%20openRequest%20%3D%20indexedDB.open%28%22sanitize%22%2C%201%29%3B%20%20%20%20openRequest.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20let%20db%20%3D%20e.target.result%3B%20%20%20%20%20%20let%20transaction%20%3D%20db.transaction%28%5B%22sanitize%22%5D%2C%20%22readonly%22%29%3B%20%20%20%20%20%20let%20store%20%3D%20transaction.objectStore%28%22sanitize%22%29%3B%20%20%20%20%20%20let%20request%20%3D%20store.get%28%22sanitize%22%29%3B%20%20%20%20%20%20request.onsuccess%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20let%20indexeddb_site%20%3D%20e.target.result.value%3B%20%20%20%20%20%20%20%20if%20%28fetch_url.hostname%20%21%3D%20indexeddb_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bindexeddb-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20indexeddb_site%29%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20request.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22Error%20reading%20data%3A%22%2C%20e.target.error%29%3B%20%20%20%20%20%20%20%20db.close%28%29%3B%20%20%20%20%20%20%7D%3B%20%20%20%20%7D%3B%20%20%20%20openRequest.onerror%20%3D%20function%28e%29%20%7B%20%20%20%20%20%20console.log%28%22Error%20opening%20database%3A%22%2C%20e.target.error%29%3B%20%20%20%20%7D%3B%7D%20catch%20%28e%29%20%7B%7D%20%20try%20%7B%20%20%20%20async%20function%20readOriginPrivateFilesystem%28%29%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20const%20dirHandle%20%3D%20await%20navigator.storage.getDirectory%28%29%3B%20%20%20%20%20%20%20%20const%20fileHandle%20%3D%20await%20dirHandle.getFileHandle%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%29%3B%20%20%20%20%20%20%20%20const%20file%20%3D%20await%20fileHandle.getFile%28%29%3B%20%20%20%20%20%20%20%20const%20opfs_site%20%3D%20await%20file.text%28%29%3B%20%20%20%20%20%20%20%20if%28opfs_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20opfs_site%29%20%7B%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bopfs-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20opfs_site%29%3B%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20readOriginPrivateFilesystem%28%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20function%20onFsError%28error%29%20%7B%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%20%20%20%20%7D%20%20%20%20function%20onFileEntryRead%28fe%29%20%7B%20%20%20%20%20%20try%20%7B%20%20%20%20%20%20%20%20fe.file%28%20%28f%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20f.text%28%29%20%20%20%20%20%20%20%20%20%20%20%20.then%28%20%28filesystem_site%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%20%20%20%20%20%20%20%20%7D%29%3B%20%20%20%20%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20%20%20%20%20console.log%28%22FileSystem%3A%20%22%20%2B%20error%29%3B%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%20%20function%20onFsRead%28fs%29%20%7B%20%20%20%20%20%20fs.root.getFile%28%22sanitize%22%2C%20%7Bcreate%3A%20false%7D%2C%20onFileEntryRead%2C%20onFsError%29%3B%20%20%20%20%7D%20%20%20%20webkitRequestFileSystem%28Window.TEMPORARY%2C%20256%2C%20onFsRead%2C%20onFsError%29%3B%20%20%7D%20catch%20%28error%29%20%7B%20%20%20%20console.log%28%22OPFS%3A%20%22%20%2B%20error%29%3B%20%20%7D%20%20try%20%7B%20%20%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20%20%20var%20x%20%3D%20new%20XMLHttpRequest%28%29%3B%20%20%20%20%20%20x.onload%20%3D%20function%20%28%29%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28this.readyState%20%3D%3D%204%20%26%26%20this.status%20%3D%3D%20200%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20filesystem_site%20%3D%20x.responseText%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20%28filesystem_site%20%21%3D%20%22%22%20%26%26%20fetch_url.hostname%20%21%3D%20filesystem_site%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfilesystem-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20fetch_url.hostname%20%2B%20%22%20%22%20%2B%20filesystem_site%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%3B%20%20%20%20%20%20x.open%28%22GET%22%2C%20%22filesystem%3Ahttp%3A//%22%20%2B%20host%20%2B%20%22%3A8080/temporary/sanitize%22%2C%20true%29%3B%20%20%20%20%20%20x.send%28%29%3B%20%20%20%20%7D%29%3B%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20let%20hosts%20%3D%20%5B%22127.0.0.1%22%2C%20%22127.0.0.2%22%5D%3B%20%20hosts.forEach%28host%20%3D%3E%20%7B%20%20%20%20let%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%20%20url%20%3D%20%22http%3A//%22%20%2B%20host%20%2B%20%22%3A8080/sanitizer-cookie%3Fnonce%3D%22%20%2B%20token%3B%20%20%20%20try%20%7B%20%20%20%20%20%20fetch%28url%2C%20%7B%20%20%20%20%20%20%20%20credentials%3A%20%22include%22%2C%20%20%20%20%20%20%20%20mode%3A%20%22cors%22%2C%20%20%20%20%20%20%7D%29.then%28%28response%29%20%3D%3E%20%7B%20%20%20%20%20%20%20%20%20%20if%20%28response.ok%28%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20let%20text%20%3D%20response.text%28%29%3B%20%20%20%20%20%20%20%20%20%20%20%20if%20%28text.includes%28%22127.0.0.2%22%29%29%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log%28%22%5BUXSS%5D%20%5Bfetch-credentialed-%22%20%2B%20token%20%2B%20%22%5D%20%22%20%2B%20host%20%2B%20%22%20%22%20%2B%20text%29%3B%20%20%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%20%20%20%7D%20%20%20%20%20%20%7D%29.catch%28error%20%3D%3E%20%7B%7D%29%3B%20%20%20%20%7D%20catch%20%28error%29%20%7B%7D%20%20%7D%29%3B%20%20return%20false%3B%7D%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7Dtry%20%7Bcheck_site_violation%28%22http%3A//127.0.0.2%3A8080%22%2C%20location.origin%2C%20%220be7e7b1%22%29%3B%7D%20catch%20%28e%29%20%7Bconsole.log%28e%29%7D%7Dfoo%28%29%3B';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var1 = new USBConnectionEvent(func0_func0_var0,func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var2 = await func0_func0_var1.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var3 = {includeUserActivation: self.isSecureContext, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var4 = await func0_var21.postMessage(event,func0_func0_var3);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var5 = await func0_var9.waitUntil(func0_var23);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var6 = false;
			} catch (e) {console.log(e)}

			try {
				func0_func0_var1.returnValue = func0_func0_var6;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var7 = await event.waitUntil(func0_var23);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var8 = await func0_var9.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var9 = self.navigator.hid;
			} catch (e) {console.log(e)}

			try {
				func0_func0_var9.ondisconnect = eval;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var10 = 'http://127.0.0.2:8080/input-8343_page-2.html#f13a00bf';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var11 = await self.clients.openWindow(func0_func0_var10);
			} catch (e) {console.log(e)}

			try {
				func0_var20.ondisconnect = eval;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var12 = true;
			} catch (e) {console.log(e)}

			try {
				func0_var9.returnValue = func0_func0_var12;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var13 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var14 = {id: func0_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var15 = new ContentIndexEvent(func0_func0_var13,func0_func0_var14);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var16 = await func0_func0_var15.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var17 = 'http://127.0.0.1:8080/input-8343_page-2.html#7f942e28';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var19 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var20 = {tag: func0_func0_var0, };
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var21 = new PeriodicSyncEvent(func0_func0_var19,func0_func0_var20);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var22 = await func0_func0_var21.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var23 = 'http://127.0.0.2:8080/input-8343_page-2.html#ac392ec3';
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var24 = new BackgroundFetchUpdateUIEvent(func0_func0_var23,func0_var7);
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var25 = false;
			} catch (e) {console.log(e)}

			try {
				func0_func0_var24.returnValue = func0_func0_var25;
			} catch (e) {console.log(e)}

			try {
				var func0_func0_var26 = undefined;
			} catch (e) {console.log(e)}

			return func0_func0_var26;
		}

		try {
			var func0_var25 = {handleEvent: func0_func0};
		} catch (e) {console.log(e)}

		try {
			var func0_var26 = await func0_var20.removeEventListener(func0_var24,func0_var25,func0_var10);
		} catch (e) {console.log(e)}

		try {
			var func0_var27 = 'http://127.0.0.1:8080/input-8343_page-2.html#f813c307';
		} catch (e) {console.log(e)}

		try {
			var func0_var29 = {includeUserActivation: func0_var10, };
		} catch (e) {console.log(e)}

		try {
			var func0_var30 = await func0_var21.postMessage(event,func0_var29);
		} catch (e) {console.log(e)}

		try {
			var func0_var31 = self.registration.cookies;
		} catch (e) {console.log(e)}

		try {
			var func0_var32 = await func0_var31.subscribe(func0_var13);
		} catch (e) {console.log(e)}

		try {
			var func0_var33 = undefined;
		} catch (e) {console.log(e)}

		return func0_var33;
	}
	try {
		self.oninstall = func0;
	} catch (e) {console.log(e)}
async function func1(event) {
		try {
			await event.waitUntil(clients.claim());
		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '85de0d9d');

		} catch (e) {console.log(e)}

		try {
			var func1_var0 = 'http://127.0.0.2:8080/input-8343_page-1.html#fadb0663';
		} catch (e) {console.log(e)}

		try {
			var func1_var2 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var3 = new HIDConnectionEvent(func1_var2,func1_var1);
		} catch (e) {console.log(e)}

		try {
			var func1_var4 = 'http://127.0.0.1:8080/input-8343_page-1.html#d70f6fb7';
		} catch (e) {console.log(e)}

		try {
			var func1_var5 = await self.clients.openWindow(func1_var4);
		} catch (e) {console.log(e)}

		try {
			var func1_var6 = true;
		} catch (e) {console.log(e)}

		try {
			event.cancelBubble = func1_var6;
		} catch (e) {console.log(e)}

		try {
			var func1_var7 = 'http://127.0.0.1:8080/input-8343_page-2.html#ec033e43';
		} catch (e) {console.log(e)}

		try {
			var func1_var8 = {id: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var9 = new ContentIndexEvent(func1_var7,func1_var8);
		} catch (e) {console.log(e)}

		try {
			var func1_var10 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var11 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var12 = false;
		} catch (e) {console.log(e)}

		try {
			var func1_var13 = await func1_var9.initEvent(func1_var10,func1_var11,func1_var12);
		} catch (e) {console.log(e)}

		try {
			var func1_var14 = '9d83';
		} catch (e) {console.log(e)}

		try {
			var func1_var15 = await self.clients.get(func1_var14);
		} catch (e) {console.log(e)}

		try {
			var func1_var16 = 'http://127.0.0.1:8080/input-8343_page-2.html#701ed883';
		} catch (e) {console.log(e)}

		try {
			var func1_var17 = {tag: func1_var0, lastChance: func1_var6, };
		} catch (e) {console.log(e)}

		try {
			var func1_var18 = new SyncEvent(func1_var16,func1_var17);
		} catch (e) {console.log(e)}

		try {
			var func1_var19 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var20 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var21 = false;
		} catch (e) {console.log(e)}

		try {
			var func1_var22 = await func1_var18.initEvent(func1_var19,func1_var20,func1_var21);
		} catch (e) {console.log(e)}

		try {
			var func1_var23 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var25 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var27 = new Array(event);
		} catch (e) {console.log(e)}

		try {
			var func1_var28 = {currency: func1_var0, value: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var30 = 'delivery';
		} catch (e) {console.log(e)}

		try {
			var func1_var29 = {requestPayerName: func1_var6, requestPayerEmail: func1_var6, requestPayerPhone: func1_var6, requestShipping: func1_var6, shippingType: func1_var30, };
		} catch (e) {console.log(e)}

		try {
			var func1_var26 = {topOrigin: func1_var0, paymentRequestOrigin: func1_var0, paymentRequestId: func1_var0, methodData: func1_var27, total: func1_var28, modifiers: func1_var27, instrumentKey: func1_var0, paymentOptions: func1_var29, shippingOptions: func1_var27, };
		} catch (e) {console.log(e)}

		try {
			var func1_var31 = new PaymentRequestEvent(func1_var25,func1_var26);
		} catch (e) {console.log(e)}

		try {
			var func1_var32 = await func1_var31.waitUntil(func1_var5);
		} catch (e) {console.log(e)}

		try {
			var func1_var34 = 'none';
		} catch (e) {console.log(e)}

		try {
			var func1_var33 = {name: func1_var0, value: func1_var0, path: func1_var0, expires: Infinity, sameSite: func1_var34, partitioned: func1_var6, };
		} catch (e) {console.log(e)}

		try {
			var func1_var35 = await self.cookieStore.set(func1_var33);
		} catch (e) {console.log(e)}

		try {
			var func1_var36 = await func1_var18.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func1_var37 = {name: func1_var0, url: func1_var0, };
		} catch (e) {console.log(e)}

		try {
			var func1_var38 = await self.cookieStore.getAll(func1_var37);
		} catch (e) {console.log(e)}

		try {
			var func1_var39 = true;
		} catch (e) {console.log(e)}

		try {
			func1_var9.returnValue = func1_var39;
		} catch (e) {console.log(e)}

		try {
			var func1_var40 = await func1_var31.respondWith(func1_var5);
		} catch (e) {console.log(e)}

		try {
			var func1_var41 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var42 = {data: event, origin: func1_var0, lastEventId: func1_var0, source: self.serviceWorker, ports: func1_var27, };
		} catch (e) {console.log(e)}

		try {
			var func1_var43 = new ExtendableMessageEvent(func1_var41,func1_var42);
		} catch (e) {console.log(e)}

		try {
			var func1_var44 = await func1_var43.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func1_var45 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var46 = false;
		} catch (e) {console.log(e)}

		try {
			var func1_var47 = true;
		} catch (e) {console.log(e)}

		try {
			var func1_var48 = await func1_var43.initEvent(func1_var45,func1_var46,func1_var47);
		} catch (e) {console.log(e)}

		try {
			var func1_var49 = await func1_var3.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func1_var50 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func1_var52 = undefined;
		} catch (e) {console.log(e)}

		return func1_var52;
	}
	try {
		self.onactivate = func1;
	} catch (e) {console.log(e)}
async function func2(event) {
		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, '5611e6e7');

		} catch (e) {console.log(e)}

		try {
			var func2_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var1 = {tag: func2_var0, lastChance: self.isSecureContext, };
		} catch (e) {console.log(e)}

		try {
			var func2_var2 = new SyncEvent(func2_var0,func2_var1);
		} catch (e) {console.log(e)}

		try {
			var func2_var3 = true;
		} catch (e) {console.log(e)}

		try {
			func2_var2.returnValue = func2_var3;
		} catch (e) {console.log(e)}

		try {
			var func2_var4 = 'http://127.0.0.1:8080/input-8343_page-1.html#77f1fca1';
		} catch (e) {console.log(e)}

		try {
			var func2_var6 = 18;
		} catch (e) {console.log(e)}

		try {
			var func2_var7 = new Array(func2_var6);
		} catch (e) {console.log(e)}

		try {
			var func2_var8 = {currency: func2_var0, value: func2_var0, };
		} catch (e) {console.log(e)}

		try {
			var func2_var10 = 'delivery';
		} catch (e) {console.log(e)}

		try {
			var func2_var9 = {requestPayerName: self.isSecureContext, requestPayerEmail: self.isSecureContext, requestPayerPhone: self.isSecureContext, requestShipping: self.isSecureContext, shippingType: func2_var10, };
		} catch (e) {console.log(e)}

		try {
			var func2_var5 = {paymentRequestOrigin: func2_var0, paymentRequestId: func2_var0, methodData: func2_var7, total: func2_var8, modifiers: func2_var7, paymentOptions: func2_var9, };
		} catch (e) {console.log(e)}

		try {
			var func2_var11 = new PaymentRequestEvent(func2_var4,func2_var5);
		} catch (e) {console.log(e)}

		try {
			var func2_var12 = 'http://127.0.0.2:8080/input-8343_page-1.html#46b649ac';
		} catch (e) {console.log(e)}

		try {
			var func2_var13 = await func2_var11.changeShippingOption(func2_var12);
		} catch (e) {console.log(e)}

		try {
			var func2_var14 = self.navigator.hid;
		} catch (e) {console.log(e)}

		try {
			func2_var14.ondisconnect = eval;
		} catch (e) {console.log(e)}

		try {
			var func2_var15 = 'http://127.0.0.2:8080/input-8343_page-2.html#878ff37f';
		} catch (e) {console.log(e)}

		try {
			var func2_var16 = {};
		} catch (e) {console.log(e)}

		try {
			var func2_var17 = new InstallEvent(func2_var15,func2_var16);
		} catch (e) {console.log(e)}

		try {
			var func2_var18 = await func2_var17.waitUntil(func2_var13);
		} catch (e) {console.log(e)}

		try {
			var func2_var19 = 'http://127.0.0.2:8080/input-8343_page-2.html#3d2c2de3';
		} catch (e) {console.log(e)}

		try {
			var func2_var20 = {tag: func2_var0, };
		} catch (e) {console.log(e)}

		try {
			var func2_var21 = new PeriodicSyncEvent(func2_var19,func2_var20);
		} catch (e) {console.log(e)}

		try {
			var func2_var22 = await func2_var21.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var23 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var25 = 'http://127.0.0.1:8080/input-8343_page-2.html#3c5bbaac';
		} catch (e) {console.log(e)}

		try {
			var func2_var27 = await func2_var21.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var28 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func2_var30 = await func2_var17.waitUntil(func2_var13);
		} catch (e) {console.log(e)}

		try {
			var func2_var31 = await func2_var2.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func2_var32 = self.navigator.usb;
		} catch (e) {console.log(e)}

		try {
			var func2_var33 = 'http://127.0.0.1:8080/input-8343_page-2.html#104fd134';
		} catch (e) {console.log(e)}

		try {
			var func2_var34 = await func2_var32.on(func2_var33);
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
			check_site_violation('http://127.0.0.2:8080', location.origin, 'a4383552');

		} catch (e) {console.log(e)}

		try {
			var func3_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var1 = {};
		} catch (e) {console.log(e)}

		try {
			var func3_var2 = new PushSubscriptionChangeEvent(func3_var0,func3_var1);
		} catch (e) {console.log(e)}

		try {
			var func3_var3 = await func3_var2.stopImmediatePropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var4 = 'http://127.0.0.1:8080/input-8343_page-2.html#67f1ae4b';
		} catch (e) {console.log(e)}

		try {
			var func3_var5 = {tag: func3_var0, lastChance: self.isSecureContext, };
		} catch (e) {console.log(e)}

		try {
			var func3_var6 = new SyncEvent(func3_var4,func3_var5);
		} catch (e) {console.log(e)}

		try {
			var func3_var7 = await func3_var6.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func3_var8 = 'http://127.0.0.1:8080/input-8343_page-1.html#ae3d60a8';
		} catch (e) {console.log(e)}

		try {
			var func3_var10 = 69;
		} catch (e) {console.log(e)}

		try {
			var func3_var11 = new Array(func3_var10);
		} catch (e) {console.log(e)}

		try {
			var func3_var9 = {changed: func3_var11, deleted: func3_var11, };
		} catch (e) {console.log(e)}

		try {
			var func3_var12 = new ExtendableCookieChangeEvent(func3_var8,func3_var9);
		} catch (e) {console.log(e)}

		try {
			var func3_var13 = await func3_var12.stopPropagation();
		} catch (e) {console.log(e)}

		try {
			var func3_var14 = self.registration.cookies;
		} catch (e) {console.log(e)}

		try {
			var func3_var15 = await func3_var14.subscribe(func3_var11);
		} catch (e) {console.log(e)}

		try {
			var func3_var16 = self.navigator.hid;
		} catch (e) {console.log(e)}

		try {
			var func3_var17 = {filters: func3_var11, exclusionFilters: func3_var11, };
		} catch (e) {console.log(e)}

		try {
			var func3_var18 = await func3_var16.requestDevice(func3_var17);
		} catch (e) {console.log(e)}

		try {
			var func3_var19 = 92;
		} catch (e) {console.log(e)}

		try {
			var func3_var20 = await self.setTimeout(func3_var11,func3_var19,event);
		} catch (e) {console.log(e)}

		try {
			var func3_var21 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var22 = {topOrigin: func3_var0, paymentRequestOrigin: func3_var0, methodData: func3_var11, modifiers: func3_var11, };
		} catch (e) {console.log(e)}

		try {
			var func3_var23 = new CanMakePaymentEvent(func3_var21,func3_var22);
		} catch (e) {console.log(e)}

		try {
			var func3_var24 = await func3_var23.preventDefault();
		} catch (e) {console.log(e)}

		try {
			var func3_var25 = 'http://127.0.0.2:8080/input-8343_page-2.html#dca019ac';
		} catch (e) {console.log(e)}

		try {
			var func3_var27 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var29 = await event.composedPath();
		} catch (e) {console.log(e)}

		try {
			var func3_var30 = 'http://127.0.0.1:8080/input-8343_page-1.html#a3d10041';
		} catch (e) {console.log(e)}

		try {
			var func3_var31 = {};
		} catch (e) {console.log(e)}

		try {
			var func3_var32 = new AbortPaymentEvent(func3_var30,func3_var31);
		} catch (e) {console.log(e)}

		try {
			var func3_var33 = await func3_var32.waitUntil(func3_var15);
		} catch (e) {console.log(e)}

		try {
			var func3_var34 = 'http://127.0.0.2:8080/input-8343_page-2.html#18081bef';
		} catch (e) {console.log(e)}

async function func3_func0(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, '60a5b39a');

			} catch (e) {console.log(e)}

			try {
				var func3_func0_var0 = self.navigator.usb;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var1 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var2 = await func3_func0_var0.on(func3_func0_var1);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var3 = await func3_var14.subscribe(func3_var11);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var4 = 'http://127.0.0.1:8080/input-8343_page-1.html#1b9f6a49';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var5 = {topOrigin: func3_func0_var1, paymentRequestOrigin: func3_func0_var1, paymentRequestId: func3_func0_var1, methodData: func3_var11, modifiers: func3_var11, instrumentKey: func3_func0_var1, shippingOptions: func3_var11, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var6 = new PaymentRequestEvent(func3_func0_var4,func3_func0_var5);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var7 = 'http://127.0.0.2:8080/input-8343_page-2.html#e319b10a';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var8 = true;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var9 = true;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var10 = await func3_func0_var6.initEvent(func3_func0_var7,func3_func0_var8,func3_func0_var9);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var11 = await func3_var23.waitUntil(func3_func0_var3);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var12 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var14 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var15 = {data: event, lastEventId: func3_func0_var1, ports: func3_var11, };
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var16 = new ExtendableMessageEvent(func3_func0_var14,func3_func0_var15);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var17 = 'data:blank';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var18 = false;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var19 = false;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var20 = await func3_func0_var16.initEvent(func3_func0_var17,func3_func0_var18,func3_func0_var19);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var21 = 'http://127.0.0.1:8080/input-8343_page-1.html#cfb3e9d1';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var22 = await func3_func0_var0.on(func3_func0_var21);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var23 = {};
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var24 = await func3_func0_var22.subscribe('',func3_func0_var23);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var25 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var26 = new InstallEvent(func3_func0_var25,func3_var31);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var27 = await func3_func0_var26.registerRouter('');
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var28 = await func3_var12.waitUntil(func3_func0_var3);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var29 = await func3_var12.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var30 = await func3_func0_var0.getDevices();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var31 = true;
			} catch (e) {console.log(e)}

			try {
				event.returnValue = func3_func0_var31;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var32 = 'http://127.0.0.2:8080/input-8343_page-1.html#fcbef72a';
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var33 = true;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var34 = true;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var35 = await event.initEvent(func3_func0_var32,func3_func0_var33,func3_func0_var34);
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var36 = false;
			} catch (e) {console.log(e)}

			try {
				func3_func0_var16.cancelBubble = func3_func0_var36;
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var37 = await func3_func0_var16.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func3_func0_var38 = undefined;
			} catch (e) {console.log(e)}

			return func3_func0_var38;
		}

		try {
			var func3_var35 = {handleEvent: func3_func0};
		} catch (e) {console.log(e)}

		try {
			var func3_var36 = await self.addEventListener(func3_var34,func3_var35,self.isSecureContext);
		} catch (e) {console.log(e)}

		try {
			var func3_var37 = 'http://127.0.0.2:8080/input-8343_page-2.html#04c98f2f';
		} catch (e) {console.log(e)}

		try {
			var func3_var39 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var40 = {data: event, origin: func3_var0, lastEventId: func3_var0, ports: func3_var11, };
		} catch (e) {console.log(e)}

		try {
			var func3_var41 = new ExtendableMessageEvent(func3_var39,func3_var40);
		} catch (e) {console.log(e)}

		try {
			var func3_var42 = false;
		} catch (e) {console.log(e)}

		try {
			func3_var41.cancelBubble = func3_var42;
		} catch (e) {console.log(e)}

		try {
			var func3_var43 = await func3_var2.preventDefault();
		} catch (e) {console.log(e)}

async function func3_func1(event) {
			try {
				check_site_violation('http://127.0.0.2:8080', location.origin, 'd2ce017b');

			} catch (e) {console.log(e)}

			try {
				var func3_func1_var0 = 'http://127.0.0.2:8080/input-8343_page-2.html#03425d37';
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var1 = new BackgroundFetchEvent(func3_func1_var0,func3_var28);
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var2 = true;
			} catch (e) {console.log(e)}

			try {
				func3_func1_var1.returnValue = func3_func1_var2;
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var3 = await func3_var41.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var4 = await func3_var14.getSubscriptions();
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var5 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var6 = {tag: func3_func1_var0, };
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var7 = new PeriodicSyncEvent(func3_func1_var5,func3_func1_var6);
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var8 = await func3_func1_var7.stopPropagation();
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var9 = await func3_var14.subscribe(func3_func1_var4);
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var10 = 'http://127.0.0.2:8080/input-8343_page-2.html#019a1561';
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var12 = false;
			} catch (e) {console.log(e)}

			try {
				func3_var6.cancelBubble = func3_func1_var12;
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var13 = true;
			} catch (e) {console.log(e)}

			try {
				func3_var2.returnValue = func3_func1_var13;
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var14 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var15 = false;
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var16 = false;
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var17 = await func3_func1_var7.initEvent(func3_func1_var14,func3_func1_var15,func3_func1_var16);
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var18 = true;
			} catch (e) {console.log(e)}

			try {
				func3_var23.cancelBubble = func3_func1_var18;
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var19 = false;
			} catch (e) {console.log(e)}

			try {
				func3_func1_var1.cancelBubble = func3_func1_var19;
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var20 = true;
			} catch (e) {console.log(e)}

			try {
				func3_var2.cancelBubble = func3_func1_var20;
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var21 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var22 = new HIDConnectionEvent(func3_func1_var21,func3_var38);
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var23 = await func3_func1_var22.stopImmediatePropagation();
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var24 = 'http://127.0.0.2:8080/input-8343_page-2.html#a8e92378';
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var25 = new BackgroundFetchUpdateUIEvent(func3_func1_var24,func3_var28);
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var26 = await func3_func1_var25.composedPath();
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var27 = await func3_var12.preventDefault();
			} catch (e) {console.log(e)}

			try {
				var func3_func1_var28 = undefined;
			} catch (e) {console.log(e)}

			return func3_func1_var28;
		}

		try {
			self.onbackgroundfetchsuccess = func3_func1;
		} catch (e) {console.log(e)}

		try {
			var func3_var44 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var45 = await func3_var16.removeEventListener(func3_var44,func3_var35,self.isSecureContext);
		} catch (e) {console.log(e)}

		try {
			var func3_var46 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func3_var47 = new BackgroundFetchUpdateUIEvent(func3_var46,func3_var28);
		} catch (e) {console.log(e)}

		try {
			var func3_var48 = true;
		} catch (e) {console.log(e)}

		try {
			func3_var47.returnValue = func3_var48;
		} catch (e) {console.log(e)}

		try {
			var func3_var49 = undefined;
		} catch (e) {console.log(e)}

		return func3_var49;
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
            console.log('[UXSS] [sw-intercept-cookie-0b779c70] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
		if (splitPair[0] == 'sanitize_partitioned' && splitPair[1] != '127.0.0.2') {
            console.log('[UXSS] [sw-intercept-cookie-partitioned-ee407169] ' + '127.0.0.2' + ' ' + splitPair[1]);
        }
	}

		} catch (e) {console.log(e)}

		try {
			check_site_violation('http://127.0.0.2:8080', location.origin, 'f2197b1a');

		} catch (e) {console.log(e)}

		try {
			self.serviceWorker.onstatechange = eval;
		} catch (e) {console.log(e)}

		try {
			var func4_var0 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var2 = '8bf18cb9455f4a8e8fa93d14ab5ebb5d';
		} catch (e) {console.log(e)}

		try {
			var func4_var4 = 'http://127.0.0.1:8080/input-8343_page-1.html#194d15c9';
		} catch (e) {console.log(e)}

		try {
			var func4_var6 = 61;
		} catch (e) {console.log(e)}

		try {
			var func4_var7 = new Array(func4_var6);
		} catch (e) {console.log(e)}

		try {
			var func4_var8 = {currency: func4_var0, value: func4_var0, };
		} catch (e) {console.log(e)}

		try {
			var func4_var5 = {paymentRequestOrigin: func4_var0, paymentRequestId: func4_var0, methodData: func4_var7, total: func4_var8, modifiers: func4_var7, shippingOptions: func4_var7, };
		} catch (e) {console.log(e)}

		try {
			var func4_var9 = new PaymentRequestEvent(func4_var4,func4_var5);
		} catch (e) {console.log(e)}

		try {
			var func4_var10 = new Promise(eval);
		} catch (e) {console.log(e)}

		try {
			var func4_var12 = true;
		} catch (e) {console.log(e)}

		try {
			event.returnValue = func4_var12;
		} catch (e) {console.log(e)}

		try {
			var func4_var13 = undefined;
		} catch (e) {console.log(e)}

		try {
			event.respondWith(fetch(event.request));
		} catch (e) {console.log(e)}
	}
	try {
		self.onfetch = func4;
	} catch (e) {console.log(e)}
