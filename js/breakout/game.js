function resetLevel() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    moveUnitX = MOVE_UNIT_X;
    moveUnitY = MOVE_UNIT_Y;
    paddleX = (canvas.width - paddleWidth) / 2;
}

function resetGame() {
    currentScore = 0;
    currentLives = STARTING_LIVES;
    currentLevel = STARTING_LEVEL;

    // setup paddle
    paddleWidth = PADDLE_WIDTH;
    paddleX = (canvas.width - paddleWidth) / 2;
    currentPaddleMoveUnit = PADDLE_MOVE_UNIT;
    rightPressed = false;
    leftPressed = false;

    // setup bricks
    brickRowCount = DEFAULT_BRICK_ROW_COUNT;
    brickColumnCount = DEFAULT_BRICK_COLUMN_COUNT;
    brickWidth = DEFAULT_BRICK_WIDTH;
    brickHeight = DEFAULT_BRICK_HEIGHT;
    brickPadding = DEFAULT_BRICK_PADDING;
    brickOffsetTop = DEFAULT_BRICK_OFFSET_TOP;
    brickOffsetLeft = DEFAULT_BRICK_OFFSET_LEFT;

    buildBricks();
    
    resetLevel();
}

function buildBricks() {
    currentBricks = [];
    brickCount = 0;

    for (var c = 0; c < brickColumnCount; c++) {
        currentBricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            currentBricks[c][r] = { x: 0, y: 0, status: 1 };
            brickCount++;    
        }
    }
}

function keyDownHandler(e) {
    if(e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    }
    else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    }
    else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var mouseX = e.clientX - canvas.offsetLeft;
    if (mouseX > 0 + (paddleWidth / 2) && mouseX < canvas.width - (paddleWidth / 2)) {
        paddleX = mouseX - paddleWidth / 2;
    }
}

function collisionDetection() {
    let nextMoveX = ballX + moveUnitX;
    let nextMoveY = ballY + moveUnitY;

    if (nextMoveX > canvas.width - BALL_RADIUS || nextMoveX < BALL_RADIUS) {
        // collision with a wall, reverse X direction
        moveUnitX = -moveUnitX;
        return;
    }    

    if (nextMoveY < BALL_RADIUS) {
        // collision with ceiling, reverse Y direction
        moveUnitY = -moveUnitY;
        return;
    }

    if (nextMoveY > canvas.height - PADDLE_HEIGHT - (BALL_RADIUS / 2) && 
        nextMoveX > paddleX - (BALL_RADIUS / 2) && 
        nextMoveX < paddleX + paddleWidth + (BALL_RADIUS / 2) ) {
        // collision with paddle
        moveUnitY = -moveUnitY;
        if (nextMoveX > paddleX + (paddleWidth / 3.5) &&
            nextMoveX < paddleX + paddleWidth - (paddleWidth / 3.5)) {
            // colloision inside of paddle, reduce X unit
            if (Math.abs(moveUnitX) === Math.abs(MOVE_UNIT_X)) {
                // add or subract 1 depending on positive or negative value
                moveUnitX = Math.sign(moveUnitX) === 1 ? moveUnitX - 1 : moveUnitX + 1;
            }
        }
        else {
            // collision outside of paddle, increase X unit
            if (Math.abs(moveUnitX) !== Math.abs(MOVE_UNIT_X)) {
                // add or subract 1 depending on positive or negative value
                moveUnitX = Math.sign(moveUnitX) === 1 ? moveUnitX + 1 : moveUnitX - 1;
            }
        }
    }

    if (nextMoveY > canvas.height - (BALL_RADIUS / 2)) {
        // collision with floor, reduce life
        currentLives--;
        if (currentLives) {
            // reset board for next try
            alert('Fail!');

            resetLevel();           
        }
        else if (currentLives === 0) {
            // game over
            return;
        }
    }

    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brick = currentBricks[c][r];
            if (brick.status == 1) {
                if (ballX + BALL_RADIUS > brick.x && 
                    ballX - BALL_RADIUS < brick.x + brickWidth && 
                    ballY + BALL_RADIUS > brick.y && 
                    ballY - BALL_RADIUS < brick.y + brickHeight) {
                    // collision with brick, reverse Y direction, disable brick, increase score
                    moveUnitY = -moveUnitY;
                    brick.status = 0;
                    brickCount--;
                    currentScore++;
                }            
            }
        }        
    }
}