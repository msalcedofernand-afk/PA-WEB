/* ==================================================== FORMS - Contact Form Validation ==================================================== */

document.addEventListener('DOMContentLoaded', function () {

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

});
