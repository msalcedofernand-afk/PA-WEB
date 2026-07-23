/* ==================================================== CART - Complete Cart System ==================================================== */

document.addEventListener('DOMContentLoaded', function () {

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
