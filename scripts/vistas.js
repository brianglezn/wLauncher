// Espera a que todo el contenido del DOM esté completamente cargado antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el elemento del DOM necesarios
    var homeIcon = document.getElementById('homeIcon');
    var homeSection = document.getElementById('homeSection');
    var gameSection = document.getElementById('gameSection');

    // Función que alterna la visibilidad de las secciones de inicio y juegos.
    function toggleSections() {
        if (homeSection.style.display === 'none') {
            homeSection.style.display = 'grid';
            gameSection.style.display = 'none';
        }
    }

    // Asigna un manejador de eventos para cuando se haga clic en el icono de inicio.
    homeIcon.addEventListener('click', toggleSections);

    // Selecciona todos los botones dentro de la sección de inicio.
    var homeButtons = document.querySelectorAll('.homeBtn img');

    // Itera sobre cada botón dentro de la sección de inicio.
    homeButtons.forEach(function (btn) {
        // Asigna un manejador de eventos para cuando se haga clic en cada botón.
        btn.addEventListener('click', function () {
            homeSection.style.display = 'none';
            gameSection.style.display = 'flex';
        });
    });
});
