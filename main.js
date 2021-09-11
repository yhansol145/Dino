var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


var img2 = new Image();
img2.src = 'joonam.png';

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y);
    }
}

var img1 = new Image();
img1.src = 'cactus.png';

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}

var timer = 0;
var cactusMore = [];
var jumpTimer = 0;
var animation;

function frameProcess() {
    animation = requestAnimationFrame(frameProcess)
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 200 === 0) {
        var cactus = new Cactus();
        cactusMore.push(cactus);
    }

    cactusMore.forEach((a, i, o) => {
        // x좌표가 0 미만이면 제거
        if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x -= 2;

        accident(dino, a);

        a.draw();
    });

    if (jumping == true) {
        dino.y -= 2;
        jumpTimer += 2;
    }
    if (jumping == false) {
        if (dino.y < 200) {
            dino.y += 2;
        }
    }
    if (jumpTimer > 100) {
        jumping = false;
        jumpTimer = 0;
    }

    dino.draw();
}

frameProcess();

// 충돌확인

function accident(dino, cactus) {
    var xdif = cactus.x - (dino.x + dino.width);
    var ydif = cactus.y - (dino.y + dino.height);
    if (xdif < 0 && ydif < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        alert("Game Over!!");
    }
}







var jumping = false;
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jumping = true;
    }
})