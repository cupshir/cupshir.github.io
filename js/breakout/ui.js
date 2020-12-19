function drawScore(score) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives(lives, canvasWidth) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Lives: ' + lives, canvasWidth - 65, 20);
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x, canvasHeight, paddleWidth, paddleHeight) {
    ctx.beginPath();
    ctx.rect(x, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBricks(bricks, columnCount, rowCount, width, height, widthPadding, heightPadding, offsetLeft, offsetTop) {
    for (var c = 0; c < columnCount; c++) {
        for (var r = 0; r < rowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (width + widthPadding)) + offsetLeft;
                let brickY = (r * (height + heightPadding)) + offsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, width, height);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();    
            }
        }        
    }
}

