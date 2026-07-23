function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    try { fn(); } catch (e) { console.error(e); }
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      try { fn(); } catch (e) { console.error(e); }
    });
  }
}

/* ==================================================== NAVBAR - Scroll Effect + Mobile Close ==================================================== */

onReady(function () {

  var navbar = document.querySelector('.navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  if (navbar) {
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();
  }

  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var navCollapse = document.getElementById('navPrincipal');
  if (navCollapse) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      });
    });
  }

});
