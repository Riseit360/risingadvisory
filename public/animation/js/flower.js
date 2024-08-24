// flowerAnimation.js

const flowerCanvas = document.getElementById('flowerCanvas');
const flowerCtx = flowerCanvas.getContext('2d');

flowerCanvas.width = window.innerWidth;
flowerCanvas.height = window.innerHeight;

const config = {
    speedRange: [1, 3], // Speed range [min, max]
    numberOfFlowers: 30, // Number of flowers falling
    flowerImages: [
        '/Assets//animation/images/orange.png',
        '/Assets/animation/images/white.png',
        '/Assets/animation/images/green.png'
    ]
};

const flowers = [];

class Flower {
    constructor(x, y, width, height, speed, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = new Image();
        this.image.src = image;
    }

    draw(opacity) {
        flowerCtx.save();
        flowerCtx.globalAlpha = opacity;
        flowerCtx.drawImage(this.image, this.x, this.y, this.width, this.height);
        flowerCtx.restore();
    }

    update() {
        this.y += this.speed;
        const opacity = 1 - (this.y / flowerCanvas.height);
        this.draw(opacity);

        if (this.y > flowerCanvas.height) {
            this.y = -this.height;
            this.x = Math.random() * flowerCanvas.width;
        }
    }
}

function initFlowerAnimation() {
    for (let i = 0; i < config.numberOfFlowers; i++) {
        const width = Math.random() * 50 + 30;
        const height = width;
        const x = Math.random() * flowerCanvas.width;
        const y = Math.random() * flowerCanvas.height;
        const speed = Math.random() * (config.speedRange[1] - config.speedRange[0]) + config.speedRange[0];
        const image = config.flowerImages[Math.floor(Math.random() * config.flowerImages.length)];
        flowers.push(new Flower(x, y, width, height, speed, image));
    }
}

function animateFlowerCanvas() {
    requestAnimationFrame(animateFlowerCanvas);
    flowerCtx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
    flowers.forEach(flower => flower.update());
}

initFlowerAnimation();
animateFlowerCanvas();

// Handle window resize
window.addEventListener('resize', () => {
    flowerCanvas.width = window.innerWidth;
    flowerCanvas.height = window.innerHeight;
});