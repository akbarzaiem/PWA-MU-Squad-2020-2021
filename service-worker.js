const CACHE_NAME = 'mu-v1';
var urlsToCache = [
    "/",
    "https://fonts.googleapis.com/css?family=Ubuntu",
    "https://fonts.googleapis.com/icon?family=Ubuntu",
    "https://fonts.gstatic.com/s/ubuntu/v15/4iCs6KVjbNBYlgoKfw72nU6AFw.woff2",
    "https://fonts.gstatic.com/s/ubuntu/v15/4iCs6KVjbNBYlgoKfw72.woff2",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/first.html",
    "/pages/gk.html",
    "/pages/df.html",
    "/pages/mf.html",
    "/pages/st.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/MU_ICON.png",
    "/MU_ICON2.png",
    "/mu_logo.png",
    "/mu/de gea.png",
    "/mu/henderson.png",
    "/mu/grant.png",
    "/mu/joel.png",
    "/mu/romero.png",
    "/mu/lindelof.png",
    "/mu/maguire.png",
    "/mu/bailly.png",
    "/mu/pogba.png",
    "/mu/bruno.png",
    "/mu/beek.png",
    "/mu/martial.png",
    "/mu/rashford.png",
    "/mu/greenwood.png",
    "/mu/about.png",
    "/mu/gk.png",
    "/mu/df.png",
    "/mu/mf.png",
    "/mu/st.png"
];


//Menyimpan aset ke cache
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


// menghapus cache lama, ketika update vesion terbaru, agar pengguna tidak terbebani akan sizenya
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

// hapus cache ketika update version 
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});