// import $ from 'jquery';
// $(document).ready(function(){
//   setTimeout(() => {
//     $('body').niceScroll();
//   }, 1000);
// });
/*

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'})
  .then(function() {
    console.log('Service Worker Registered');
  }).catch(function(error) {
    console.log('Error in service worker registration', error);
  })
}
*/
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(function() {
    // serviceworker installed
  }).catch(function(error){ //eslint-disable-line
    // serviceworker error
  })
}
