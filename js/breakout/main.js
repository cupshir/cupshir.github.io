// setup canvas
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var gameRequest;

// create global variables
var gameState;
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    if (gameState != 'OVER') {
        drawBricks(currentBricks, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickPadding, brickOffsetLeft, brickOffsetTop);
        drawBall(ballX, ballY);    
    }

    drawPaddle(paddleX, canvas.height, paddleWidth, PADDLE_HEIGHT);
    drawScore(currentScore);
    drawLives(currentLives, canvas.width);

    switch (gameState) {
        case 'PLAY':
            collisionDetection();
            break;
        case 'FAILED':
            setTimeout(function() {
                cancelAnimationFrame(gameRequest);
                levelFailed();                
            }, 1500);
            return;
        case 'CLEARED':
            setTimeout(function() {
                cancelAnimationFrame(gameRequest);
                levelCleared();    
            }, 1500);
            return;
        case 'WON':
            setTimeout(function() {
                $('.game-board').hide();
                $('.winner').show();    
            }, 1500);
            return;
        case 'OVER':
            cancelAnimationFrame(gameRequest);
            gameOver();
            setTimeout(function() {
                $('.game-board').hide();
                $('.game-over').show();
            }, 1500);
            return;
        default:
            break;
    }

    // check for level cleared or game won
    if (brickCount === 0) {
        if (currentLevel === 3) {
            gameState = 'WON';
        }
        else {
            gameState = 'CLEARED';
        }
    }

    // check if level failed
    if (failedLevel) {
        gameState = 'FAILED';
    }

    // check for game over
    if (!currentLives && currentScore >= 1500) {
        gameState = 'WON';
    }
    else if (!currentLives) {
        gameState = 'OVER';
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

    gameState = 'PLAY';

    // show next level button
    $('.next-level').show();
}

function levelFailed() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentScore = currentScore - 50;
    
    drawScore(currentScore);
    drawLives(currentLives, canvas.width);
    drawLevelFailed(canvas.width, canvas.height);

    resetLevel();

    failedLevel = false;
    gameState = 'PLAY';

    $('.try-again').show();
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawScore(currentScore);
    drawLives(currentLives, canvas.width);
    drawGameOver(canvas.width, canvas.height);

    gameState = 'OVER';
}

