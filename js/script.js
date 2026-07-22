/* ============================================================================
   JR DISTRIBUCIONES - script.js
   JavaScript vanilla (sin jQuery) con Bootstrap 5 - v2.0 Completo
   ============================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================================
     0. PAGE LOADER
     ========================================================================== */
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

  /* ==========================================================================
     1. NAVBAR: scroll effect + mobile close
     ========================================================================== */
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

  /* ==========================================================================
     2. VALIDACION DEL FORMULARIO DE CONTACTO
     ========================================================================== */
  var form = document.getElementById('formContacto');
  if (form) {
    var regexCelular = /^9\d{8}$/;
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var válido = true;

      var nombre = document.getElementById('nombre');
      var contacto = document.getElementById('contactoCliente');
      var mensaje = document.getElementById('mensaje');

      function marcarError(campoId, condicion) {
        var contenedor = document.getElementById(campoId);
        var input = contenedor.querySelector('input, textarea');
        if (condicion) {
          contenedor.classList.remove('was-validated');
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
          válido = false;
        }
      }

      marcarError('campoNombre', nombre.value.trim().length >= 3);

      var valorContacto = contacto.value.trim();
      marcarError('campoContacto', regexCelular.test(valorContacto) || regexCorreo.test(valorContacto));

      marcarError('campoMensaje', mensaje.value.trim().length >= 5);

      var aviso = document.getElementById('mensajeEnvio');
      if (válido) {
        aviso.classList.add('visible');
        form.reset();
        form.querySelectorAll('.is-valid').forEach(function (el) { el.classList.remove('is-valid'); });
        setTimeout(function () { aviso.classList.remove('visible'); }, 6000);
      } else {
        aviso.classList.remove('visible');
      }
    });
  }

  /* ==========================================================================
     3. FILTRO DE PRODUCTOS POR CATEGORIA
     ========================================================================== */
  var filtroBtns = document.querySelectorAll('.filtro-btn');
  if (filtroBtns.length > 0) {
    filtroBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var categoria = this.getAttribute('data-filtro');

        filtroBtns.forEach(function (b) { b.classList.remove('activo'); });
        this.classList.add('activo');

        var productos = document.querySelectorAll('.producto');
        var visibles = 0;

        productos.forEach(function (producto) {
          var catProducto = producto.getAttribute('data-categoria');
          var mostrar = (categoria === 'todos' || catProducto === categoria);

          if (mostrar) {
            producto.style.display = '';
            producto.style.opacity = '0';
            producto.style.transform = 'translateY(20px)';
            setTimeout(function () {
              producto.style.transition = 'opacity .4s ease, transform .4s ease';
              producto.style.opacity = '1';
              producto.style.transform = 'translateY(0)';
            }, 50);
            visibles++;
          } else {
            producto.style.transition = 'opacity .25s ease';
            producto.style.opacity = '0';
            setTimeout(function () { producto.style.display = 'none'; }, 250);
          }
        });

        var sinResultados = document.getElementById('sinResultados');
        if (sinResultados) {
          sinResultados.style.display = (visibles === 0) ? 'block' : 'none';
        }
      });
    });
  }

  /* ==========================================================================
     4. BUSQUEDA DE PRODUCTOS
     ========================================================================== */
  var busquedaInput = document.getElementById('busquedaProductos');
  if (busquedaInput) {
    busquedaInput.addEventListener('input', function () {
      var termino = this.value.toLowerCase().trim();
      var productos = document.querySelectorAll('.producto');
      var sinResultados = document.getElementById('sinResultados');
      var visibles = 0;

      // Reset filter buttons
      filtroBtns.forEach(function (b) { b.classList.remove('activo'); });
      var btnTodos = document.querySelector('.filtro-btn[data-filtro="todos"]');
      if (btnTodos) btnTodos.classList.add('activo');

      productos.forEach(function (producto) {
        var nombre = producto.querySelector('h6') ? producto.querySelector('h6').textContent.toLowerCase() : '';
        var desc = producto.querySelector('.producto-desc') ? producto.querySelector('.producto-desc').textContent.toLowerCase() : '';
        var categoria = producto.getAttribute('data-categoria') || '';
        var mostrar = (termino === '' || nombre.indexOf(termino) !== -1 || desc.indexOf(termino) !== -1 || categoria.indexOf(termino) !== -1);

        if (mostrar) {
          producto.style.display = '';
          producto.style.opacity = '1';
          visibles++;
        } else {
          producto.style.display = 'none';
          producto.style.opacity = '0';
        }
      });

      if (sinResultados) {
        sinResultados.style.display = (visibles === 0 && termino !== '') ? 'block' : 'none';
      }
    });
  }

  /* ==========================================================================
     5. CONTADORES ANIMADOS
     ========================================================================== */
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

  /* ==========================================================================
     6. GRAFICO ESTADISTICO (CANVAS API - con animacion)
     ========================================================================== */
  var canvas = document.getElementById('graficoCategorias');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');

    var datos = [
      { etiqueta: 'Abarrotes', valor: 45, color: '#4B146D' },
      { etiqueta: 'Bebidas', valor: 30, color: '#E30613' },
      { etiqueta: 'Lácteos', valor: 15, color: '#9B0056' },
      { etiqueta: 'Embutidos', valor: 25, color: '#F59E0B' },
      { etiqueta: 'Limpieza', valor: 20, color: '#666666' }
    ];

    var ancho = canvas.width;
    var alto = canvas.height;
    var margenInferior = 50;
    var margenSuperior = 20;
    var anchoBarra = 60;
    var espacio = 30;
    var maxValor = 50;
    var inicioX = 50;
    var duracion = 1200;
    var inicioAnimacion = null;

    function dibujarEjes() {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, alto - margenInferior);
      ctx.lineTo(ancho - 10, alto - margenInferior);
      ctx.stroke();

      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      for (var i = 1; i <= 4; i++) {
        var yLinea = alto - margenInferior - (i * 50);
        ctx.beginPath();
        ctx.moveTo(40, yLinea);
        ctx.lineTo(ancho - 10, yLinea);
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px Inter, Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((i * 10) + '%', 36, yLinea + 4);
      }
    }

    function dibujarBarras(progreso) {
      ctx.clearRect(0, 0, ancho, alto);
      dibujarEjes();

      datos.forEach(function (item, i) {
        var alturaFinal = (item.valor / maxValor) * (alto - margenSuperior - margenInferior);
        var alturaBarra = alturaFinal * progreso;
        var x = inicioX + i * (anchoBarra + espacio);
        var y = alto - margenInferior - alturaBarra;

        ctx.fillStyle = 'rgba(0,0,0,.06)';
        ctx.beginPath();
        ctx.roundRect(x + 4, y + 4, anchoBarra, alturaBarra, [8, 8, 0, 0]);
        ctx.fill();

        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.roundRect(x, y, anchoBarra, alturaBarra, [8, 8, 0, 0]);
        ctx.fill();

        if (progreso > 0.8) {
          var opacidad = (progreso - 0.8) / 0.2;
          ctx.globalAlpha = opacidad;
          ctx.fillStyle = '#1e293b';
          ctx.font = 'bold 13px Inter, Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(item.valor + '%', x + anchoBarra / 2, y - 10);

          ctx.fillStyle = '#475569';
          ctx.font = '11px Inter, Arial, sans-serif';
          ctx.fillText(item.etiqueta, x + anchoBarra / 2, alto - margenInferior + 18);
          ctx.globalAlpha = 1;
        }
      });
    }

    function animar(timestamp) {
      if (!inicioAnimacion) inicioAnimacion = timestamp;
      var elapsed = timestamp - inicioAnimacion;
      var progreso = Math.min(elapsed / duracion, 1);
      progreso = 1 - Math.pow(1 - progreso, 3);
      dibujarBarras(progreso);
      if (progreso < 1) {
        requestAnimationFrame(animar);
      }
    }

    var canvasObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          requestAnimationFrame(animar);
          canvasObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    canvasObserver.observe(canvas);
  }

  /* ==========================================================================
     7. SCROLL REVEAL (Intersection Observer)
     ========================================================================== */
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

  /* ==========================================================================
     8. BOTON VOLVER ARRIBA
     ========================================================================== */
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

  /* ==========================================================================
     9. NEWSLETTER
     ========================================================================== */
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

  /* ==========================================================================
     10. PARALLAX SENCILLO EN HERO
     ========================================================================== */
  var heroBg = document.querySelector('.hero-section .hero-bg');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    });
  }

  /* ==========================================================================
     11. TOOLTIP DE BOTONES (data-tooltip)
     ========================================================================== */
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

  /* ==========================================================================
     12. MODAL LIQUIDACION (aparece 3s despues de cargar)
     ========================================================================== */
  var modalLiquidacion = document.getElementById('modalLiquidacion');
  if (modalLiquidacion) {
    // Solo mostrar si no se cerro en esta sesion
    var liquidacionCerrada = sessionStorage.getItem('liquidacion_cerrada');
    if (!liquidacionCerrada) {
      setTimeout(function () {
        var bsModal = new bootstrap.Modal(modalLiquidacion);
        bsModal.show();
      }, 3000);
    }
    // Guardar cuando se cierre
    modalLiquidacion.addEventListener('hidden.bs.modal', function () {
      sessionStorage.setItem('liquidacion_cerrada', '1');
    });
  }

  /* ==========================================================================
     13. CARRITO DE COMPRAS
     ========================================================================== */

  // --- Inyectar botones "Agregar" en todas las tarjetas de producto ---
  var cards = document.querySelectorAll('.card-producto');
  var imgPaths = {};
  cards.forEach(function (card, i) {
    var imgEl = card.querySelector('.producto-img');
    var h6 = card.querySelector('h6');
    var precioEl = card.querySelector('.producto-precio');
    if (!h6 || !precioEl) return;

    var nombre = h6.textContent.trim();
    var precioTexto = precioEl.textContent.trim();
    var precioNum = parseFloat(precioTexto.replace('S/', '').replace(',', '').trim()) || 0;
    var imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    var id = 'prod-' + i;

    var wrapper = card.querySelector('.producto-img-wrapper') || card.querySelector('.card-body');
    if (wrapper && wrapper.classList.contains('producto-img-wrapper')) {
      wrapper.setAttribute('data-id', id);
      wrapper.setAttribute('data-nombre', nombre);
      wrapper.setAttribute('data-precio', precioNum);
      wrapper.setAttribute('data-img', imgSrc);
    }

    var btn = document.createElement('button');
    btn.className = 'btn-agregar-carrito';
    btn.setAttribute('data-id', id);
    btn.setAttribute('data-nombre', nombre);
    btn.setAttribute('data-precio', precioNum);
    btn.setAttribute('data-img', imgSrc);
    btn.innerHTML = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;vertical-align:middle;margin-right:4px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Agregar';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      agregarAlCarrito(
        this.getAttribute('data-id'),
        this.getAttribute('data-nombre'),
        parseFloat(this.getAttribute('data-precio')),
        this.getAttribute('data-img')
      );
      // Animacion feedback
      this.textContent = 'Agregado!';
      this.classList.add('agregado');
      var self = this;
      setTimeout(function () {
        self.innerHTML = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;vertical-align:middle;margin-right:4px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Agregar';
        self.classList.remove('agregado');
      }, 1200);
    });

    var cardBody = card.querySelector('.card-body');
    if (cardBody) {
      var existingBtn = cardBody.querySelector('.btn-agregar-carrito');
      if (!existingBtn) {
        cardBody.appendChild(btn);
      }
    }
  });

  // --- Estado del carrito ---
  var carrito = JSON.parse(localStorage.getItem('jr_carrito') || '[]');

  function guardarCarrito() {
    localStorage.setItem('jr_carrito', JSON.stringify(carrito));
    actualizarUI();
  }

  function agregarAlCarrito(id, nombre, precio, img) {
    var existente = carrito.find(function (item) { return item.id === id; });
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ id: id, nombre: nombre, precio: precio, img: img, cantidad: 1 });
    }
    guardarCarrito();
    // Abrir panel
    var panel = document.getElementById('carritoPanel');
    var overlay = document.getElementById('carritoOverlay');
    if (panel && overlay) {
      panel.classList.add('abierto');
      overlay.classList.add('visible');
    }
  }

  function eliminarDelCarrito(id) {
    carrito = carrito.filter(function (item) { return item.id !== id; });
    guardarCarrito();
  }

  function cambiarCantidad(id, delta) {
    var item = carrito.find(function (item) { return item.id === id; });
    if (!item) return;
    item.cantidad += delta;
    if (item.cantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      guardarCarrito();
    }
  }

  function actualizarUI() {
    var contador = document.getElementById('carritoContador');
    var itemsContainer = document.getElementById('carritoItems');
    var vacio = document.getElementById('carritoVacio');
    var footer = document.getElementById('carritoFooter');
    var subtotalEl = document.getElementById('carritoSubtotal');
    var whatsappBtn = document.getElementById('carritoWhatsApp');

    var totalItems = carrito.reduce(function (sum, item) { return sum + item.cantidad; }, 0);
    var totalPrecio = carrito.reduce(function (sum, item) { return sum + (item.precio * item.cantidad); }, 0);

    if (contador) {
      contador.textContent = totalItems;
      contador.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (itemsContainer) {
      itemsContainer.innerHTML = '';
      carrito.forEach(function (item) {
        var div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML =
          '<div class="carrito-item-img"><img src="' + item.img + '" alt="' + item.nombre + '"></div>' +
          '<div class="carrito-item-info">' +
            '<div class="carrito-item-nombre">' + item.nombre + '</div>' +
            '<div class="carrito-item-precio">S/ ' + (item.precio * item.cantidad).toFixed(2) + '</div>' +
            '<div class="carrito-item-controles">' +
              '<button class="carrito-btn-cant" data-id="' + item.id + '" data-delta="-1">-</button>' +
              '<span class="carrito-cant-num">' + item.cantidad + '</span>' +
              '<button class="carrito-btn-cant" data-id="' + item.id + '" data-delta="1">+</button>' +
              '<button class="carrito-btn-eliminar" data-id="' + item.id + '">' +
                '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
              '</button>' +
            '</div>' +
          '</div>';
        itemsContainer.appendChild(div);
      });
    }

    if (vacio) vacio.style.display = carrito.length === 0 ? 'flex' : 'none';
    if (footer) footer.style.display = carrito.length > 0 ? 'block' : 'none';
    if (subtotalEl) subtotalEl.textContent = 'S/ ' + totalPrecio.toFixed(2);

    // Construir mensaje de WhatsApp
    if (whatsappBtn && carrito.length > 0) {
      var mensaje = 'Hola, quiero hacer este pedido:\n\n';
      carrito.forEach(function (item) {
        mensaje += '- ' + item.nombre + ' x' + item.cantidad + ' = S/ ' + (item.precio * item.cantidad).toFixed(2) + '\n';
      });
      mensaje += '\n*Subtotal: S/ ' + totalPrecio.toFixed(2) + '*';
      if (totalPrecio >= 100) {
        mensaje += '\n\n(Envio gratis por compra mayor a S/ 100)';
      }
      var url = 'https://wa.me/51987654321?text=' + encodeURIComponent(mensaje);
      whatsappBtn.setAttribute('href', url);
    }

    // Delegar eventos de controles
    if (itemsContainer) {
      itemsContainer.querySelectorAll('.carrito-btn-cant').forEach(function (btn) {
        btn.addEventListener('click', function () {
          cambiarCantidad(this.getAttribute('data-id'), parseInt(this.getAttribute('data-delta')));
        });
      });
      itemsContainer.querySelectorAll('.carrito-btn-eliminar').forEach(function (btn) {
        btn.addEventListener('click', function () {
          eliminarDelCarrito(this.getAttribute('data-id'));
        });
      });
    }
  }

  // --- Abrir / Cerrar panel ---
  var carritoFloat = document.getElementById('carritoFloat');
  var carritoPanel = document.getElementById('carritoPanel');
  var carritoOverlay = document.getElementById('carritoOverlay');
  var carritoCerrar = document.getElementById('carritoCerrar');

  function abrirCarrito() {
    if (carritoPanel) carritoPanel.classList.add('abierto');
    if (carritoOverlay) carritoOverlay.classList.add('visible');
  }
  function cerrarCarrito() {
    if (carritoPanel) carritoPanel.classList.remove('abierto');
    if (carritoOverlay) carritoOverlay.classList.remove('visible');
  }

  if (carritoFloat) carritoFloat.addEventListener('click', abrirCarrito);
  if (carritoCerrar) carritoCerrar.addEventListener('click', cerrarCarrito);
  if (carritoOverlay) carritoOverlay.addEventListener('click', cerrarCarrito);

  // Inicializar UI del carrito
  actualizarUI();

});
