Lampa.Platform.tv();
function log() {
        console.log.apply(console.log, arguments);
      }
log('Skip Opening', 'Plugin loaded for skipping openings');

function seekForward(seconds) {
    const video = Lampa.Player.video();
    if (video) {
        const newTime = video.currentTime + seconds;
        video.currentTime = newTime > video.duration ? video.duration : newTime; // Не перематывать дальше конца
        log('Skip Opening', `Skipped forward by ${seconds} seconds`);
    } else {
        log('Skip Opening', 'Video not found');
    }
}

function listenDestroy() {
	document.removeEventListener("keydown", listenHotkeys);
	Lampa.Player.listener.remove('destroy', listenDestroy);	
}

function startHotkeys() {
	document.addEventListener("keydown", listenHotkeys);
	Lampa.Player.listener.follow('destroy', listenDestroy);
}

function listenHotkeys(e) {
    //log('Hotkeys', e.keyCode);

    // Кнопка 8 для перемотки на 1 минуту 25 секунд (85 секунд)
    if (e.keyCode === 56 || e.keyCode === 104 || e.keyCode === 9) {
        log('Skip Opening', '8 pressed');
        seekForward(85);  // Перематываем на 85 секунд
    }
}

Lampa.Player.listener.follow('ready', startHotkeys);
