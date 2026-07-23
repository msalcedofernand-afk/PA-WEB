function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    try { fn(); } catch (e) { console.error(e); }
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      try { fn(); } catch (e) { console.error(e); }
    });
  }
}

/* ==================================================== CART - Complete Cart System + Toast + Max Limit ==================================================== */

onReady(function () {

  var MAX_CANTIDAD_PRODUCTO = 50;
  var carrito = JSON.parse(localStorage.getItem('jr_carrito') || '[]');

  function guardarCarrito() {
    localStorage.setItem('jr_carrito', JSON.stringify(carrito));
    actualizarUI();
  }

  function mostrarToast(img, nombre, cantidad) {
    var container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container-jm';
      document.body.appendChild(container);
    }

    var toast = document.createElement('div');
    toast.className = 'toast-jm';
    toast.innerHTML =
      '<div class="toast-jm-img"><img src="' + img + '" alt="' + nombre + '"></div>' +
      '<div class="toast-jm-content">' +
        '<div class="toast-jm-title">¡Producto Agregado!</div>' +
        '<div class="toast-jm-desc">' + nombre + ' (x' + cantidad + ')</div>' +
      '</div>' +
      '<button class="toast-jm-btn">Ver Pedido</button>' +
      '<button class="toast-jm-close">&times;</button>';

    container.appendChild(toast);

    setTimeout(function () { toast.classList.add('visible'); }, 10);

    toast.querySelector('.toast-jm-btn').addEventListener('click', function () {
      abrirCarrito();
      toast.classList.remove('visible');
      setTimeout(function () { toast.remove(); }, 300);
    });

    toast.querySelector('.toast-jm-close').addEventListener('click', function () {
      toast.classList.remove('visible');
      setTimeout(function () { toast.remove(); }, 300);
    });

    setTimeout(function () {
      if (toast.parentNode) {
        toast.classList.remove('visible');
        setTimeout(function () { if (toast.parentNode) toast.remove(); }, 300);
      }
    }, 3500);
  }

  function agregarAlCarrito(id, nombre, precio, img, cantidad) {
    cantidad = cantidad ? parseInt(cantidad, 10) : 1;
    var existente = carrito.find(function (item) { return item.id === id; });
    var cantActual = existente ? existente.cantidad : 0;

    if (cantActual + cantidad > MAX_CANTIDAD_PRODUCTO) {
      alert('Límite máximo permitido por producto alcanzado (' + MAX_CANTIDAD_PRODUCTO + ' unidades).');
      cantidad = MAX_CANTIDAD_PRODUCTO - cantActual;
      if (cantidad <= 0) return;
    }

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ id: id, nombre: nombre, precio: precio, img: img, cantidad: cantidad });
    }
    guardarCarrito();
    mostrarToast(img, nombre, cantidad);

    var contador = document.getElementById('carritoContador');
    if (contador) {
      contador.style.transform = 'scale(1.4)';
      setTimeout(function () { contador.style.transform = 'scale(1)'; }, 300);
    }
  }

  function eliminarDelCarrito(id) {
    carrito = carrito.filter(function (item) { return item.id !== id; });
    guardarCarrito();
  }

  function vaciarCarrito() {
    if (carrito.length === 0) return;
    if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
      carrito = [];
      guardarCarrito();
    }
  }

  function cambiarCantidad(id, delta) {
    var item = carrito.find(function (item) { return item.id === id; });
    if (!item) return;
    if (delta > 0 && item.cantidad >= MAX_CANTIDAD_PRODUCTO) {
      alert('Límite máximo permitido por producto alcanzado (' + MAX_CANTIDAD_PRODUCTO + ' unidades).');
      return;
    }
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
    var panel = document.getElementById('carritoPanel');

    var totalItems = carrito.reduce(function (sum, item) { return sum + item.cantidad; }, 0);
    var totalPrecio = carrito.reduce(function (sum, item) { return sum + (item.precio * item.cantidad); }, 0);

    if (contador) {
      contador.textContent = totalItems;
      contador.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (panel) {
      var envioGratisContainer = panel.querySelector('.carrito-envio-gratis');
      if (!envioGratisContainer) {
        envioGratisContainer = document.createElement('div');
        envioGratisContainer.className = 'carrito-envio-gratis';
        var header = panel.querySelector('.carrito-header');
        if (header) header.insertAdjacentElement('afterend', envioGratisContainer);
      }

      var meta = 100;
      var restante = meta - totalPrecio;
      var porcentaje = Math.min((totalPrecio / meta) * 100, 100);

      var mensajeEnvio = restante <= 0
        ? '<span>🎉 ¡Felicidades! Tienes <strong>ENVÍO GRATIS</strong></span>'
        : '<span>Envío gratis a partir de S/ 100.00</span><span>Te faltan <strong>S/ ' + restante.toFixed(2) + '</strong></span>';

      envioGratisContainer.innerHTML =
        '<div class="envio-gratis-text">' + mensajeEnvio + '</div>' +
        '<div class="envio-gratis-bar"><div class="envio-gratis-progress" style="width: ' + porcentaje + '%;"></div></div>';
    }

    var carritoHeader = document.querySelector('.carrito-header');
    if (carritoHeader && !document.getElementById('carritoVaciarBtn')) {
      var btnVaciar = document.createElement('button');
      btnVaciar.id = 'carritoVaciarBtn';
      btnVaciar.className = 'carrito-btn-vaciar ms-auto me-2';
      btnVaciar.textContent = 'Vaciar';
      btnVaciar.addEventListener('click', vaciarCarrito);
      var btnCerrar = document.getElementById('carritoCerrar');
      if (btnCerrar) carritoHeader.insertBefore(btnVaciar, btnCerrar);
    }
    var btnVaciarExistente = document.getElementById('carritoVaciarBtn');
    if (btnVaciarExistente) {
      btnVaciarExistente.style.display = carrito.length > 0 ? 'inline-block' : 'none';
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
              '<button class="carrito-btn-eliminar" data-id="' + item.id + '" aria-label="Eliminar">' +
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

    if (whatsappBtn && carrito.length > 0) {
      var mensaje = 'Hola, quiero realizar el siguiente pedido:\n\n';
      carrito.forEach(function (item) {
        mensaje += '• ' + item.nombre + ' x' + item.cantidad + ' = S/ ' + (item.precio * item.cantidad).toFixed(2) + '\n';
      });
      mensaje += '\n*Subtotal: S/ ' + totalPrecio.toFixed(2) + '*';
      if (totalPrecio >= 100) {
        mensaje += '\n\n✅ *(¡Aplica Envío Gratis en Chiclayo!)*';
      }
      var url = 'https://wa.me/51987654321?text=' + encodeURIComponent(mensaje);
      whatsappBtn.setAttribute('href', url);
    }

    if (itemsContainer) {
      itemsContainer.querySelectorAll('.carrito-btn-cant').forEach(function (btn) {
        btn.addEventListener('click', function () {
          cambiarCantidad(this.getAttribute('data-id'), parseInt(this.getAttribute('data-delta'), 10));
        });
      });
      itemsContainer.querySelectorAll('.carrito-btn-eliminar').forEach(function (btn) {
        btn.addEventListener('click', function () {
          eliminarDelCarrito(this.getAttribute('data-id'));
        });
      });
    }
  }

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

  actualizarUI();

  document.addEventListener('click', function (e) {
    var btnAgregar = e.target.closest('.btn-agregar-carrito');
    if (btnAgregar) {
      e.preventDefault();
      e.stopPropagation();
      agregarAlCarrito(
        btnAgregar.getAttribute('data-id'),
        btnAgregar.getAttribute('data-nombre'),
        parseFloat(btnAgregar.getAttribute('data-precio')),
        btnAgregar.getAttribute('data-img'),
        1
      );
      btnAgregar.classList.add('agregado');
      btnAgregar.textContent = '¡Agregado!';
      setTimeout(function () {
        btnAgregar.classList.remove('agregado');
        btnAgregar.innerHTML = '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Agregar';
      }, 1200);
      return;
    }

    var btnVer = e.target.closest('.btn-ver-detalle');
    if (btnVer) {
      e.preventDefault();
      e.stopPropagation();
      var id = btnVer.getAttribute('data-id');
      var card = btnVer.closest('.card-producto') || btnVer.closest('.producto');

      var nombre = card ? (card.querySelector('h6') ? card.querySelector('h6').textContent : 'Producto') : 'Producto';
      var precioStr = card ? (card.querySelector('.producto-precio') ? card.querySelector('.producto-precio').textContent.replace('S/', '').trim() : '0') : '0';
      var desc = 'Producto de primera necesidad. Garantía de frescura y mejor precio en Chiclayo.';
      var img = card ? (card.querySelector('img') ? card.querySelector('img').getAttribute('src') : 'img/logos/logo-jr.png') : 'img/logos/logo-jr.png';
      var cat = card ? (card.querySelector('.badge-categoria') ? card.querySelector('.badge-categoria').textContent : 'Abarrotes') : 'Abarrotes';

      var btnAgregarRef = card ? card.querySelector('.btn-agregar-carrito') : null;
      if (btnAgregarRef) {
        id = btnAgregarRef.getAttribute('data-id') || id;
        nombre = btnAgregarRef.getAttribute('data-nombre') || nombre;
        precioStr = btnAgregarRef.getAttribute('data-precio') || precioStr;
        img = btnAgregarRef.getAttribute('data-img') || img;
      }

      var modalEl = document.getElementById('modalDetalleProducto');
      if (modalEl && typeof bootstrap !== 'undefined') {
        document.getElementById('modalProductoNombre').textContent = nombre;
        document.getElementById('modalProductoPrecio').textContent = 'S/ ' + parseFloat(precioStr).toFixed(2);
        document.getElementById('modalProductoDesc').textContent = desc;
        document.getElementById('modalProductoCategoria').textContent = cat;
        var modalImg = document.getElementById('modalProductoImg');
        modalImg.src = img;
        modalImg.alt = nombre;

        var cantInput = document.getElementById('modalCantInput');
        if (cantInput) cantInput.value = 1;

        var btnModalAgregar = document.getElementById('modalBtnAgregar');
        if (btnModalAgregar) {
          btnModalAgregar.setAttribute('data-id', id);
          btnModalAgregar.setAttribute('data-nombre', nombre);
          btnModalAgregar.setAttribute('data-precio', precioStr);
          btnModalAgregar.setAttribute('data-img', img);
        }

        var bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        bsModal.show();
      }
      return;
    }
  });

  var btnCantMenos = document.getElementById('modalCantMenos');
  var btnCantMas = document.getElementById('modalCantMas');
  var cantInputModal = document.getElementById('modalCantInput');
  var btnModalAgregar = document.getElementById('modalBtnAgregar');

  if (btnCantMenos && cantInputModal) {
    btnCantMenos.addEventListener('click', function () {
      var val = parseInt(cantInputModal.value, 10) || 1;
      if (val > 1) cantInputModal.value = val - 1;
    });
  }
  if (btnCantMas && cantInputModal) {
    btnCantMas.addEventListener('click', function () {
      var val = parseInt(cantInputModal.value, 10) || 1;
      if (val < MAX_CANTIDAD_PRODUCTO) {
        cantInputModal.value = val + 1;
      } else {
        alert('Límite máximo de ' + MAX_CANTIDAD_PRODUCTO + ' unidades por producto.');
      }
    });
  }
  if (btnModalAgregar) {
    btnModalAgregar.addEventListener('click', function () {
      var id = this.getAttribute('data-id');
      var nombre = this.getAttribute('data-nombre');
      var precio = parseFloat(this.getAttribute('data-precio'));
      var img = this.getAttribute('data-img');
      var cantidad = parseInt(cantInputModal ? cantInputModal.value : '1', 10);

      agregarAlCarrito(id, nombre, precio, img, cantidad);

      var modalEl = document.getElementById('modalDetalleProducto');
      if (modalEl && typeof bootstrap !== 'undefined') {
        var bsModal = bootstrap.Modal.getInstance(modalEl);
        if (bsModal) bsModal.hide();
      }
    });
  }

});


  // Ensure modal X close button works 100% cleanly
  var modalEl = document.getElementById('modalDetalleProducto');
  if (modalEl) {
    modalEl.querySelectorAll('[data-bs-dismiss="modal"], .btn-close').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (typeof bootstrap !== 'undefined') {
          var bsModal = bootstrap.Modal.getInstance(modalEl);
          if (bsModal) bsModal.hide();
        }
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
        document.body.classList.remove('modal-open');
        var backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
      });
    });
  }
