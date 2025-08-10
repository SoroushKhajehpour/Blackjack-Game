let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-score', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-score', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
         '7': 7, '8': 8, '9': 9, '10': 10,'K': 10, 'J': 10, 'Q': 10, 'A':[11,1]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('blackjack_assets/sounds/swish.m4a');
const winSound = new Audio('blackjack_assets/sounds/cash.mp3');
const lossSound = new Audio('blackjack_assets/sounds/aww.mp3');

document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#stand-button').addEventListener('click', dealerLogic);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        if (YOU.score > 21) {
            blackjackGame.turnsOver = true;
            showResult(DEALER);
        } else if (YOU.score === 21) {
            blackjackGame.turnsOver = true;
            showResult(YOU);
        }
    } 
    
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    let randomCard = blackjackGame['cards'][randomIndex];
    return randomCard 
}

function showCard(cardToShow, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `blackjack_assets/images/${cardToShow}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }  
}

function blackjackDeal() {

    if (blackjackGame.turnsOver === true) {

        blackjackGame.stand = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        blackjackGame.turnsOver = false;
        blackjackGame.isStand = false;

        for (i= 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        
        for (i= 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = '0';
        document.querySelector(YOU['scoreSpan']).style.color = 'white';

        document.querySelector(DEALER['scoreSpan']).textContent = '0';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        const result = document.querySelector('#blackjack-result');
        result.textContent = 'Let\'s Play';
        result.style.color = 'white';
        blackjackGame.turnsOver = false;
    }


}  

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + 11 <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }

}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerLogic() {
    while (blackjackGame['turnsOver'] != true) {
        blackjackGame['isStand'] = true;
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);

        if (DEALER['score'] > 15) {
            blackjackGame['turnsOver'] = true;
            
            let winner = computeWinner();
            showResult(winner);

        }

        await delay(1000);
    }   
}


function computeWinner() {
    let winner;
    // when you have a higher score than the dealer or when dealer busts but you're under 21
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score'])  {
        }
    // when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
    
    // when y]ou and the dealer both bust
    } else if (YOU['score'] > 21 && DEALER['score'] >= 21) {
    }

    if (winner === YOU) {
        blackjackGame['wins'] += 1;
    } else if (winner === DEALER) {
        blackjackGame['losses'] += 1;
    } else {
        blackjackGame['draws'] += 1
    }

    return winner;
    
}

function showResult(winner) {
    let message, messageColor;
    
    if (blackjackGame.turnsOver === true) {
        if (winner === YOU) {
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            message = 'You drew!';
            messageColor = 'white';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;

        document.querySelector('.win').textContent = blackjackGame['wins'];
        document.querySelector('.loss').textContent = blackjackGame['losses'];
        document.querySelector('.draw').textContent = blackjackGame['draws'];
    }

}