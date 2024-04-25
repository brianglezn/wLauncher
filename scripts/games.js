document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los botones con la clase 'homeBtn'.
    const homeButtons = document.querySelectorAll('.homeBtn');
    // Arreglo para almacenar las imágenes del carrusel actual.
    let currentImages = [];
    // Índice para llevar la cuenta de la imagen actualmente visible en el modal.
    let currentIndex = 0;

    // Añade un evento de clic a cada botón de inicio.
    homeButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            // Realiza una petición fetch para obtener los datos de 'data.json'.
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const gameKey = `Game${index + 1}`; // Construye la clave para acceder a los datos del juego.
                    currentImages = data[gameKey].carrusel; // Guarda el carrusel de imágenes del juego actual.
                    updateGameSection(data[gameKey]); // Actualiza la sección del juego con los datos obtenidos.
                })
                .catch(error => console.error('Error fetching data: ', error));
        });
    });

    // Función para actualizar la sección del juego con los datos proporcionados.
    function updateGameSection(gameData) {
        const gameSection = document.getElementById('gameSection'); // Selecciona la sección del juego.
        const title = gameSection.querySelector('h2'); // Encuentra el elemento h2 para el título.
        const description = gameSection.querySelector('.txt'); // Encuentra el elemento para la descripción.
        const carrusel = gameSection.querySelector('.carrusel'); // Encuentra el contenedor del carrusel.

        title.textContent = gameData.title; // Establece el título del juego.
        description.innerHTML = gameData.description; // Establece la descripción del juego.
        carrusel.innerHTML = ''; // Limpia el carrusel de imágenes anteriores.

        // Añade cada imagen del carrusel al DOM.
        gameData.carrusel.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = '';
            img.dataset.index = index; // Guarda el índice de la imagen para referencia futura.
            carrusel.appendChild(img); // Añade la imagen al carrusel.
        });
    }

    // Selecciona los elementos necesarios para el modal.
    const modal = document.getElementById('modal');
    const modalImage = document.querySelector('.modal-carrusel img');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');

    // Función para abrir el modal.
    function openModal(event) {
        event.stopPropagation(); // Detiene la propagación del evento para evitar que se dispare el evento de clic en window.
        currentIndex = parseInt(event.target.dataset.index); // Obtiene el índice de la imagen clickeada.
        modalImage.src = currentImages[currentIndex]; // Establece la fuente de la imagen del modal.
        modal.style.display = 'flex'; // Muestra el modal.
    }

    // Función para cerrar el modal.
    function closeModal(event) {
        event.stopPropagation(); // Detiene la propagación del evento.
        modal.style.display = 'none'; // Oculta el modal.
    }

    // Funciones para mostrar la siguiente y la imagen anterior.
    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length; // Incrementa el índice de manera cíclica.
        modalImage.src = currentImages[currentIndex]; // Actualiza la imagen.
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; // Decrementa el índice de manera cíclica.
        modalImage.src = currentImages[currentIndex]; // Actualiza la imagen.
    }

    // Añade manejadores de eventos a los componentes interactivos.
    document.querySelector('.carrusel').addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            openModal(event); // Abre el modal al hacer clic en una imagen.
        }
    });

    rightArrow.addEventListener('click', showNextImage); // Evento para navegar a la siguiente imagen.
    leftArrow.addEventListener('click', showPreviousImage); // Evento para navegar a la imagen anterior.

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal(event); // Cierra el modal si se hace clic fuera de la imagen.
        }
    });
});
