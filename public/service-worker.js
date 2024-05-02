self.addEventListener('install', event => {
    console.log('Service Worker installing.');
  
    // Service Worker install
    event.waitUntil(
        // complete install
        self.skipWaiting().then(() => {
            // send message
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ url: 'self', text: 'Service Worker Install!' });
                });
            });
        })
    );
});

self.addEventListener('activate', event => {
    self.clients.claim();
    console.log('Service Worker activated.');
});

self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    // bypass self request
    if (requestUrl.origin === location.origin && 
        ( requestUrl.pathname == '/receive' ||
          requestUrl.pathname.includes('checkssb') 
        )
       ){
        return;
    }
  
    // if (event.request.method !== 'GET') {
    //     return;
    // }
  
    // loggin special domain request
    //if (requestUrl.hostname === 'artistic-spiny-network.glitch.me') 
    {
        fetch(event.request).then(response => {
            const clonedResponse = response.clone();
            
            clonedResponse.text().then(text => {
                //console.log(`Response from ${requestUrl}:`, text);
              
               // send to HTML
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({ url: requestUrl.toString(), text: text });
                    });
                });              
            });
        }).catch(error => {
            console.error(`Fetch error: ${error}`);
        });
    }


    // // return caching or response
    // event.respondWith(
    //     caches.match(event.request)
    //         .then(response => {
    //             if (response) {
    //                 return response;
    //             }
    //             return fetch(event.request).then(response => {
    //                 if (!response || response.status !== 200 || response.type !== 'basic') {
    //                     return response;
    //                 }
    //                 var responseToCache = response.clone();
    //                 caches.open('my-cache-name').then(cache => {
    //                     cache.put(event.request, responseToCache);
    //                 });
    //                 return response;
    //             });
    //         })
    // );
});
