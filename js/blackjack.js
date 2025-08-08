let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
         '7': 7, '8': 8, '9': 9, '10': 10,'K': 10, 'J': 10, 'Q': 10, 'A':[0,1]}
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('/blackjack_assets/sounds/swish.m4a');

document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    let card = randomCard();
    showCard(YOU, card);
    updateScore(card, YOU);

}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    let randomCard = blackjackGame['cards'][randomIndex];
    return  randomCard 
}
function showCard(activePlayer, cardToShow) {
    let cardImage = document.createElement('img');
    cardImage.src = `/blackjack_assets/images/${cardToShow}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i= 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }

    
    for (i= 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }
}  

function updateScore(card, activePlayer) {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    console.log(activePlayer['score']);
}