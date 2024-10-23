Lampa.Platform.tv();
function log() {
    console.log.apply(console.log, arguments);
}

log('Skip Opening Button with Custom Icon', 'Plugin loaded to add a skip opening button with a custom icon');

// Функция для перемотки на 85 секунд вперед
function skipOpening() {
    if (Lampa.Player.video) {
        let currentTime = Lampa.Player.video.time; // Получаем текущее время
        Lampa.Player.video.time = currentTime + 85; // Увеличиваем его на 85 секунд
        log('Skip Opening', 'Skipped forward 85 seconds');
    }
}

// Функция для создания кнопки и добавления её в интерфейс плеера
function addSkipButton() {
    // Проверяем, существует ли панель плеера
    let playerControls = document.querySelector('.player-panel');
    
    if (playerControls) {
        // Создаем новую кнопку
        let skipButton = document.createElement('div');
        skipButton.classList.add('player-panel__button', 'button', 'selector');
        
        // Вставляем твою SVG-иконку
        skipButton.innerHTML = `
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455 455" style="enable-background:new 0 0 455 455;" xml:space="preserve">
                <path d="M227.5,0C101.855,0,0,101.855,0,227.5S101.855,455,227.5,455S455,353.145,455,227.5S353.145,0,227.5,0z M356.798,330h-55 v-78.981L179.64,321.575v-47.038l-81.438,47.038V133.425l81.438,47.038v-47.038l122.157,70.557V125h55V330z"/>
            </svg>
        `;

        // Привязываем функцию перемотки к событию нажатия на кнопку
        skipButton.addEventListener('click', skipOpening);

        // Добавляем кнопку в панель управления плеером
        playerControls.appendChild(skipButton);

        log('Skip Opening', 'Skip button with custom icon added to player controls');
    }
}

// Слушатель для добавления кнопки, когда плеер готов
Lampa.Player.listener.follow('ready', addSkipButton);
