/*
// New Years Countdown
var countDownDate = new Date("Jan 31, 2024 00:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days + ' Days';
    document.getElementById("hrs").innerHTML = hours + ' Hours';
    document.getElementById("mins").innerHTML = minutes + ' Minutes';
    document.getElementById("secs").innerHTML = seconds + ' Seconds';
}, 1000); //

// snowflake
function createSnow() {
    const snow = document.createElement("div");
    snow.innerHTML = "<img id='snowflake' src='https://static.vecteezy.com/system/resources/previews/001/194/635/non_2x/snowflake-png.png'>";
    snow.classList.add("snow");
    document.body.appendChild(snow);
    snow.style.left = Math.random() * 100 + "vw";
    snow.style.animationDuration = Math.random() * 1 + 1 + "s";
    setTimeout(() => {
        snow.remove();
    }, 200);
}
setInterval(createSnow, 200); */




// snow 
document.addEventListener('DOMContentLoaded', function () {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function () {
        particlesJS("snow", {
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "opacity": {
                    "value": 0.8,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "bottom",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 300,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": false
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": false
                }
            },
            "retina_detect": true
        });
    }
    document.head.append(script);
});