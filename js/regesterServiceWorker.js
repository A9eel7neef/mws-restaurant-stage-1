
//https://developers.google.com/web/fundamentals/codelabs/offline/ As Reference
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/sw.js', {scope: "/"})
    .then(reg => {
      console.log('Service Worker Successful: ' + reg.scope);
    })
    .catch(error => {
      console.log('Service Workee Failed: ' + error);
    });
}