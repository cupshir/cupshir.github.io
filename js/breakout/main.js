// setup canvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// create global variables
var currentScore;
var currentLives;
var currentLevel;
var paddleWidth;
var paddleX;
var currentPaddleMoveUnit;
var rightPressed;
var leftPressed;
var brickRowCount;
var brickColumnCount;
var brickWidth;
var brickHeight;
var brickPadding;
var brickOffsetTop;
var brickOffsetLeft;
var currentBricks;
var brickCount;

// setup game state
resetGame();

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks(currentBricks, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickPadding, brickOffsetLeft, brickOffsetTop);
    drawBall(ballX, ballY);
    drawPaddle(paddleX, canvas.height, paddleWidth, PADDLE_HEIGHT);
    drawScore(currentScore);
    drawLives(currentLives);

    collisionDetection();

    if (brickCount === 0 && currentScore > 0) {
        currentLevel++;

        if (currentLevel > 3) {
            alert('You win, GG!');
    
            // STOPPED HERE
            // hide canvas and display winner content
            
            return;
        }

        alert('Level cleared!');

        // change brick layout
        // L1 : row 2, column 3, padding = 15, offsetTop = 50, offsetLeft = 115
        // L2 : row 2, column 5, padding = 10, offsetTop = 50, offsetLeft = 30
        // L3 : row 3, column 5, padding = 10, offsetTop = 30, offsetLeft = 30
        if (currentLevel > 1) {
            brickColumnCount = 5;
            brickPadding = 10;
            brickOffsetLeft = 30;
        }

        if (currentLevel > 2) {
            brickRowCount = 3;
            brickOffsetTop = 30;
        }

        // reset bricks with changes
        buildBricks();

        // reset ball location, speed, and paddle location
        resetLevel();
    }

    if (!currentLives) {
        alert('Game Over');

        resetGame();

        document.location.reload();
        return;
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += currentPaddleMoveUnit;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= currentPaddleMoveUnit;
    }

    ballX += moveUnitX;
    ballY += moveUnitY;

    requestAnimationFrame(draw);
}

draw();



