/* ====================================================
   JR DISTRIBUCIONES - UNIFIED RELIABLE SCRIPT (js/main.js)
   ==================================================== */

function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    try { fn(); } catch (e) { console.error(e); }
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      try { fn(); } catch (e) { console.error(e); }
    });
  }
}


/* --- loader.js --- */

/* ==================================================== LOADER - Fast Page Loader ==================================================== */

(function () {
  function ocultarLoader() {
    var loader = document.querySelector('.page-loader');
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(ocultarLoader, 200);
  } else {
    onReady(function () {
      setTimeout(ocultarLoader, 200);
    });
  }

  window.addEventListener('load', function () {
    ocultarLoader();
  });

  // Safety fallback
  setTimeout(ocultarLoader, 1000);
})();


/* --- navbar.js --- */

/* ==================================================== NAVBAR - Scroll Effect + Mobile Close ==================================================== */

onReady(function () {

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

});


/* --- forms.js --- */

/* ==================================================== FORMS - Contact Form Validation ==================================================== */

onReady(function () {

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


/* --- products.js --- */

/* ==================================================== PRODUCTS - Dynamic Filter + Search + Pagination ==================================================== */

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

  // Grid / List View Toggle Handler
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


/* --- counters.js --- */

/* ==================================================== COUNTERS - Animated Counters ==================================================== */

onReady(function () {

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

});


/* --- canvas.js --- */

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


/* --- scroll.js --- */

/* ==================================================== SCROLL - Scroll Reveal + Back to Top ==================================================== */

onReady(function () {

  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  revealElements.forEach(function (el) {
    el.classList.add('visible');
  });

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '50px 0px 50px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  var btnVolverArriba = document.getElementById('btnVolverArriba');
  if (btnVolverArriba) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btnVolverArriba.classList.add('visible');
      } else {
        btnVolverArriba.classList.remove('visible');
      }
    });
    btnVolverArriba.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});


/* --- effects.js --- */

/* ==================================================== EFFECTS - Newsletter + Parallax + Tooltips + Liquidacion Modal ==================================================== */

onReady(function () {

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

  var heroBg = document.querySelector('.hero-section .hero-bg');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    });
  }

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

  // --- Persistence for Barra Anuncio ---
  var barraAnuncio = document.getElementById('barraAnuncio');
  var btnCerrarAnuncio = document.getElementById('barraAnuncioCerrar');
  if (barraAnuncio) {
    if (sessionStorage.getItem('barra_anuncio_cerrada') === '1') {
      barraAnuncio.style.display = 'none';
    }
    if (btnCerrarAnuncio) {
      btnCerrarAnuncio.addEventListener('click', function () {
        sessionStorage.setItem('barra_anuncio_cerrada', '1');
      });
    }
  }

  var modalLiquidacion = document.getElementById('modalLiquidacion');
  if (modalLiquidacion) {
    var liquidacionCerrada = sessionStorage.getItem('liquidacion_cerrada');
    if (!liquidacionCerrada && typeof bootstrap !== 'undefined') {
      setTimeout(function () {
        var bsModal = bootstrap.Modal.getOrCreateInstance(modalLiquidacion);
        bsModal.show();
      }, 3000);
    }
    modalLiquidacion.addEventListener('hidden.bs.modal', function () {
      sessionStorage.setItem('liquidacion_cerrada', '1');
    });
  }

});


/* --- cart.js --- */

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


