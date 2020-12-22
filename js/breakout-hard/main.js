// setup canvas
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var gameRequest;

// create global variables
var currentScore;
var currentLives;
var currentLevel;
var failedLevel;
var pointModifier;
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

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

$(document).ready(function() {
    $('.start-game').on('click', function() {
        $('.game-over').hide();
        $('.intro').hide();
        $('.game-board').show();

        // setup game state
        resetGame();

        drawSartingBoard();

        setTimeout(function() {
            play();
        }, 300);
    });

    $('.next-level').on('click', function() {
        $(this).hide();

        setTimeout(function() {
            gameRequest = requestAnimationFrame(play);
        }, 300);
    });

    $('.try-again').on('click', function() {
        $(this).hide();

        setTimeout(function() {
            gameRequest = requestAnimationFrame(play);
        }, 300);
    });
});

function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks(currentBricks, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickPadding, brickOffsetLeft, brickOffsetTop);
    drawBall(ballX, ballY);
    drawPaddle(paddleX, canvas.height, paddleWidth, PADDLE_HEIGHT);
    drawScore(currentScore);
    drawLives(currentLives, canvas.width);

    collisionDetection();

    if (failedLevel) {
        cancelAnimationFrame(gameRequest);

        levelFailed();
        
        return;
    }

    // check for level cleared or game won
    if (brickCount === 0) {
        cancelAnimationFrame(gameRequest);

        // check if the person won
        if (currentLevel === 3) {
            setTimeout(function() {
                $('.game-board').hide();
                $('.winner').show();    
            }, 300);
        }
        else {
            levelCleared();
        }

        return;
    }

    // check for game over
    if (!currentLives) {
        setTimeout(function() {
            $('.game-board').hide();
            $('.game-over').show();
        }, 300);

        return;
    }

    // paddle movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += currentPaddleMoveUnit;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= currentPaddleMoveUnit;
    }

    // ball movement
    ballX += moveUnitX;
    ballY += moveUnitY;

    gameRequest = requestAnimationFrame(play);
}

function levelCleared() {
    // increase level and point modifier
    currentLevel++;
    pointModifier = pointModifier * 10;

    // TODO DISPLAY LEVEL CLEARED
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawScore(currentScore);
    drawLives(currentLives, canvas.width);
    drawLevelCleared(canvas.width, canvas.height);
        
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

    // show next level button
    $('.next-level').show();
}

function levelFailed() {
    failedLevel = false;

    cancelAnimationFrame(gameRequest);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentScore = currentScore - 50;
    
    drawScore(currentScore);
    drawLives(currentLives, canvas.width);
    drawLevelFailed(canvas.width, canvas.height);

    resetLevel();

    $('.try-again').show();
}

