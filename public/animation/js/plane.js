const canvas = document.getElementById('fighter_plane');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load plane images
const orangePlaneImg = new Image();
orangePlaneImg.src = '/tm360/animation/images/plan.png'; // Replace with actual path
const whitePlaneImg = new Image();
whitePlaneImg.src = '/tm360/animation/images/plan.png'; // Replace with actual path
const greenPlaneImg = new Image();
greenPlaneImg.src = '/tm360/animation/images/plan.png'; // Replace with actual path

// Load Ashoka Chakra image as HTML img element
const chakraImg = new Image();
chakraImg.src = '/tm360/animation/images/ashoka-chakra.png'; // Replace with actual path
chakraImg.className = 'chakra-class'; // Add your class name here
chakraImg.onload = () => {
    document.getElementById('chakraContainer').appendChild(chakraImg);
};

// Function to play audio with volume and speed adjustments
function playAudio(audioSrc, volume, playbackRate) {
    const audio = new Audio(audioSrc);
    audio.volume = volume; // Set volume (0 to 1)
    audio.playbackRate = playbackRate; // Set playback speed (1 is normal speed)
    audio.play();
}

// Plane start positions and destinations
const startPos = {
    x: 0,
    y: 0
};

const destinations = {
    orange: {
        x: canvas.width,
        y: canvas.height / 1.5
    },
    white: {
        x: canvas.width,
        y: canvas.height
    },
    green: {
        x: canvas.width / 1.4,
        y: canvas.height
    }
};

// Plane current positions
let currentPos = {
    orange: { ...startPos },
    white: { ...startPos },
    green: { ...startPos }
};

// Speeds for each plane and speed increments
const speeds = {
    orange: 3,
    white: 3,
    green: 3
};

const speedIncrements = {
    orange: 0.8,
    white: 0.8,
    green: 0.8
};

// Maximum speed for each plane
const maxSpeeds = {
    orange: 7,
    white: 7,
    green: 6
};

// Smoke particles for each plane
const particles = {
    orange: [],
    white: [],
    green: []
};


// Function to add smoke particles
function addSmoke(plane, color, x, y) {
    for (let i = 0; i < 5; i++) {
        particles[plane].push(new SmokeParticle(x, y, color));
    }
}

// Function to update and draw smoke particles
function animateSmoke() {
    for (let plane in particles) {
        for (let i = 0; i < particles[plane].length; i++) {
            particles[plane][i].update();
            particles[plane][i].draw();

            // Remove the particle if it's fully faded
            if (particles[plane][i].alpha <= 0) {
                particles[plane].splice(i, 2);
                i--;
            }
        }
    }
}

// Helper function to convert color names to RGB
function convertColorToRGB(colorName) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = tempCanvas.height = 1;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = colorName;
    tempCtx.fillRect(0, 0, 1, 1);
    const pixel = tempCtx.getImageData(0, 0, 1, 1).data;
    return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0.8)`;
}

// Smoke particle constructor
function SmokeParticle(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = color;
    this.alpha = 2; // Set initial opacity to 0.5
    this.velocity = {
        x: (Math.random() - 0.2) * 1,
        y: (Math.random() - 0.2) * 1
    };
}

SmokeParticle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
};

SmokeParticle.prototype.update = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
};

// Function to draw plane image
function drawPlaneImage(image, pos) {
    ctx.drawImage(image, pos.x, pos.y, image.width / 5, image.height / 5);
}


// Function to update plane position and speed
function updatePosition(plane) {
    const angle = Math.atan2(destinations[plane].y - startPos.y, destinations[plane].x - startPos.x);
    currentPos[plane].x += speeds[plane] * Math.cos(angle);
    currentPos[plane].y += speeds[plane] * Math.sin(angle);

    // Play audio at the start of animation with 3% volume and 2x speed
    if (
        Math.abs(currentPos[plane].x - startPos.x) < speeds[plane] &&
        Math.abs(currentPos[plane].y - startPos.y) < speeds[plane]
    ) {
        playAudio('/tm360/animation/images/super_sonic_boom.mp3', 0.02, 2); // Adjust volume and speed accordingly
    }

    // Increase the speed of the plane over time, but don't exceed the max speed
    if (speeds[plane] < maxSpeeds[plane]) {
        speeds[plane] += speedIncrements[plane];
    }

    if (Math.abs(currentPos[plane].x - startPos.x) >= Math.abs(destinations[plane].x - startPos.x)) {
        currentPos[plane].x = startPos.x;
        currentPos[plane].y = startPos.y;
    }
}

// Function to animate the entire scene
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update positions
    updatePosition('orange');
    updatePosition('white');
    updatePosition('green');

    // Add smoke
    addSmoke('orange', convertColorToRGB('#f15b25'), currentPos.orange.x, currentPos.orange.y);
    addSmoke('white', convertColorToRGB('#FAF9F6'), currentPos.white.x, currentPos.white.y);
    addSmoke('green', convertColorToRGB('#006934'), currentPos.green.x, currentPos.green.y);

    // Animate smoke
    animateSmoke();

    // Draw plane images
    drawPlaneImage(orangePlaneImg, currentPos.green); // Swap green and orange images
    drawPlaneImage(whitePlaneImg, currentPos.white);
    drawPlaneImage(greenPlaneImg, currentPos.orange); // Swap green and orange images

    requestAnimationFrame(animate);
}

// Event listeners to handle image loading
let loadedImages = 0;

// Funtions Images Load
function imageLoaded() {
    loadedImages++;
    if (loadedImages === 3) {
        animate(); // Start the animation only when all images have been loaded
    }
}

// Images Load
orangePlaneImg.onload = imageLoaded;
whitePlaneImg.onload = imageLoaded;
greenPlaneImg.onload = imageLoaded;