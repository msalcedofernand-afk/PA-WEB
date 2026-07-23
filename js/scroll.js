/* ==================================================== SCROLL - Scroll Reveal + Back to Top ==================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { revealObserver.observe(el); });
  }

  var btnVolverArriba = document.getElementById('btnVolverArriba');
  if (btnVolverArriba) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
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
