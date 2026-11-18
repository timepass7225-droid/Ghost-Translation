const C='ghost-v5',F=['./','index.html','manifest.json','favicon.png','icons/icon-96.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const r=e.request;
 if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 // network first for the app page so updates arrive, cache as offline fallback
 e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});
