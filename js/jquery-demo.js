/*
 * ============================================================
 * jQuery Demo - Fundamentos de Tecnologias Web (1IS063)
 * Tema 12: jQuery - Selectores, Eventos, Efectos, AJAX
 * ============================================================
 * Este archivo demuestra el uso de jQuery para mejorar la
 * experiencia del usuario en el sitio de JR Distribuciones.
 * ============================================================
 */

$(document).ready(function () {

  /* --------------------------------------------------------
   * 1. SELECTORES jQuery - Seleccionar elementos del DOM
   * -------------------------------------------------------- */

  // Seleccionar todos los enlaces del navbar y aplicar efecto hover
  $('.navbar-nav .nav-link').on('mouseenter', function () {
    $(this).stop().animate({ opacity: 0.7 }, 200);
  }).on('mouseleave', function () {
    $(this).stop().animate({ opacity: 1 }, 200);
  });

  // Seleccionar cards de productos y agregar efecto de sombra al hover
  $('.card-producto').on('mouseenter', function () {
    $(this).stop().animate({ marginTop: '-6px' }, 300);
  }).on('mouseleave', function () {
    $(this).stop().animate({ marginTop: '0px' }, 300);
  });

  /* --------------------------------------------------------
   * 2. EFECTOS jQuery - Mostrar / Ocultar / Animar
   * -------------------------------------------------------- */

  // Barra de anuncio superior (se muestra con efecto slideDown)
  var $barraAnuncio = $('#barraAnuncio');
  if ($barraAnuncio.length) {
    $barraAnuncio.hide().slideDown(600);
  }

  // Cerrar barra de anuncio con efecto slideUp
  $(document).on('click', '#barraAnuncioCerrar', function () {
    $('#barraAnuncio').slideUp(400);
  });

  /* --------------------------------------------------------
   * 3. EVENTOS jQuery - Validacion del formulario newsletter
   * -------------------------------------------------------- */

  var $formNewsletter = $('#formNewsletter');
  if ($formNewsletter.length) {
    $formNewsletter.on('submit', function (e) {
      e.preventDefault();
      var $email = $('#newsletterEmail');
      var emailVal = $email.val().trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Limpiar estados anteriores
      $email.removeClass('is-invalid is-valid');

      if (emailVal === '') {
        $email.addClass('is-invalid').focus();
        return;
      }

      if (!emailRegex.test(emailVal)) {
        $email.addClass('is-invalid').focus();
        return;
      }

      // Exito: animacion y mensaje
      $email.addClass('is-valid');
      var $botonEnvio = $formNewsletter.find('button[type="submit"]');
      var textoOriginal = $botonEnvio.html();
      $botonEnvio.html('<span>&#10003; Suscrito</span>').prop('disabled', true).css('background', '#16a34a');

      // Resetear despues de 3 segundos
      setTimeout(function () {
        $email.val('').removeClass('is-valid');
        $botonEnvio.html(textoOriginal).prop('disabled', false).css('background', '');
      }, 3000);
    });
  }

  /* --------------------------------------------------------
   * 4. EFECTOS jQuery - Contadores animados con jQuery
   * -------------------------------------------------------- */

  function animarContadorjQuery($elemento, objetivo, simbolo) {
    $({ count: 0 }).animate({ count: objetivo }, {
      duration: 2000,
      easing: 'swing',
      step: function () {
        $elemento.text(Math.floor(this.count) + simbolo);
      },
      complete: function () {
        $elemento.text(objetivo + simbolo);
      }
    });
  }

  // IntersectionObserver + jQuery para contadores
  if ($('.contador-numero').length) {
    var contadoresActivados = false;
    var observerContadores = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !contadoresActivados) {
          contadoresActivados = true;
          $('.contador-numero').each(function () {
            var $el = $(this);
            var objetivo = parseInt($el.data('objetivo'), 10);
            var simbolo = $el.data('simbolo') || '';
            animarContadorjQuery($el, objetivo, simbolo);
          });
        }
      });
    }, { threshold: 0.3 });

    $('.seccion-contadores').each(function () {
      observerContadores.observe(this);
    });
  }

  /* --------------------------------------------------------
   * 5. AJAX jQuery - Simulacion de busqueda de productos
   * -------------------------------------------------------- */

  var $buscadorProductos = $('#buscadorProductosjQuery');
  if ($buscadorProductos.length) {
    var temporizador;
    $buscadorProductos.on('keyup', function () {
      var consulta = $(this).val().toLowerCase().trim();
      clearTimeout(temporizador);

      temporizador = setTimeout(function () {
        var $productos = $('.producto');
        var $resultados = $('#resultadosBusquedajQuery');

        if (consulta.length === 0) {
          $productos.show();
          $resultados.text('').hide();
          return;
        }

        var encontrados = 0;
        $productos.each(function () {
          var nombre = $(this).data('nombre') || '';
          if (nombre.indexOf(consulta) !== -1) {
            $(this).show();
            encontrados++;
          } else {
            $(this).hide();
          }
        });

        $resultados.text('Se encontraron ' + encontrados + ' productos para "' + consulta + '"').fadeIn(300);
      }, 300);
    });
  }

  /* --------------------------------------------------------
   * 6. EFECTOS jQuery - Scroll suave para anclas
   * -------------------------------------------------------- */

  $('a[href^="#"]').on('click', function (e) {
    var destino = $(this.getAttribute('href'));
    if (destino.length) {
      e.preventDefault();
      $('html, body').stop().animate({ scrollTop: destino.offset().top - 80 }, 800, 'swing');
    }
  });

  /* --------------------------------------------------------
   * 7. EVENTOS jQuery - Tooltip personalizado en tarjetas
   * -------------------------------------------------------- */

  $('.card-producto').on('mouseenter', function () {
    var nombre = $(this).find('h6').text();
    if (nombre && !$(this).find('.tooltip-jq').length) {
      var $tooltip = $('<div class="tooltip-jq">Haz clic para ver detalles</div>');
      $(this).css('position', 'relative').append($tooltip);
      $tooltip.fadeIn(200);
    }
  }).on('mouseleave', function () {
    $(this).find('.tooltip-jq').fadeOut(200, function () {
      $(this).remove();
    });
  });

  /* --------------------------------------------------------
   * 8. jQuery - Efecto parallax en hero con scroll
   * -------------------------------------------------------- */

  $(window).on('scroll', function () {
    var scrollPos = $(this).scrollTop();
    $('.hero-bg').css('transform', 'translateY(' + (scrollPos * 0.3) + 'px)');
  });

  /* --------------------------------------------------------
   * 9. jQuery - Contenido dinamico: FAQ acordeon
   * -------------------------------------------------------- */

  $('.faq-pregunta').on('click', function () {
    var $respuesta = $(this).next('.faq-respuesta');
    var $icono = $(this).find('.faq-icono');

    // Cerrar otras preguntas abiertas
    $('.faq-respuesta').not($respuesta).slideUp(300);
    $('.faq-pregunta').not($(this)).removeClass('activa');

    // Toggle de la respuesta actual
    $respuesta.slideToggle(300);
    $(this).toggleClass('activa');
    $icono.text($(this).hasClass('activa') ? '−' : '+');
  });

  /* --------------------------------------------------------
   * 10. jQuery - Filtros animados de productos
   * -------------------------------------------------------- */

  $('.filtro-categoria-jq').on('click', function () {
    var categoria = $(this).data('filtro');

    // Actualizar boton activo
    $('.filtro-categoria-jq').removeClass('active');
    $(this).addClass('active');

    // Filtrar con efecto
    if (categoria === 'todos') {
      $('.producto').stop(true, true).fadeIn(300);
    } else {
      $('.producto').each(function () {
        if ($(this).data('categoria') === categoria) {
          $(this).stop(true, true).fadeIn(300);
        } else {
          $(this).stop(true, true).fadeOut(200);
        }
      });
    }
  });

});
