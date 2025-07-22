## Proyecto: Around The U.S. 

Este es el paso número 7 de mi travesía en TripleTen.
El objetivo principal fue crear una página interactiva inspirada en la red social "Around The U.S.", aplicando conceptos de HTML, CSS y JavaScript.


Descripción

- Permite editar el perfil de usuario (nombre y ocupación) mediante un modal.
- Los usuarios pueden dar "like" a las imágenes de la galería.
- Diseño responsive: se adapta a dispositivos móviles, tablets y escritorio.
- Efectos visuales con hover en botones y corazones.
- Uso de fuentes personalizadas y estilos modernos.

Tecnologías utilizadas

- HTML5
- CSS3 (BEM, Flexbox, Grid, Media Queries)
- JavaScript (DOM, eventos, manipulación de clases y atributos)

Cosas que aprendí y retos

- Cómo estructurar un proyecto web desde cero.
- La importancia de los breakpoints y el diseño mobile first.
- Manejar modales y overlays con JavaScript y CSS.
- Controlar el desbordamiento de texto y el uso de elipsis.
- Mejorar la accesibilidad y la experiencia de usuario.


Cosas por mejorar

- Validación más robusta de los formularios.
- Mejor manejo de errores y feedback visual.
- Refactorizar el JS para hacerlo más escalable.
- Agregar animaciones más suaves y microinteracciones.


## Actualización Fase 8 - Tarjetas Dinámicas

A partir de la entrega del sprint número 8, resulta una implementación diferente de las tarjetas en la galería, ahora se generan dinámicamente desde JavaScript. También puedes agregar nuevas tarjetas usando el botón "+" en la parte superior derecha.

¿Cómo interactuar con la página?

- Haz clic en el botón de agregar imágenes (el ícono "+").
- Escribe el título que desees para tu nueva tarjeta.
- Para la imagen, puedes usar una de las siguientes rutas (copia y pega la que prefieras):

    - ./images/paisaje7morelia.jpg
    - ./images/paisaje8ixtapa.jpg
    - ./images/paisaje9favela.jpg

- Da clic en "Aceptar" y verás tu nueva tarjeta agregada al inicio de la galería.
- Puedes repetir el proceso para agregar tantas tarjetas como quieras, usando cualquier título y cualquiera de las imágenes mencionadas arriba.

Así puedes probar fácilmente la nueva funcionalidad y ver lo bien que responde el código al agregar tarjetas extra.

También puedes eliminar cualquier tarjeta de la galería usando el ícono de "trash bin" que aparece en la esquina superior derecha de cada tarjeta. Solo dale click y la tarjeta desaparece al instante (al menos mientras no recargues la página). Además, el ícono cambia cuando pasas el mouse encima para que se vea más interactivo. Todo sigue funcionando igual de fluido y responsivo desde mi perspectiva, así que puedes seguir agregando, viendo y eliminando tarjetas sin problema.

---

-> **Nota:** Puedes repetir el proceso para agregar tantas tarjetas como quieras, usando cualquier título y cualquiera de las imágenes mencionadas arriba o alguna URL que aloje una imagen. También cabe señalar que el popup de la imagen se adapta a el tamaño de la misma, claro, bajo los principios del diseño pero también para imagenes pequeñas para eficientar el tamaño del archivo raiz.

## Actualización fase 9 - Refactorización y validación modular

En la novena etapa del proyecto, me enfoqué en mejorar la validación de los formularios y en separar la lógica de validación en un archivo independiente. Esto permitió que el código fuera más organizado y fácil de mantener, evitando duplicidad y facilitando futuras mejoras. La validación ahora es más robusta y universal, aprovechando las capacidades de ValidityState y los atributos HTML5. Además, la estructura modular sentó las bases para una integración más limpia de nuevas funcionalidades, haciendo que el desarrollo sea mucho más ágil y comprensible. Esta fase fue clave para dar el salto hacia una arquitectura más profesional y escalable, cumpliendo con los estándares de TripleTen y preparándome para retos más avanzados.


## Actualizacion fase 10 - Refactorización final y modularización avanzada

En esta etapa, el proyecto fue reorganizado completamente en módulos basados en ES6 para mejorar la escalabilidad y el mantenimiento. Se implementaron las clases Card y FormValidator, cada una en su propio archivo. La lógica de control de modales y utilidades se trasladó a utils.js, mientras que index.js integra y coordina todos los módulos. La validación de formularios ahora es universal y reutilizable, y la generación de tarjetas es flexible y orientada a objetos. El código es más limpio, estructurado y fácil de extender, cumpliendo con lo que considero, las mejores prácticas de JS moderno.


## Actualización fase 11 - Resolución de conflictos y mejoras en la estructura modular

En esta undécima etapa, el enfoque principal fue la consolidación de la estructura modular del proyecto. Se revisaron y limpiaron los archivos, asegurando que la lógica de las clases y módulos estuviera unificada. Además, se mejoró la organización del código, reforzando la separación de responsabilidades entre los componentes, especialmente en la gestión de popups y formularios. Esta fase permitió optimizar la mantenibilidad y claridad del proyecto, facilitando futuras colaboraciones y ampliaciones.



Este proyecto y los que vienen han sido parte de mi aprendizaje, así que cualquier feedback es bienvenido. ¡Gracias por visitar mi trabajo!



>   https://tiggreee.github.io/web_project_around/



(Todo el timepo ha sido en honor a Renata; ¡Te amo mi mama linda!)