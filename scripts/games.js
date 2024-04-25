document.addEventListener('DOMContentLoaded', function () {
    const homeButtons = document.querySelectorAll('.homeBtn');
    let currentImages = [];
    let currentIndex = 0;

    homeButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const gameKey = `Game${index + 1}`;
                    currentImages = data[gameKey].carrusel;
                    updateGameSection(data[gameKey]);
                })
                .catch(error => console.error('Error fetching data: ', error));
        });
    });

    function updateGameSection(gameData) {
        const gameSection = document.getElementById('gameSection');
        const title = gameSection.querySelector('h2');
        const description = gameSection.querySelector('.txt');
        const carrusel = gameSection.querySelector('.carrusel');

        title.textContent = gameData.title;
        description.innerHTML = gameData.description;
        carrusel.innerHTML = '';

        gameData.carrusel.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = '';
            img.dataset.index = index;
            carrusel.appendChild(img);
        });
    }

    const modal = document.getElementById('modal');
    const modalImage = document.querySelector('.modal-carrusel img');
    const closeButton = document.querySelector('.close-btn');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');

    function openModal(event) {
        event.stopPropagation();
        currentIndex = parseInt(event.target.dataset.index);
        modalImage.src = currentImages[currentIndex];
        modal.style.display = 'flex';
    }

    function closeModal(event) {
        event.stopPropagation();
        modal.style.display = 'none';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        modalImage.src = currentImages[currentIndex];
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        modalImage.src = currentImages[currentIndex];
    }

    document.querySelector('.carrusel').addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            openModal(event);
        }
    });

    closeButton.addEventListener('click', closeModal, true);
    rightArrow.addEventListener('click', showNextImage);
    leftArrow.addEventListener('click', showPreviousImage);

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal(event);
        }
    });
});
