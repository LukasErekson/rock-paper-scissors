"using strict";

const NUM_GAMES_TO_WIN= 5;

// Create the game options array.
const GAME_OPTIONS = ["rock", "paper", "scissors"];

/**
 * Sample randomly from an Array object.
 * @param {Array} arr The array to get a random sample from.
 * @returns {any}     A randomly-chosen element from the array.
 */
function sample(arr) {
  return arr[Math.random() * arr.length | 0];
}

/**
 * Simple logic for a rock, paper, scissors game.
 * @param {String} x  The first option: either rock, paper, or scissors.
 * @param {String} y  The second option: either rock, paper, or scissors.
 * @returns {String}  Result of the match.
 * @returns {Boolean} Whether x beat y.
 */
function xBeatsy(x, y) {
  let rockWins = ['rock beats scissors'];
  let paperWins = ['paper beats rock'];
  let scissorsWins = ['scissors beat paper'];
  let tie = `tie, both players chose ${x}`;

  // Have our final result be returned in the result object.
  let result = {outcome: '',
                playerWins: false};

  if (x === 'rock') {
    // Both rock
    if (y === 'rock') {
      result.outcome = tie;
      result.playerWins = false;
    }
    // rock loses to paper
    else if (y === 'paper') {
      result.outcome = paperWins;
      result.playerWins = false;
    }
    // rock beats scissors
    else {
      result.outcome = rockWins;
      result.playerWins = true;
    }
  }

  else if (x === 'paper') {
    // paper beats rock
    if (y === 'rock') {
      result.outcome = paperWins;
      result.playerWins = true;
    }
    // Both paper
    else if (y === 'paper') {
      result.outcome = tie;
      result.playerWins = false;
    }
    // paper loses to scissors
    else {
      result.outcome = scissorsWins;
      result.playerWins = false;
    }
  }

  else {
    // scissors loses to rock
    if (y === 'rock') {
      result.outcome = rockWins;
      result.playerWins = false;
    }
    // scissors beats paper
    else if (y === 'paper') {
      result.outcome = scissorsWins;
      result.playerWins = true;
    }
    // Both scissors
    else {
      result.outcome = tie;
      result.playerWins = false;
    }
  }

  return result;
}

/**
 * Assigns the playerOption variable after a selection event
 * @param {Event} event 
 */
function chooseOption(event) {
  let pathArray = event.composedPath();
  let optionID = pathArray[0].getAttribute('id');
  optionID = optionID.slice(0, optionID.indexOf('-'));
  return optionID;
}

/**
 * Play a round of Rock, paper, scissors
 * @returns {String} Whether or not the player won the game or tied.
 */
function playRound(event) {
  let computerChoice = sample(GAME_OPTIONS);
  showComputerChoice(computerChoice);

  let playerChoice = chooseOption(event);
  console.log(playerChoice);

  let result = xBeatsy(playerChoice, computerChoice);

  let resultText = document.getElementById('result-text');

  // If it's a tie, redo the round from the beginning.
  if (result.outcome.includes('tie')) {
    resultText.innerText = `It was a tie; you both chose ${playerChoice}!`;
    showScore(result);
    return;
  }

  resultText.innerText = `You ${result.playerWins ? 'win' : 'lose'}! ${result.outcome[0][0].toUpperCase()}${result.outcome[0].slice(1)}!`;
  // Increment score using Boolean conversion
  playerScore += Number(result.playerWins);
  computerScore += Number(!result.playerWins);
  showScore(result);

  return result;

}

function showComputerChoice(computerChoice) {
  let computerChoiceImg = document.getElementById("computer-choice-icon");
  let computerChoiceText = document.getElementById("computer-choice-text");
  computerChoiceText.innerText = computerChoice[0].toUpperCase() + computerChoice.slice(1);
  computerChoiceImg.setAttribute('alt', computerChoice);
  
  // Set up the smooth animation in of the computer choice
  // This lets the user know that a new game has been played
  // even when the computer chooses the same option.
  let computerChoiceWrapper = document.getElementById('computer-choice-wrapper');
  computerChoiceWrapper.classList.add('animate-in');
  setTimeout(() => {computerChoiceWrapper.classList.remove('animate-in');}, 250);

  let imgSrc = "";
  switch (computerChoice) {
    case "rock":
      imgSrc = 'images/alpine-landscape-rock-rubble-01g-al1.svg';
      break;
    case "paper":
      imgSrc = 'images/Anonymous_Paper_1_icon.svg';
      break;
    case "scissors":
      imgSrc = 'images/Scissor Stencil.svg';
      break;
  }
  computerChoiceImg.setAttribute('src', imgSrc);
}

let playerScore = 0;
let computerScore = 0;

/**
 * Display the current score of the game.
 * @param {Object} result Object containing the results of the game.
 */
function showScore(result) {
  const playerScoreNum = document.getElementById("player-score-num");
  const computerScoreNum = document.getElementById("computer-score-num");
  playerScoreNum.innerText = playerScore;
  computerScoreNum.innerText = computerScore;

  if (result.playerWins) {
    playerScoreNum.classList.add('animate-update');
    setTimeout(() => {playerScoreNum.classList.remove('animate-update');}, 500);
  }
  else {
    computerScoreNum.classList.add('animate-update');
    if (result.outcome.includes('tie')) {
      playerScoreNum.classList.add('animate-update');
      setTimeout(() => {playerScoreNum.classList.remove('animate-update');}, 500);
    }
    setTimeout(() => {computerScoreNum.classList.remove('animate-update');}, 500);
  }

  if (gameOver()) {
    let resultText = document.getElementById('result-text');
    resultText.innerText += "\nSelect rock, paper, or scissors to begin a new game!";
    playerOptions.addEventListener('click', newGame);
  }

}

/**
 * Checks to see if the game is over 
 * (one player has NUM_GAMES_TO_WIN points).
 * @returns {Boolean} Whether or not the game is over.
 */
function gameOver() {
  let playerWon = playerScore === NUM_GAMES_TO_WIN;
  let computerWon = computerScore === NUM_GAMES_TO_WIN;
  if (playerWon || computerWon) {
    playerOptions.removeEventListener('click', playRound);
    let resultText = document.getElementById('result-text');
    
    if (playerWon) {
      resultText.innerText = "Congratulations! You win the game!";
    }
    else {
      resultText.innerText = "The computer wins! Better luck next time!";
    }

    return true;
  }
  return false;
}

/**
 * Start a new game by setting the scores to 0 and 
 * reseting event listeners.
 * @param {Event} event The event listener from which to
 *                      extract the player's choice.
 */
function newGame(event) {
  playerScore = 0;
  computerScore = 0;
  playerOptions.addEventListener('click', playRound);
  playerOptions.removeEventListener('click', newGame);
  playRound(event);
}

let playerOptions = document.getElementById("player-options");
playerOptions.addEventListener('click', playRound);
