/* ==================================================== PRODUCTS - Filter by Category + Search ==================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var filtroBtns = document.querySelectorAll('.filtro-btn');

  /* ==========================================================================
     FILTRO DE PRODUCTOS POR CATEGORIA
     ========================================================================== */
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
     BUSQUEDA DE PRODUCTOS
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

});
