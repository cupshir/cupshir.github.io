let cards = [];
let firstCardId, secondCardId, firstCardDataValue, secondCardDataValue;

let numCards = 18;
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
    cards.forEach((card, index) => {
        let cardId1 = card.Type + (index + 1);
        let cardId2 = card.Type + (index + 1) * 100;
        let uiCard1 = buildCard(cardId1, card.Type, card.ImageName, card.ImageText);
        let uiCard2 = buildCard(cardId2, card.Type, card.ImageName, card.ImageText);

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
        $('.game').show();
    });
});

