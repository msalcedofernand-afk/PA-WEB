function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    try { fn(); } catch (e) { console.error(e); }
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      try { fn(); } catch (e) { console.error(e); }
    });
  }
}

onReady(function () {

  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  revealElements.forEach(function (el) {
    el.classList.add('visible');
  });

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '50px 0px 50px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  var btnVolverArriba = document.getElementById('btnVolverArriba');
  if (btnVolverArriba) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btnVolverArriba.classList.add('visible');
      } else {
        btnVolverArriba.classList.remove('visible');
      }
    });
    btnVolverArriba.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
