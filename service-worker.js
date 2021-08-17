//service-worker.js
const CACHE_NAME = 'cache-v10';

const FILES_TO_CACHE = [
  "./index.html",
  "./styles.css",
  "./scripts.js",
  //"./image/band1.png",
  //"./image/band2.png",
  //"./image/band3.png",
  //"./image/band4.png",
  //"./image/band5.png",
  "./image/default.png",
  "./image/dmslogo.png",
  "./image/favicon.ico",
  "./image/padlet.png",
  "./image/padlet1.png",
  "./image/padlet2.png",
  "./image/padlet3.png",
  "./image/padlet4.png",
  "./image/padlet5.png",
  "./image/sport.png",
  "./image/가정.png",
  "./image/과학.png",
  "./image/국어.png",
  "./image/국어2.png",
  "./image/금.png",
  "./image/기술.png",
  "./image/농구.png",
  "./image/도덕.png",
  "./image/목.png",
  "./image/미술.png",
  "./image/배드민턴A.png",
  "./image/배드민턴B.png",
  "./image/풋살.png",
  "./image/사회.png",
  "./image/수.png",
  "./image/수학.png",
  "./image/수학2.png",
  "./image/시사.png",
  "./image/역사.png",
  "./image/영어.png",
  "./image/월.png",
  "./image/음악.png",
  "./image/조례.png",
  "./image/족구.png",
  "./image/진로.png",
  "./image/체육.png",
  "./image/축구.png",
  "./image/탁구.png",
  "./image/태권도.png",
  "./image/한문.png",
  "./image/화.png",
  "./image/회화.png"
];


self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode !== 'navigate') {
        return;
    }
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => cache.match('index.html'));
            }))
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') { // GET 요청만 캐싱 지원 처리
        return;
    }
    const fetchRequest = event.request.clone();
    event.respondWith(
        fetch(fetchRequest)
            .then((response) => {
                caches.open(CACHE_NAME) // 네트워크 요청 성공시 해당 결과값 캐싱
                      .then(cache => cache.put(event.request.url, response.clone()));
                return response;
            })
            .catch(() => {
                return caches.match(event.request.url)
                    .then(cache => {return cache;}) // 네트워크 요청 실패시 캐싱된 요청으로 응답.
            })
    )
    ;
});
