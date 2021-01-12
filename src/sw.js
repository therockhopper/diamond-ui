if ('workbox' in self) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log('ServiceWorker registration failed. Sorry about that.', e);
    }
  } else {
    console.log('Your browser does not support ServiceWorker.');
  }
}
