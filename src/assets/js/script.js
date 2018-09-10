/*
// create a global object to keep track of different global tings.
var gb = {};
window.gb = gb;
if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register('/sw.js')
  navigator.serviceWorker.register('/sw.js')
  // http://localhost:5010/sw.js
    .then(function () {
      // serviceworker installed
    }).catch(function (error) { //eslint-disable-line
      // serviceworker error
    });

  navigator.serviceWorker.ready.then(sw => {
    gb.sw = sw;
  });
}
*/