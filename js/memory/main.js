let cards = [];
let firstCardId, secondCardId, firstCardDataValue, secondCardDataValue;

let numCards = 6;
let addedCards = 0;
let hasFlippedCard = false;
let lockBoard = false;
let matchedSets = 0;

(function () {
    while (numCards > addedCards || addedCards === 50) {
        let randomCard = AVAILABLE_CARDS[Math.floor(Math.random() * AVAILABLE_CARDS.length)];

        if (cards.indexOf(randomCard) === -1) {
            cards.push(randomCard);

            addedCards++;
        } 
    }
})();

$(document).ready(function() {
    cards.forEach(card => {
        let uiCard1 = buildCard(card.Type + '1', card.Type, card.ImageName, card.ImageText);
        let uiCard2 = buildCard(card.Type + '2', card.Type, card.ImageName, card.ImageText);

        $('.cards').append(uiCard1);
        $('.cards').append(uiCard2);
    });

    $('.memory-card').each(function(i, card) {
        let randomPos = Math.floor(Math.random() * $('.memory-card').length);
        card.style.order = randomPos;
    });

    $('.memory-card').on('click', function() {
        flipCard($(this));
    });

    $('.start-game').on('click', function() {
        $('.intro').hide();
        $('.fake-game').show();
    });

    $('.fake-game img').on('click', function() {
        $('.fake-game img').hide();
        $('.fake-game-content').show();

        var timeLeft = 5;
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
    });


});

