document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos por id
    var homeIcon = document.getElementById('homeIcon');
    var homeSection = document.getElementById('homeSection');
    var gameSection = document.getElementById('gameSection');

    // Función para alternar la visibilidad de las secciones
    function toggleSections() {
        if (homeSection.style.display === 'none') {
            homeSection.style.display = 'grid';
            gameSection.style.display = 'none';
        }
    }

    // Evento de clic para el ícono de casa
    homeIcon.addEventListener('click', toggleSections);

    // Seleccionar todos los botones de la sección .home
    var homeButtons = document.querySelectorAll('.homeBtn img');

    // Añadir evento de clic a cada botón para cambiar a la sección .game
    homeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            homeSection.style.display = 'none';
            gameSection.style.display = 'flex';
        });
    });
});