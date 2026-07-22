# JR Minimarket - Sitio Web Estático e Interactivo

Este proyecto consiste en el diseño e implementación de un sitio web estático, interactivo, accesible y adaptable (responsive) para el negocio **JR Servicios Generales**, un minimarket ubicado en el sector Los Sauces, Chiclayo, Perú. El sitio ha sido desarrollado como parte del trabajo académico del curso **Fundamentos de Tecnologías Web**.

---

## 👥 Integrantes del Grupo 01
*   **Cordova Huayama, Jairo**
*   **Chumacero Heredia, Alex Junior**
*   **Diaz Zegarra, Jesús Alberto**
*   **Manayay Salcedo, Fernando David**
*   **Vega Huaman, Alexis Estefano**

---

## 🚀 Características del Proyecto
*   **Diseño Adaptable (Responsive):** Estructura fluida mediante CSS Grid y Flexbox que se adapta perfectamente a computadoras, tabletas y celulares (optimizando la usabilidad en pantallas móviles pequeñas de hasta 480px con botones grandes táctiles).
*   **Interactividad Dinámica:**
    *   **Catálogo de Productos:** Sistema de filtros interactivos por categoría (Abarrotes, Bebidas, Limpieza) con transiciones animadas de desvanecimiento suave (`fadeIn`), desarrollado en **jQuery**.
    *   **Gráfico Estadístico:** Gráfico dinámico de barras para la distribución referencial de productos, programado desde cero con la API **HTML5 Canvas 2D**.
    *   **Formulario de Contacto:** Lógica de validación en tiempo real con expresiones regulares en **JavaScript Nativo** para celular (9 dígitos que inicien con 9) y correo electrónico.
*   **Accesibilidad Web (Criterios WCAG):**
    *   Enlace oculto de salto rápido (`skip-link`) para navegación rápida por teclado.
    *   Foco visible destacado en color ámbar (`:focus-visible`) para todos los elementos interactivos.
    *   Uso de marcado semántico HTML5 y atributos ARIA (etiquetas explicativas para lectores de pantalla en imágenes y Canvas).
*   **Gráficos Vectoriales SVG:** Íconos del menú y tarjetas implementados en formato vectorial nativo inline para evitar pixelado y optimizar el rendimiento.
*   **Funcionamiento 100% Offline:** Todas las hojas de estilos y scripts, incluyendo la librería jQuery, se encuentran almacenados localmente dentro de la estructura del proyecto para garantizar su correcto funcionamiento sin internet.

---

## 📂 Estructura de Archivos
*   `index.html`: Página principal con el lema comercial y categorías destacadas.
*   `nosotros.html`: Historia del negocio, Misión, Visión, Valores y gráfico estadístico de productos en Canvas.
*   `productos.html`: Catálogo interactivo de abarrotes, bebidas y limpieza con filtros de categorías.
*   `contacto.html`: Datos de atención, ubicación con mapa interactivo embebido y formulario de mensajes validado.
*   `servicios.html`: Detalle de servicios (presencial, delivery, telefónico) y diagrama del flujo de servicio.
*   `css/`: Directorio con la estructura modular de estilos:
    *   `estilos.css`: Archivo index que importa el resto de módulos de estilos de forma limpia.
    *   `variables.css`, `accesibilidad.css`, `header.css`, `hero.css`, `botones.css`, `layout.css`, `productos.css`, `servicios.css`, `nosotros.css`, `contacto.css`, `pie.css`, `responsive.css`.
*   `js/`: Carpeta con la lógica de comportamiento del sitio:
    *   `script.js`: Validaciones, lógica del Canvas y filtros de productos.
    *   `jquery.js`: Librería local jQuery en formato de desarrollo legible.
