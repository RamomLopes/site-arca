
const btnPlay = document.querySelector('#btn-play');
const btnPause = document.querySelector('#btn-pause');
const video = document.querySelector('#video');
const videoSource = document.querySelector('#video-source');
const cards = document.querySelectorAll('.card');

const currentImage = document.getElementById('current-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

function showButtonPlay(){
    btnPlay.hidden = false;
    btnPause.hidden = true;
}

function showButtonPause(){
    btnPlay.hidden = true;
    btnPause.hidden = false;
}

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

function changeVideo(number){

    switch (+number){
        case 1:
            videoSource.src = '/assets/video.mp4';
            video.load();
            video.currentTime = 2;
            showButtonPlay();
            break;
        case 2:
            videoSource.src = '/assets/video2.mp4';
            video.load();
            video.currentTime = 2;
            showButtonPlay();
            break;
        case 3:
            videoSource.src = '/assets/video3.mp4';
            video.load();
            video.currentTime = 3;
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

const images = [ '/assets/dog-1.jpg', '/assets/dog-2.jpg', '/assets/dog-3.jpg', '/assets/dog-4.jpg' ];
let currentIndex = 0;

function updateImage() {
    currentImage.src = images[currentIndex];
}

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateImage();
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateImage();
});

updateImage();