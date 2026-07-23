/* ==================================================== LOADER - Page Loader ==================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 400);
    });
    // Fallback: hide loader after 3s max
    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 3000);
  }

});
