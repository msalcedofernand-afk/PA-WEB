document.addEventListener('DOMContentLoaded', function () {

  var menuCheck = document.getElementById('menu-toggle');
  document.querySelectorAll('.menu-principal a').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
      if (menuCheck) menuCheck.checked = false;
    });
  });

  var form = document.getElementById('formContacto');
  if (form) {
    var regexCelular = /^9\d{8}$/;
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valido = true;

      var nombre = document.getElementById('nombre');
      var contacto = document.getElementById('contactoCliente');
      var mensaje = document.getElementById('mensaje');

      function marcarError(campoId, condicion) {
        var contenedor = document.getElementById(campoId);
        if (condicion) {
          contenedor.classList.remove('invalido');
        } else {
          contenedor.classList.add('invalido');
          valido = false;
        }
      }

      marcarError('campoNombre', nombre.value.trim().length >= 3);

      var valorContacto = contacto.value.trim();
      marcarError('campoContacto', regexCelular.test(valorContacto) || regexCorreo.test(valorContacto));

      marcarError('campoMensaje', mensaje.value.trim().length >= 5);

      var aviso = document.getElementById('mensajeEnvio');
      if (valido) {
        aviso.classList.add('visible');
        form.reset();
        setTimeout(function () { aviso.classList.remove('visible'); }, 6000);
      } else {
        aviso.classList.remove('visible');
      }
    });
  }

  if (typeof jQuery !== 'undefined') {
    jQuery(function ($) {
      $('.filtro-btn').on('click', function () {
        var categoria = $(this).data('filtro');

        $('.filtro-btn').removeClass('activo');
        $(this).addClass('activo');

        var visibles = 0;
        $('.producto').each(function () {
          var esVisible = (categoria === 'todos' || $(this).data('categoria') === categoria);
          if (esVisible) {
            $(this).fadeIn(200);
            visibles++;
          } else {
            $(this).hide();
          }
        });

        $('#sinResultados').toggle(visibles === 0);
      });
    });
  }

  var canvas = document.getElementById('graficoCategorias');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var datos = [
      { etiqueta: 'Abarrotes', valor: 45, color: '#2E7D32' },
      { etiqueta: 'Bebidas', valor: 30, color: '#F9A825' },
      { etiqueta: 'Limpieza', valor: 25, color: '#37474F' }
    ];

    var ancho = canvas.width;
    var alto = canvas.height;
    var margenInferior = 50;
    var margenSuperior = 20;
    var anchoBarra = 100;
    var espacio = 60;
    var maxValor = 50;
    var inicioX = 60;

    ctx.clearRect(0, 0, ancho, alto);

    ctx.strokeStyle = '#cfd8dc';
    ctx.beginPath();
    ctx.moveTo(40, alto - margenInferior);
    ctx.lineTo(ancho - 20, alto - margenInferior);
    ctx.stroke();

    datos.forEach(function (item, i) {
      var alturaBarra = (item.valor / maxValor) * (alto - margenSuperior - margenInferior);
      var x = inicioX + i * (anchoBarra + espacio);
      var y = alto - margenInferior - alturaBarra;

      ctx.fillStyle = item.color;
      ctx.fillRect(x, y, anchoBarra, alturaBarra);

      ctx.fillStyle = '#37474F';
      ctx.font = '14px Segoe UI, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.etiqueta, x + anchoBarra / 2, alto - margenInferior + 20);
      ctx.fillText(item.valor + '%', x + anchoBarra / 2, y - 8);
    });
  }

});
