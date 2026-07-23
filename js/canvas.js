/* ==================================================== CANVAS - Graph with Animation ==================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var canvas = document.getElementById('graficoCategorias');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');

    var datos = [
      { etiqueta: 'Abarrotes', valor: 45, color: '#7B2FBE' },
      { etiqueta: 'Bebidas', valor: 30, color: '#FF2E63' },
      { etiqueta: 'Lácteos', valor: 15, color: '#A855F7' },
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

});
