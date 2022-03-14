let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let scoreDisplay = document.getElementById('scoreNumber');

// creat image
let bg = new Image();
let birdImage = new Image();
let upTube = new Image();
let downTube = new Image();
bg.src = "./images/bg.png";
birdImage.src = "./images/bird.png";
upTube.src = "./images/upTube.png";
downTube.src = "./images/downTube.png";

// variables
let score = 0;
let distanceMidleTubes = 140;
let distance;

// object bird
let bird = {
    x: 250,
    y: 90
}

let tube = [];
document.addEventListener('click', (event) => {
    console.log(event);
})

let up = [];
let down = [];
up[0] = {
    x: canvas.width,
    y: -40
};

down[0] = {
    x: canvas.width,
    y: upTube.height + 100
};

// run game
function runGame() {
    // load img
    context.drawImage(bg, 0, 0);
    context.drawImage(birdImage, bird.x, bird.y);
    
    for (let i = 0; i < up.length && i < down.length; i++) {
        context.drawImage(upTube, up[i].x, up[i].y);
        context.drawImage(downTube, down[i].x, down[i].y);
        up[i].x -= 5;
        down[i].x -= 5;
        // creat tube
        var random = Math.floor(Math.random() * (upTube.height + 40)) - upTube.height;
        if (up[i].x == 500) {
            up.push({
                x: canvas.width,
                y: random
            });
            down.push({
                x: canvas.width,
                y: random + upTube.height + 140
            });
        }
        if (up[i].x < 0) {
            up.splice(0,1);
            down.splice(0,1);
        }

        // score increase
        if (up[i].x === 270) {
            score ++;
        }
        scoreDisplay.textContent = score;
        if (score > 0) {
            scoreDisplay.style.color = 'green';
        }

        // game over
        if (bird.y > 480 || (up[i].x === bird.x && bird.y <= up[i].y + upTube.height + 5) || 
        (down[i].x === bird.x && bird.y >= up[i].y + upTube.height + 130)) {
            let over = document.getElementById('over');
            over.style.color = 'red';
            over.innerHTML = 'Game Over! key F5 to play again';
            return;
        }
    }

    bird.y += 4;
    requestAnimationFrame(runGame);
}

document.addEventListener('click', function () {
    bird.y -= 80;
})

// start
runGame();
