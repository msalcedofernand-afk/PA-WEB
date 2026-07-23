function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    try { fn(); } catch (e) { console.error(e); }
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      try { fn(); } catch (e) { console.error(e); }
    });
  }
}

/* ==================================================== LOADER - Fast Page Loader ==================================================== */

(function () {
  function ocultarLoader() {
    var loader = document.querySelector('.page-loader');
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(ocultarLoader, 200);
  } else {
    onReady(function () {
      setTimeout(ocultarLoader, 200);
    });
  }

  window.addEventListener('load', function () {
    ocultarLoader();
  });

  // Safety fallback
  setTimeout(ocultarLoader, 1000);
})();
