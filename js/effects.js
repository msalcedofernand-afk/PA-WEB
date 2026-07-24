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

  var newsletterForm = document.getElementById('formNewsletter');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = this.querySelector('input[type="email"]');
      var btn = this.querySelector('button');
      if (input && input.value.trim()) {
        btn.textContent = '¡Suscrito!';
        btn.style.background = '#16a34a';
        input.value = '';
        setTimeout(function () {
          btn.textContent = 'Suscribirme';
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  var heroBg = document.querySelector('.hero-section .hero-bg');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    });
  }

  var tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  tooltipTriggers.forEach(function (el) {
    el.style.position = 'relative';
    var tooltip = document.createElement('span');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = el.getAttribute('data-tooltip');
    tooltip.style.cssText = 'position:absolute;bottom:120%;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:6px 12px;border-radius:6px;font-size:.75rem;white-space:nowrap;opacity:0;visibility:hidden;transition:all .3s ease;pointer-events:none;z-index:10;';
    el.appendChild(tooltip);

    el.addEventListener('mouseenter', function () {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    });
    el.addEventListener('mouseleave', function () {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    });
  });

  var barraAnuncio = document.getElementById('barraAnuncio');
  var btnCerrarAnuncio = document.getElementById('barraAnuncioCerrar');
  if (barraAnuncio) {
    if (sessionStorage.getItem('barra_anuncio_cerrada') === '1') {
      barraAnuncio.style.display = 'none';
    }
    if (btnCerrarAnuncio) {
      btnCerrarAnuncio.addEventListener('click', function () {
        sessionStorage.setItem('barra_anuncio_cerrada', '1');
      });
    }
  }

  var modalLiquidacion = document.getElementById('modalLiquidacion');
  if (modalLiquidacion) {
    var liquidacionCerrada = sessionStorage.getItem('liquidacion_cerrada');
    if (!liquidacionCerrada && typeof bootstrap !== 'undefined') {
      setTimeout(function () {
        var bsModal = bootstrap.Modal.getOrCreateInstance(modalLiquidacion);
        bsModal.show();
      }, 3000);
    }
    modalLiquidacion.addEventListener('hidden.bs.modal', function () {
      sessionStorage.setItem('liquidacion_cerrada', '1');
    });
  }

});
