const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let matchedSets = 0;
let firstCard, secondCard;

(function setupGameBoard() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

$(document).ready(function() {
    $('.btn-play').on('click', function() {
        $('.intro').hide();
        //$('.fake-game').show();
        $('.winner').show();
    });

    $('.fake-game img').on('click', function() {
        $('.fake-game img').hide();
        $('.fake-game-content').show();

        var timeLeft = 10;
        var countdown = setInterval(function() {
            if (timeLeft === 0) {
                clearInterval(countdown);

                $('.fake-game').hide();
                $('.game').show();
                return;
            }

            timeLeft -= 1;
            $('#countDown').text(timeLeft);
        }, 1000)        
    })
});

