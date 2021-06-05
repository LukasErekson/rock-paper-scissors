"using strict";

/**
 * Sample randomly from an Array object.
 * @param {Array} arr The array to get a random sample from.
 * @returns {any}     A randomly-chosen element from the array.
 */
function sample(arr) {
  return arr[Math.random() * arr.length | 0];
}

// Create the game options array.
let gameOptions = ["rock", "paper", "scissors"];

/**
 * Simple logic for a rock, paper, scissors game.
 * @param {String} x            The first option.
 * @param {String} y            The second option.
 * @returns {String}            Result of the match.
 * @returns {Boolean}           Whether x beat y.
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
 * Play a round of Rock, paper, scissors
 * @returns {String} Whether or not the player won the game or tied.
 */
function playRound() {
  let computerChoice = sample(gameOptions);
  let playerChoice = prompt("What would you like to do?").toLowerCase();

  // Only allow one of the game options.
  while (!(gameOptions.includes(playerChoice))) {
    playerChoice = prompt("Please choose either rock, paper, or scissors.").toLowerCase();
  }
  let result = xBeatsy(playerChoice, computerChoice);

  // If it's a tie, redo the round from the beginning.
  if (result.outcome.includes('tie')) {
    console.log('It was a tie! Play again.');
    return playRound();
  }

  return result;

}

let playerScore = 0;
let computerScore = 0;

/**
 * Display the current score of the game.
 */
function showScore() {
  console.log(`Player Score: ${playerScore}`);
  console.log(`Computer Score: ${computerScore}`);
}

/**
 * Plays rounds of Rock, Paper, Scissors with a human player
 * against a computer (random) player.
 * @param {Number} numTimes The number of times to play the game. Must be an integer.
 * @returns {Number[]}      The final scores for the human player and the computer.
 */
function playGame(numTimes) {

  for (let i = 0; i < numTimes; i++) {
    roundResult = playRound();
    let message = `You ${roundResult.playerWins ? 'win' : 'lose'}! ${roundResult.outcome[0][0].toUpperCase()}${roundResult.outcome[0].slice(1)}!`;
    console.log(message);

    // Increment score using Boolean conversion
    playerScore += Number(roundResult.playerWins);
    computerScore += Number(!roundResult.playerWins);
    showScore();
    
  }

  if (playerScore > computerScore) {
    console.log("Congratulations! You win!");
  }

  else if (playerScore < computerScore) {
    console.log("The Computer wins! Better luck next time.");
  }

  else {
    console.log("It was a draw!");
  }

}