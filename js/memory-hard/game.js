function buildCard(cardId, cardType, cardImageName, cardImageText) {
    let newCard = `<div id="${cardId}" class="memory-card" data-card-type="${cardType}">
        <img class="front-face" src="../img/memory/${cardImageName}" alt="${cardImageText}">
        <img class="back-face" src="../img/memory/snowman.svg" alt="Memory Card">    
    </div>`;

    return newCard;
}

function flipCard(card) {
    if (lockBoard) return;
    if (card.attr('id') === firstCardId) return;

    card.addClass('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCardId = card.attr('id');
        firstCardDataValue = card.data('card-type');
        return;
    }

    secondCardId = card.attr('id');
    secondCardDataValue = card.data('card-type');

    checkForMatch();
}

function checkForMatch() {
    lockBoard = true;

    let isMatch = firstCardDataValue === secondCardDataValue;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchedSets++;

    $('#' + firstCardId).off();
    $('#' + secondCardId).off();

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        $('#' + firstCardId).removeClass('flip');
        $('#' + secondCardId).removeClass('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCardId, secondCardId] = [null, null];
    [firstCardDataValue, secondCardDataValue] = [null, null];

    if (matchedSets === cards.length) {
        setTimeout(() => {
            $('.game').hide();
            $('.winner').show();
        }, 1500);

    }
}