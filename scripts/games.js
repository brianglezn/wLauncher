document.addEventListener('DOMContentLoaded', function () {
    const homeButtons = document.querySelectorAll('.homeBtn');

    homeButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const gameKey = `Game${index + 1}`;
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

        gameData.carrusel.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = '';
            carrusel.appendChild(img);
        });
    }
});
