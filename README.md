# code-talks19

## Hosting the Shop

In order for the shop to work properly, you need to host the static files and backend code on a Baqend app.
This section describes how to deploy the files to you Baqend app that you can start here: dashboard.baqend.com

For hosting on Baqend the following steps are needed:
1. Upload all assets from the static folder to the `www` of your Baqend app.
2. Create Baqend modules with the name `talks` and `topProducts` and fill them with the code from the backend folder.
3. Visit `https://<yourAppName>.app.baqend.com/v1/code/talks` to see the landing page of the shop.

## Testing Service Workers

Besides the active Service Worker (`/sw.js`) that implements a simple offline mode, the static files contain 5 different sw files with different stages of Service Worker implementations. They build on eachother and contain the following features:
* sw1.js: Offline modes (same as sw.js)
* sw2.js: Adds "cache only" strategy and prefills cache on installation
* sw3.js: Adds "cache, network fallback" strategy for all static destinations
* sw4.js: Adds "Network only" strategy for API calls.
* sw5.js: Adds "Cache then network" strategy for top products.

## Testing Speed Kit

All the tested caching strategies are not 100% satisfactory, because there are two remaining problems:
1. Cache Coherence: It is very difficult to cache data that can change at any time (e.g. top products and HTML file)
2. Personalized Data: It is impossible to cache personalized data and share these cache entries between users.

Both of these problem are solved with Speed Kit. In order to test is, uncomment the following line in the index.html:
```
<script src="https://pwa.app.baqend.com/v1/speedkit/install.js?d=pwa" async="" crossorigin="anonymous"></script>
```

To read more about how Speed Kit works, go to: https://medium.baqend.com/the-technology-behind-fast-websites-2638196fa60a
