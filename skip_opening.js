// Инициализация платформы для работы с TV-контроллерами
Lampa.Platform.tv();

// Лог для отслеживания действий плагина в консоли
function log() {
    console.log.apply(console.log, arguments);
}
log('Skip Opening Plugin', 'Loaded');

// Функция перемотки на 1:25
function skipOpening() {
    // Получаем текущий плеер
    let player = Lampa.Player;

    if (player && player.video) {
        let videoElement = player.video;

        // Проверяем, что видео длится больше 1:25, иначе перематывать нет смысла
        if (videoElement.duration > 85) {
            videoElement.currentTime = 85; // Перематываем на 85 секунд
            log('Skip Opening Plugin', 'Skipped to 1:25');
        }
    }
}

// Функция удаления обработчика событий
function listenDestroy() {
    document.removeEventListener("keydown", listenHotkeys);
    Lampa.Player.listener.remove('destroy', listenDestroy);	
}

// Функция начала отслеживания нажатий кнопок
function startHotkeys() {
    document.addEventListener("keydown", listenHotkeys);
    Lampa.Player.listener.follow('destroy', listenDestroy);
}

// Обработчик нажатий кнопок
function listenHotkeys(e) {
    // Проверяем, нажата ли кнопка "8"
    if (e.keyCode === 56 || e.keyCode === 104 || e.keyCode === 9) {
        log('Skip Opening Plugin', '8 pressed, skipping opening');
        skipOpening();  // Вызов функции перемотки
    }
}

// Запуск обработчика горячих клавиш при готовности плеера
Lampa.Player.listener.follow('ready', startHotkeys);
