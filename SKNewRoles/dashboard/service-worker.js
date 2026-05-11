const CACHE_NAME = 'SKNewRoles_v2';
// キャッシュするファイルのリスト
// service-worker.jsファイルからの相対パスで指定
const urlsToCache = [
    './index.html',
    './game_config/role_config.html',
    './game_config/shop_config.html',
    './game_config/skill_config.html',
    './credits.txt.gz',
    '../../css/snr_dashboard/nav.min.css',
    '../../css/snr_dashboard/role_config.min.css',
    '../../css/snr_dashboard/shop_config.min.css',
    '../../css/snr_dashboard/skill_config.min.css',
    '../../js/snr_dashboard/nav.js',
    '../../js/snr_dashboard/role_config.js',
    '../../js/snr_dashboard/shop_config.js',
    '../../js/snr_dashboard/skill_config.js',
    '../fonts/sknewroles_12bold.woff2'
];

// 1. インストールイベント (Service Worker登録時に実行)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            // 指定されたファイルをすべてキャッシュする
            return cache.addAll(urlsToCache);
        })
        .catch((error) => {
            console.log('Cache installation failed:', error);
        })
    );
});

// 2. フェッチイベント (リクエスト送信時に実行) - キャッシュファースト
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // キャッシュにあればそれを返し、なければネットワークから取得
            return response || fetch(event.request);
        })
    );
});

// 3. アクティベートイベント (Service Workerが有効になった時に実行)
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // CACHE_NAME (v1) 以外の古いキャッシュ(v0など)を削除する
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
