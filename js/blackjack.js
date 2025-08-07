let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0}
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('/blackjack_assets/sounds/swish.m4a');

document.querySelector('#hit-button').addEventListener('click', blackjackHit);

function blackjackHit() {
    let cardImage = document.createElement('img');
    cardImage.src = '/blackjack_assets/images/Q.png';
    document.querySelector(YOU['div']).appendChild(cardImage);
    hitSound.play();
}
