function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    try { fn(); } catch (e) { console.error(e); }
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      try { fn(); } catch (e) { console.error(e); }
    });
  }
}

window.JR_PRODUCTOS_DATA = window.JR_PRODUCTOS_DATA || [
  {
    "id": "prod-1",
    "nombre": "Arroz Costeno 45kg",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 135.0,
    "img": "img/productos/abarrotes/arroz_costeno_saco.png",
    "oferta": "Oferta"
  },
  {
    "id": "prod-2",
    "nombre": "Aceite Primor Premium 1L",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 7.5,
    "img": "img/productos/abarrotes/aceite_primor_premium_1l.jpg",
    "oferta": null
  },
  {
    "id": "prod-3",
    "nombre": "Aceite Capri 1L",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 6.5,
    "img": "img/productos/abarrotes/aceite_capri_1l.png",
    "oferta": null
  },
  {
    "id": "prod-4",
    "nombre": "Harina Blanca Flor 1kg",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 3.8,
    "img": "img/productos/abarrotes/harina_blanca_flor_preparada_sin_preparar.png",
    "oferta": null
  },
  {
    "id": "prod-5",
    "nombre": "Fideos Spaghetti Molitalia",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 3.2,
    "img": "img/productos/abarrotes/fideos_spaghetti_molitalia.jpg",
    "oferta": null
  },
  {
    "id": "prod-6",
    "nombre": "Fideos Tornillo Molitalia",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 3.2,
    "img": "img/productos/abarrotes/fideos_tornillo_molitalia.jpg",
    "oferta": null
  },
  {
    "id": "prod-7",
    "nombre": "Avena Angel Instantanea",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 4.5,
    "img": "img/productos/abarrotes/avena_hojuelas_angel_instantanea.png",
    "oferta": null
  },
  {
    "id": "prod-8",
    "nombre": "Margarina Sello de Oro",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 5.8,
    "img": "img/productos/abarrotes/margarina_sello_de_oro_pote.png",
    "oferta": null
  },
  {
    "id": "prod-9",
    "nombre": "Leche Gloria Entera 1L",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 4.8,
    "img": "img/productos/lacteos/leche_gloria_entera_caja_1l.jpg",
    "oferta": null
  },
  {
    "id": "prod-10",
    "nombre": "Leche Gloria Sin Lactosa 1L",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 5.2,
    "img": "img/productos/lacteos/leche_gloria_sin_lactosa_caja_1l.jpg",
    "oferta": null
  },
  {
    "id": "prod-11",
    "nombre": "Leche Gloria Chocolate 180ml",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 1.8,
    "img": "img/productos/lacteos/leche_gloria_chocolate_180ml_cajas.jpg",
    "oferta": null
  },
  {
    "id": "prod-12",
    "nombre": "Leche Condensada Gloria",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 4.5,
    "img": "img/productos/lacteos/leche_condensada_gloria_lata.png",
    "oferta": null
  },
  {
    "id": "prod-13",
    "nombre": "Mantequilla Gloria",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 6.2,
    "img": "img/productos/lacteos/mantequilla_gloria_barra_y_pote.png",
    "oferta": null
  },
  {
    "id": "prod-14",
    "nombre": "Crema de Leche Gloria",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 3.8,
    "img": "img/productos/lacteos/crema_de_leche_gloria.jpg",
    "oferta": null
  },
  {
    "id": "prod-15",
    "nombre": "Dulce de Leche Gloria",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 7.5,
    "img": "img/productos/lacteos/dulce_de_leche_gloria_pote.png",
    "oferta": null
  },
  {
    "id": "prod-16",
    "nombre": "Yogurt Gloria Fresa",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 3.5,
    "img": "img/productos/lacteos/yogurt_gloria_fresa_botella.jpg",
    "oferta": null
  },
  {
    "id": "prod-17",
    "nombre": "Jamon Razzeto Ingles",
    "categoria": "embutidos",
    "categoriaLabel": "Embutidos",
    "precio": 8.5,
    "img": "img/productos/embutidos/jamon_razzeto_ingles.jpg",
    "oferta": "Oferta"
  },
  {
    "id": "prod-18",
    "nombre": "Mortadela Razzeto",
    "categoria": "embutidos",
    "categoriaLabel": "Embutidos",
    "precio": 6.8,
    "img": "img/productos/embutidos/mortadela_razzeto.jpg",
    "oferta": null
  },
  {
    "id": "prod-19",
    "nombre": "Queso Edam Razzeto",
    "categoria": "embutidos",
    "categoriaLabel": "Embutidos",
    "precio": 9.5,
    "img": "img/productos/embutidos/queso_edam_razzeto.jpg",
    "oferta": null
  },
  {
    "id": "prod-20",
    "nombre": "Pizzarella Razzeto",
    "categoria": "embutidos",
    "categoriaLabel": "Embutidos",
    "precio": 7.2,
    "img": "img/productos/embutidos/pizzarella_razzeto.jpg",
    "oferta": null
  },
  {
    "id": "prod-21",
    "nombre": "Tocino Razzeto Ahumado",
    "categoria": "embutidos",
    "categoriaLabel": "Embutidos",
    "precio": 7.8,
    "img": "img/productos/embutidos/tocino_razzeto_ahumado.jpg",
    "oferta": null
  },
  {
    "id": "prod-22",
    "nombre": "Hamburguesa Super Burger",
    "categoria": "embutidos",
    "categoriaLabel": "Embutidos",
    "precio": 8.2,
    "img": "img/productos/embutidos/hamburguesa_super_burger_razzeto.jpg",
    "oferta": null
  },
  {
    "id": "prod-23",
    "nombre": "Salchicha Hot Dog Razzeto",
    "categoria": "embutidos",
    "categoriaLabel": "Embutidos",
    "precio": 5.5,
    "img": "img/productos/embutidos/hot_dog_razzeto.jpg",
    "oferta": null
  },
  {
    "id": "prod-24",
    "nombre": "Jamonada Especial Razzeto",
    "categoria": "embutidos",
    "categoriaLabel": "Embutidos",
    "precio": 6.5,
    "img": "img/productos/embutidos/jamonada_especial_razzeto_empaque.jpg",
    "oferta": null
  },
  {
    "id": "prod-25",
    "nombre": "Gaseosa Inca Kola 1.5L",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 4.5,
    "img": "img/productos/bebidas/gaseosa_inca_kola.png",
    "oferta": "Popular"
  },
  {
    "id": "prod-26",
    "nombre": "Cerveza Pilsen Callao",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 3.5,
    "img": "img/productos/bebidas/cerveza_pilsen_callao.png",
    "oferta": null
  },
  {
    "id": "prod-27",
    "nombre": "Chocolatada Shake Gloria",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 2.8,
    "img": "img/productos/bebidas/chocolatada_shake_chocolate_gloria.jpg",
    "oferta": null
  },
  {
    "id": "prod-28",
    "nombre": "Chocolate Taza Cusco Sayon",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 3.2,
    "img": "img/productos/bebidas/chocolate_taza_cusco_sayon.png",
    "oferta": null
  },
  {
    "id": "prod-29",
    "nombre": "Mermelada Gloria Fresa",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 5.8,
    "img": "img/productos/abarrotes/mermelada_gloria_fresa_frasco.jpg",
    "oferta": null
  },
  {
    "id": "prod-30",
    "nombre": "Sublime Dolcetto Donofrio",
    "categoria": "helados",
    "categoriaLabel": "Helados",
    "precio": 1.8,
    "img": "img/productos/helados/helado_donofrio_sublime_dolcetto.jpg",
    "oferta": null
  },
  {
    "id": "prod-31",
    "nombre": "Peziduri Donofrio",
    "categoria": "helados",
    "categoriaLabel": "Helados",
    "precio": 12.5,
    "img": "img/productos/helados/helado_donofrio_peziduri_pote.jpg",
    "oferta": null
  },
  {
    "id": "prod-32",
    "nombre": "Frio Rico Sandwich",
    "categoria": "helados",
    "categoriaLabel": "Helados",
    "precio": 2.2,
    "img": "img/productos/helados/helado_donofrio_peziduri_frio_rico_sandwich.jpg",
    "oferta": null
  },
  {
    "id": "prod-33",
    "nombre": "Dolcetto Duo Donofrio",
    "categoria": "helados",
    "categoriaLabel": "Helados",
    "precio": 2.0,
    "img": "img/productos/helados/helado_donofrio_sublime_dolcetto_duo.jpg",
    "oferta": null
  },
  {
    "id": "prod-34",
    "nombre": "Salsas Alacena BBQ/Mayo/Ketchup",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 4.2,
    "img": "img/productos/abarrotes/salsas_alacena_barbecue_mayonesa_ketchup.png",
    "oferta": null
  },
  {
    "id": "prod-35",
    "nombre": "Salsa Pomarola Primor",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 3.5,
    "img": "img/productos/abarrotes/salsa_pomarola_primor.png",
    "oferta": null
  },
  {
    "id": "prod-36",
    "nombre": "Cremas Alacena Ketchup/Mayo",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 4.8,
    "img": "img/productos/abarrotes/cremas_alacena_ketchup_mayonesa.png",
    "oferta": null
  },
  {
    "id": "prod-37",
    "nombre": "Paneton Gloria Caja",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 14.5,
    "img": "img/productos/abarrotes/paneton_gloria_caja.jpg",
    "oferta": "Temporada"
  },
  {
    "id": "prod-38",
    "nombre": "Detergente Bolivar",
    "categoria": "limpieza",
    "categoriaLabel": "Limpieza",
    "precio": 3.5,
    "img": "img/productos/limpieza/detergente_bolivar_empaque.png",
    "oferta": null
  },
  {
    "id": "prod-39",
    "nombre": "Detergente Opal 4kg",
    "categoria": "limpieza",
    "categoriaLabel": "Limpieza",
    "precio": 18.5,
    "img": "img/productos/limpieza/detergente_polvo_opal_antibacterial_4kg.jpg",
    "oferta": null
  },
  {
    "id": "prod-40",
    "nombre": "Esponja Scotch Brite 3un",
    "categoria": "limpieza",
    "categoriaLabel": "Limpieza",
    "precio": 4.5,
    "img": "img/productos/limpieza/esponja_scotch_brite_multiusos_3un.jpg",
    "oferta": null
  },
  {
    "id": "prod-41",
    "nombre": "Esponja Scotch Brite 6un",
    "categoria": "limpieza",
    "categoriaLabel": "Limpieza",
    "precio": 7.8,
    "img": "img/productos/limpieza/esponja_scotch_brite_multiusos_6un.jpg",
    "oferta": null
  },
  {
    "id": "prod-42",
    "nombre": "Pano Absorbente 9un",
    "categoria": "limpieza",
    "categoriaLabel": "Limpieza",
    "precio": 12.0,
    "img": "img/productos/limpieza/pano_absorbente_scotch_brite_9un.jpg",
    "oferta": null
  },
  {
    "id": "prod-43",
    "nombre": "Bolsa Basura Virutex 50L",
    "categoria": "limpieza",
    "categoriaLabel": "Limpieza",
    "precio": 14.5,
    "img": "img/productos/limpieza/bolsa_basura_50l_virutex_negro_60un.jpg",
    "oferta": null
  },
  {
    "id": "prod-44",
    "nombre": "Arroz Añejo Costeño 5kg",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 16.5,
    "img": "img/productos/abarrotes/arroz_anejo_extra_costeno_5kg.jpg",
    "oferta": null
  },
  {
    "id": "prod-45",
    "nombre": "Arroz Extra Faraón 5kg",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 17.0,
    "img": "img/productos/abarrotes/arroz_extra_faraon_5kg.jpg",
    "oferta": null
  },
  {
    "id": "prod-46",
    "nombre": "Arroz Gourmet Gran Chalán 5kg",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 18.0,
    "img": "img/productos/abarrotes/arroz_extra_gourmetanejo_gran_chalan_5kg.jpg",
    "oferta": null
  },
  {
    "id": "prod-47",
    "nombre": "Azúcar Rubia Cartavio 5kg",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 15.5,
    "img": "img/productos/abarrotes/azucar_rubia_cartavio_5kg.jpg",
    "oferta": null
  },
  {
    "id": "prod-48",
    "nombre": "Aceite Cocinero 1L",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 6.8,
    "img": "img/productos/abarrotes/aceite_cocinero_1l.png",
    "oferta": null
  },
  {
    "id": "prod-49",
    "nombre": "Aceite Primor Premium 3 Pack",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 21.0,
    "img": "img/productos/abarrotes/aceite_primor_premium_3pack.png",
    "oferta": null
  },
  {
    "id": "prod-50",
    "nombre": "Café Nescafé Tradición 170g",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 18.5,
    "img": "img/productos/abarrotes/cafe_instantaneo_nescafe_tradicion_170g.jpg",
    "oferta": null
  },
  {
    "id": "prod-51",
    "nombre": "Café Nescafé Fina Selección 170g",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 22.0,
    "img": "img/productos/abarrotes/cafe_instantaneo_nescafe_fina_seleccion_170g.jpg",
    "oferta": null
  },
  {
    "id": "prod-52",
    "nombre": "Harina Sin Preparar 1kg",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 3.5,
    "img": "img/productos/abarrotes/harina_blanca_flor_preparada_sin_preparar.png",
    "oferta": null
  },
  {
    "id": "prod-53",
    "nombre": "Mermelada Gloria Fresa",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 5.8,
    "img": "img/productos/abarrotes/mermelada_gloria_fresa_frasco.jpg",
    "oferta": null
  },
  {
    "id": "prod-54",
    "nombre": "Cremas Peruanas Alacena",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 4.2,
    "img": "img/productos/abarrotes/cremas_peruanas_alacena_huancaina_uchucuta_tari.png",
    "oferta": null
  },
  {
    "id": "prod-55",
    "nombre": "Spaghetti Don Vittorio 950g",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 5.5,
    "img": "img/productos/abarrotes/fideos_don_vittorio_spaghetti_950g.jpg",
    "oferta": null
  },
  {
    "id": "prod-56",
    "nombre": "Pan Integral Bimbo 360g",
    "categoria": "abarrotes",
    "categoriaLabel": "Abarrotes",
    "precio": 5.8,
    "img": "img/productos/abarrotes/pan_molde_integral_bimbo_vital_360g.jpg",
    "oferta": null
  },
  {
    "id": "prod-57",
    "nombre": "Gaseosa Coca Cola 3L",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 9.5,
    "img": "img/productos/bebidas/gaseosa_coca_cola_botella_3l.jpg",
    "oferta": "Popular"
  },
  {
    "id": "prod-58",
    "nombre": "Gaseosa Guaraná 3L",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 8.5,
    "img": "img/productos/bebidas/gaseosa_guarana_botella_3l.jpg",
    "oferta": null
  },
  {
    "id": "prod-59",
    "nombre": "Hey Fit Black Fizz 600ml",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 3.8,
    "img": "img/productos/bebidas/gaseosa_hey_fit_black_fizz_600ml.jpg",
    "oferta": null
  },
  {
    "id": "prod-60",
    "nombre": "Shake Capuccino Gloria",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 2.8,
    "img": "img/productos/bebidas/chocolatada_shake_capuccino_gloria.jpg",
    "oferta": null
  },
  {
    "id": "prod-61",
    "nombre": "Shake Mocaccino Gloria",
    "categoria": "bebidas",
    "categoriaLabel": "Bebidas",
    "precio": 2.8,
    "img": "img/productos/bebidas/chocolatada_shake_mocaccino_gloria.jpg",
    "oferta": null
  },
  {
    "id": "prod-62",
    "nombre": "Leche Gloria Niños Lata",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 4.2,
    "img": "img/productos/lacteos/leche_gloria_ninos_lata.jpg",
    "oferta": null
  },
  {
    "id": "prod-63",
    "nombre": "Leche Gloria Zero Lacto 6un",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 22.0,
    "img": "img/productos/lacteos/leche_gloria_zero_lacto_lata_390g_6un.jpg",
    "oferta": null
  },
  {
    "id": "prod-64",
    "nombre": "Leche Sin Lactosa 3 Pack",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 15.0,
    "img": "img/productos/lacteos/leche_gloria_sin_lactosa_caja_3pack.jpg",
    "oferta": null
  },
  {
    "id": "prod-65",
    "nombre": "Leche Piamonte 946ml",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 4.5,
    "img": "img/productos/lacteos/leche_entera_piamonte_946ml.jpg",
    "oferta": null
  },
  {
    "id": "prod-66",
    "nombre": "Leche Condensada Doypack",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 5.2,
    "img": "img/productos/lacteos/leche_condensada_gloria_doypack.png",
    "oferta": null
  },
  {
    "id": "prod-67",
    "nombre": "Mantequilla Gloria Pote 390g",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 12.5,
    "img": "img/productos/lacteos/mantequilla_gloria_pote_390g.jpg",
    "oferta": null
  },
  {
    "id": "prod-68",
    "nombre": "Yogurt Griego Vakimu 1kg",
    "categoria": "lácteos",
    "categoriaLabel": "Lácteos",
    "precio": 16.0,
    "img": "img/productos/lacteos/yogurt_griego_arandanos_vakimu_1kg.jpg",
    "oferta": null
  },
  {
    "id": "prod-69",
    "nombre": "Pisco Cuatro Gallos Quebranta 700ml",
    "categoria": "licores",
    "categoriaLabel": "Licores",
    "precio": 38.0,
    "img": "img/productos/licores/pisco_cuatro_gallos_puro_quebranta_700ml.jpg",
    "oferta": null
  },
  {
    "id": "prod-70",
    "nombre": "Pisco Cuatro Gallos Italia 700ml",
    "categoria": "licores",
    "categoriaLabel": "Licores",
    "precio": 42.0,
    "img": "img/productos/licores/pisco_cuatro_gallos_puro_italia_700ml.jpg",
    "oferta": null
  },
  {
    "id": "prod-71",
    "nombre": "Pisco Cuatro Gallos Acholado 700ml",
    "categoria": "licores",
    "categoriaLabel": "Licores",
    "precio": 40.0,
    "img": "img/productos/licores/pisco_cuatro_gallos_puro_acholado_700ml.jpg",
    "oferta": null
  },
  {
    "id": "prod-72",
    "nombre": "Johnnie Walker Red Label 750ml",
    "categoria": "licores",
    "categoriaLabel": "Licores",
    "precio": 65.0,
    "img": "img/productos/licores/whisky_johnnie_walker_red_label_750ml.jpg",
    "oferta": null
  }
];

onReady(function () {

  var grilla = document.getElementById('grillaProductos');

  if (grilla) {
    var dataset = window.JR_PRODUCTOS_DATA || [];
    grilla.innerHTML = '';
    dataset.forEach(function (item) {
      var col = document.createElement('div');
      col.className = 'col-lg-3 col-md-6 producto';
      col.setAttribute('data-categoria', item.categoria);
      col.setAttribute('data-nombre', item.nombre.toLowerCase());

      var badgeOferta = item.oferta ? '<span class="producto-badge badge bg-danger">' + item.oferta + '</span>' : '';

      col.innerHTML =
        '<div class="card card-producto">' +
          '<div class="producto-img-wrapper">' +
            badgeOferta +
            '<img src="' + item.img + '" alt="' + item.nombre + '" class="producto-img" loading="lazy">' +
          '</div>' +
          '<div class="card-body">' +
            '<span class="badge-categoria">' + item.categoriaLabel + '</span>' +
            '<h6>' + item.nombre + '</h6>' +
            '<div class="producto-precio">S/ ' + item.precio.toFixed(2) + '</div>' +
            '<div class="card-btns">' +
              '<button class="btn-agregar-carrito" data-id="' + item.id + '" data-nombre="' + item.nombre + '" data-precio="' + item.precio + '" data-img="' + item.img + '">' +
                '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Agregar' +
              '</button>' +
              '<button class="btn-ver-detalle" data-id="' + item.id + '">' +
                '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Ver' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      grilla.appendChild(col);
    });
  }

  var filtroBtns = document.querySelectorAll('.filtro-btn');
  var productosAll = document.querySelectorAll('.producto');
  var productosPorPagina = 20;
  var paginaActual = 1;
  var productosFiltrados = Array.from(productosAll);

  if (filtroBtns.length > 0) {
    filtroBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var categoria = this.getAttribute('data-filtro');

        filtroBtns.forEach(function (b) { b.classList.remove('activo'); });
        this.classList.add('activo');

        productosFiltrados = [];
        productosAll.forEach(function (producto) {
          var catProducto = producto.getAttribute('data-categoria');
          if (categoria === 'todos' || catProducto === categoria) {
            productosFiltrados.push(producto);
          }
        });

        paginaActual = 1;
        renderPagina();

  var btnGrid = document.getElementById('btnVistaGrid');
  var btnList = document.getElementById('btnVistaList');
  var grillaEl = document.getElementById('grillaProductos');

  if (btnGrid && btnList && grillaEl) {
    btnGrid.addEventListener('click', function () {
      btnGrid.classList.add('activo');
      btnList.classList.remove('activo');
      grillaEl.classList.remove('vista-lista');
    });
    btnList.addEventListener('click', function () {
      btnList.classList.add('activo');
      btnGrid.classList.remove('activo');
      grillaEl.classList.add('vista-lista');
    });
  }

      });
    });
  }

  var busquedaInput = document.getElementById('busquedaProductos');
  if (busquedaInput) {
    var navBusqueda = busquedaInput.closest('.nav-busqueda');
    if (navBusqueda && !navBusqueda.querySelector('.busqueda-limpiar')) {
      var btnLimpiar = document.createElement('button');
      btnLimpiar.className = 'busqueda-limpiar';
      btnLimpiar.type = 'button';
      btnLimpiar.innerHTML = '&times;';
      btnLimpiar.style.display = 'none';
      navBusqueda.appendChild(btnLimpiar);

      btnLimpiar.addEventListener('click', function () {
        busquedaInput.value = '';
        btnLimpiar.style.display = 'none';
        busquedaInput.dispatchEvent(new Event('input'));
        busquedaInput.focus();
      });
    }

    busquedaInput.addEventListener('input', function () {
      var termino = this.value.toLowerCase().trim();
      var btnLimpiar = navBusqueda ? navBusqueda.querySelector('.busqueda-limpiar') : null;
      if (btnLimpiar) btnLimpiar.style.display = termino.length > 0 ? 'block' : 'none';

      filtroBtns.forEach(function (b) { b.classList.remove('activo'); });
      var btnTodos = document.querySelector('.filtro-btn[data-filtro="todos"]');
      if (btnTodos) btnTodos.classList.add('activo');

      productosFiltrados = [];
      productosAll.forEach(function (producto) {
        var nombre = producto.querySelector('h6') ? producto.querySelector('h6').textContent.toLowerCase() : '';
        var categoria = producto.getAttribute('data-categoria') || '';
        if (termino === '' || nombre.indexOf(termino) !== -1 || categoria.indexOf(termino) !== -1) {
          productosFiltrados.push(producto);
        }
      });

      paginaActual = 1;
      renderPagina();
    });
  }

  function renderPagina() {
    var total = productosFiltrados.length;
    var totalPaginas = Math.ceil(total / productosPorPagina);
    var inicio = (paginaActual - 1) * productosPorPagina;
    var fin = inicio + productosPorPagina;

    productosAll.forEach(function (p) {
      p.style.display = 'none';
      p.classList.remove('reveal');
      p.style.opacity = '1';
    });

    var visibles = 0;
    productosFiltrados.forEach(function (p, i) {
      if (i >= inicio && i < fin) {
        p.style.display = 'block';
        p.style.opacity = '1';
        p.style.transform = 'none';
        visibles++;
      }
    });

    var sinResultados = document.getElementById('sinResultados');
    if (sinResultados) {
      sinResultados.style.display = (visibles === 0) ? 'block' : 'none';
    }

    if (paginaActual > 1) {
      var grid = document.querySelector('.productos-wrapper') || document.querySelector('.filtros-wrapper') || document.getElementById('busquedaProductos');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    renderBotones(totalPaginas, total);
  }

  function renderBotones(totalPaginas, total) {
    var container = document.getElementById('paginacion');
    if (!container) return;

    container.innerHTML = '';

    if (totalPaginas <= 1) {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'flex';

    var btnPrev = document.createElement('button');
    btnPrev.innerHTML = '&#9664;';
    btnPrev.disabled = paginaActual === 1;
    btnPrev.addEventListener('click', function () {
      if (paginaActual > 1) { paginaActual--; renderPagina(); }
    });
    container.appendChild(btnPrev);

    var startPage = Math.max(1, paginaActual - 2);
    var endPage = Math.min(totalPaginas, paginaActual + 2);

    if (startPage > 1) {
      var btnFirst = document.createElement('button');
      btnFirst.textContent = '1';
      btnFirst.addEventListener('click', function () { paginaActual = 1; renderPagina(); });
      container.appendChild(btnFirst);
      if (startPage > 2) {
        var dots = document.createElement('button');
        dots.textContent = '...';
        dots.disabled = true;
        dots.style.border = 'none';
        dots.style.background = 'transparent';
        dots.style.color = 'var(--text-gray)';
        container.appendChild(dots);
      }
    }

    for (var i = startPage; i <= endPage; i++) {
      var btn = document.createElement('button');
      btn.textContent = i;
      if (i === paginaActual) btn.classList.add('activo');
      (function(page) {
        btn.addEventListener('click', function () { paginaActual = page; renderPagina(); });
      })(i);
      container.appendChild(btn);
    }

    if (endPage < totalPaginas) {
      if (endPage < totalPaginas - 1) {
        var dots2 = document.createElement('button');
        dots2.textContent = '...';
        dots2.disabled = true;
        dots2.style.border = 'none';
        dots2.style.background = 'transparent';
        dots2.style.color = 'var(--text-gray)';
        container.appendChild(dots2);
      }
      var btnLast = document.createElement('button');
      btnLast.textContent = totalPaginas;
      btnLast.addEventListener('click', function () { paginaActual = totalPaginas; renderPagina(); });
      container.appendChild(btnLast);
    }

    var btnNext = document.createElement('button');
    btnNext.innerHTML = '&#9654;';
    btnNext.disabled = paginaActual === totalPaginas;
    btnNext.addEventListener('click', function () {
      if (paginaActual < totalPaginas) { paginaActual++; renderPagina(); }
    });
    container.appendChild(btnNext);

    var info = document.getElementById('paginacionInfo');
    if (info) {
      var inicio = (paginaActual - 1) * productosPorPagina + 1;
      var fin = Math.min(paginaActual * productosPorPagina, total);
      info.textContent = 'Mostrando ' + inicio + '-' + fin + ' de ' + total + ' productos';
    }
  }

  renderPagina();

});
