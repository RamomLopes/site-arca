
const btnPlay = document.querySelector('#btn-play');
const btnPause = document.querySelector('#btn-pause');
const video = document.querySelector('#video');
const videoSource = document.querySelector('#video-source');
const cards = document.querySelectorAll('.card');

const currentImage = document.getElementById('current-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

const timerVideo = document.querySelector('.timer-video');
const btnVideoForward = document.getElementById('btn-forward');
const btnVideoBackward = document.getElementById('btn-backward');

function showButtonPlay(){
    btnPlay.hidden = false;
    btnPause.hidden = true;
}

function showButtonPause(){
    btnPlay.hidden = true;
    btnPause.hidden = false;
}

btnVideoBackward.addEventListener('click', () => {
    video.currentTime -= 5;
});

btnVideoForward.addEventListener('click', () => {
    video.currentTime += 5;
});

btnPlay.addEventListener('click', () => {
    video.play();
    showButtonPause();
});

btnPause.addEventListener('click', () => {
    video.pause();
    showButtonPlay();
});

video.addEventListener('playing', () => {
    showButtonPause();
});

video.addEventListener('pause', () => {
    showButtonPlay();
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

function setVideoTimer(currentTime, fullTime){
    if (currentTime || fullTime){
        timerVideo.textContent = `${formatTime(currentTime)} / ${formatTime(fullTime)}`;
    } else{
        timerVideo.textContent = '00:00 / 00:00';
    } 
    
}

setInterval(() => {
    setVideoTimer(video.currentTime, video.duration);
}, 1000);

function changeVideo(number){

    switch (+number){
        case 1:
            videoSource.src = '/assets/video.mp4';
            video.load();
            showButtonPlay();
            break;
        case 2:
            videoSource.src = '/assets/video2.mp4';
            video.load();
            showButtonPlay();
            break;
        case 3:
            videoSource.src = '/assets/video3.mp4';
            video.load();
            showButtonPlay();
            break;
    }
}

cards.forEach((card) => {
    const paragraph = card.querySelector('.paragraph-card');
    const button = card.querySelector('.btn-card');
    
    console.log(card.id);

    if(card.id == 'card-1'){
        paragraph.hidden = false;
        button.hidden = false;
    }else{
        if (paragraph && button) {
            paragraph.hidden = true;
            button.hidden = true;
        }
    }
});

// Depois: configurar o clique
cards.forEach((card) => {
    card.children[0].addEventListener('click', () => {
        const paragraph = card.querySelector('.paragraph-card');
        const button = card.querySelector('.btn-card');

        // Se o card clicado já está aberto (parágrafo visível)
        const isOpened = !paragraph.hidden;

        // Primeiro: fecha todos
        cards.forEach((otherCard) => {
            const otherParagraph = otherCard.querySelector('.paragraph-card');
            const otherButton = otherCard.querySelector('.btn-card');
            
            if (otherParagraph && otherButton) {
                otherParagraph.hidden = true;
                otherButton.hidden = true;
            }
        });

        // Se não estava aberto, então abre o clicado
        if (!isOpened) {
            paragraph.hidden = false;
            button.hidden = false;
        }
        // Senão, se já estava aberto, deixamos tudo fechado (não faz nada)
    });

    // click no botao
    card.children[2].addEventListener('click', () => {

        let videoNumber = card.children[2].id;
        const number = videoNumber.slice(9);
        console.log(number);

        changeVideo(number);
        
    });
});

/**
 * 
 * @param {string[]} images 
 * @param {Element} carousel 
 */
function factoryImageController(images, carousel) {
    const extension = "jpg";
    const folder = "assets";

    /**
     * @param {number} newIndex
     */
    const getCurrentIndex = (newIndex) => {
        const length = imageController.images.length;

        return ((newIndex % length) + length) % length;
    }
    
    const next = () => {
        const newIndex = imageController.currentIndex + 1;

        imageController.currentIndex = getCurrentIndex(newIndex);
        imageController.carouselRef.src = `${folder}/${images[imageController.currentIndex]}.${extension}`;
    }

    const prev = () => {
        const newIndex = imageController.currentIndex - 1;

        imageController.currentIndex = getCurrentIndex(newIndex);
        imageController.carouselRef.src = `${folder}/${images[imageController.currentIndex]}.${extension}`;
    }

    const imageController = {
        currentIndex: 1,
        images: images,
        carouselRef: carousel,
        
        next: next,
        prev: prev
    }

    return imageController;
}

const images = ['dog-1', 'dog-2', 'dog-3', 'dog-4' ];

const imageController = factoryImageController(images, currentImage);

nextButton.addEventListener('click', imageController.next);

prevButton.addEventListener('click', imageController.prev);