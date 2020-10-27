/**************************************************************************************************
                                        RULES OF THE GAME:

    - The game has 2 players, playing in rounds
    - In each turn, a player rolls a dice as many times as they. Each result get added to his ROUND score
    - BUT, if the player rolls a 1, all their ROUND score gets lost and it starts the next player's turn
    - A player can choose to 'Hold' their score, which means that their ROUND score gets added to their GLOBAL score. A Hold ends the player's turn.
    - The first player to reach 100 points on GLOBAL score wins the game

****************************************************************************************************/
//Declare the variables used for the game
let scores, roundScore, activePlayer, gamePlaying;

//Begin each game with a clean slate
init();

//Event listener to control click on btn roll 
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        //random number needed
        let dice = Math.floor(Math.random() * 6) + 1;
        //display result of number
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //update round score only if rolled number is not 1
        if (dice !== 1){
            //add scores
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            nextPlayer();
        }
    }
});

//Event listener to control btn hold functionality
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore;
        //Update the UI to show score in global score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //Check if player won the game
        if (scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else {
            //Change to next player on hold
            nextPlayer();
        }
    }
});

//Function to switch players
function nextPlayer(){
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    //Set current score to zero
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    //Toggle active class for user
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //Hide the dice from displaying until next user clicks to roll the dice
    document.querySelector('.dice').style.display = none;
}

//When someone clicks New Game call the init function for me
document.querySelector('.btn-new').addEventListener('click', init);

//Function to reset the game and return all setting to their original 'unplayed' state
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //Set all score values to ZERO
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    //Hide the Dice until Roll is clicked
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //Remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //Remove active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //Add active class to the first player
    document.querySelector('.player-0-panel').classList.add('active');
}

