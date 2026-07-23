function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    try { fn(); } catch (e) { console.error(e); }
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      try { fn(); } catch (e) { console.error(e); }
    });
  }
}

/* ==================================================== COUNTERS - Animated Counters ==================================================== */

onReady(function () {

  var contadores = document.querySelectorAll('.contador-numero[data-objetivo]');
  if (contadores.length > 0 && 'IntersectionObserver' in window) {
    var contadorObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animarContador(entry.target);
          contadorObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    contadores.forEach(function (c) { contadorObserver.observe(c); });
  }

  function animarContador(el) {
    var objetivo = parseInt(el.getAttribute('data-objetivo'), 10);
    var simbolo = el.getAttribute('data-simbolo') || '';
    var duracion = 2000;
    var inicio = 0;
    var startTime = null;

    function paso(timestamp) {
      if (!startTime) startTime = timestamp;
      var progreso = Math.min((timestamp - startTime) / duracion, 1);
      // Easing: easeOutCubic
      var eased = 1 - Math.pow(1 - progreso, 3);
      var valorActual = Math.floor(eased * objetivo);
      el.innerHTML = valorActual.toLocaleString('es-PE') + '<span class="contador-simbolo">' + simbolo + '</span>';
      if (progreso < 1) {
        requestAnimationFrame(paso);
      }
    }
    requestAnimationFrame(paso);
  }

});
