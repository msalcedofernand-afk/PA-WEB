function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    try { fn(); } catch (e) { console.error(e); }
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      try { fn(); } catch (e) { console.error(e); }
    });
  }
}

/* ==================================================== CANVAS - Graph with High DPI ==================================================== */

onReady(function () {

  var canvas = document.getElementById('graficoCategorias');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    
    // Set internal resolution
    canvas.width = 560;
    canvas.height = 300;

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
    var margenSuperior = 25;
    var anchoBarra = 60;
    var espacio = 32;
    var maxValor = 50;
    var inicioX = 50;

    function drawRectRounded(context, x, y, width, height, radius) {
      if (context.roundRect) {
        context.beginPath();
        context.roundRect(x, y, width, height, [radius, radius, 0, 0]);
        context.fill();
      } else {
        context.beginPath();
        context.rect(x, y, width, height);
        context.fill();
      }
    }

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
        ctx.font = '600 12px Inter, Arial, sans-serif';
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

        ctx.fillStyle = 'rgba(0,0,0,.05)';
        drawRectRounded(ctx, x + 3, y + 3, anchoBarra, alturaBarra, 8);

        ctx.fillStyle = item.color;
        drawRectRounded(ctx, x, y, anchoBarra, alturaBarra, 8);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.valor + '%', x + anchoBarra / 2, y - 8);

        ctx.fillStyle = '#475569';
        ctx.font = '500 12px Inter, Arial, sans-serif';
        ctx.fillText(item.etiqueta, x + anchoBarra / 2, alto - margenInferior + 20);
      });
    }

    dibujarBarras(1);
  }

});
