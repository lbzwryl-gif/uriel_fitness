const V="uriel-v1",FILES=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;e.respondWith(caches.open(V).then(async c=>{const m=await c.match(e.request,{ignoreSearch:true});const f=fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin==location.origin)c.put(e.request,r.clone());return r}).catch(()=>m||c.match("index.html"));return m||f}))});
