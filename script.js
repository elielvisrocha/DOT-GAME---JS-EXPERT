'use strict';

//SELECTING ELEMENTS
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// STARTING CONDITIONS
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

// ROLLING DICE FUNCIIONALITY
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. GENERATING A RANDOM DICE ROLL
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2.DISPLAY DICE
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        // 3. CHECK FOR ROLLED 1: IF TRUE
        if (dice !== 1) {
            // ADD DICE TO CURRENT SCORE
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // SWITCH TO NEXT PLAYER
            switchPlayer();
        };
    }
});




btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. ADD CURRENT SCORE TO ACTIVE PLAYERS'S SCORE
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. CHECK IF PLAYER'S SCORE IS >= 100
    // FINISH THE GAME
    if (scores[activePlayer] >= 10) {
        playing = false;
        diceEL.classList.add('hidden');
        document.querySelector(
            `.player--${activePlayer}`).classList.add('player-winner');
        document.querySelector(
            `.player--${activePlayer}`).classList.remove('player--active');
    } else {
        // 3. SWITCH TO THE NEXT PLAYER
        switchPlayer();
    }
  }
})


