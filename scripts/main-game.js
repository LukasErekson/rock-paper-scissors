"using strict";

/**
 * Sample randomly from an Array object.
 * @param {Array} arr The array to get a random sample from.
 * @returns {any}     A randomly-chosen element from the array.
 */
function sample(arr) {
  return arr[Math.random() * arr.length | 0];
}

/**
 * Plays a total of numTimes rounds of Rock, Paper, Scissors with a human player
 * against a computer (random) player.
 * @param {Number} numTimes The number of times to play the game. Must be an integer.
 * @returns {Number[]}      The final scores for the human player and the computer.
 */
function playGame(numTimes) {
  // Create the game options array.
  let gameOptions = ["rock", "paper", "scissors"];

/**
 * Simple logic for a rock, paper, scissors game.
 * @param {String} x            The first option.
 * @param {String} y            The second option.
 * @returns {Boolean or String} Whether x beats y or they tie.
 */
  function xBeatsy(x, y) {
    if (x === 'rock') {
      // Both rock
      if (y === 'rock') {
        return 'tie';
      }
      // rock loses to paper
      else if (y === 'paper') {
        return false;
      }
      // rock beats scissors
      else {
        return true;
      }
    }

    else if (x === 'paper') {
      // paper beats rock
      if (y === 'rock') {
        return true;
      }
      // Both paper
      else if (y === 'paper') {
        return 'tie';
      }
      // paper loses to scissors
      else {
        return false;
      }
    }

    else {
      // scissors loses to rock
      if (y === 'rock') {
        return false;
      }
      // scissors beats paper
      else if (y === 'paper') {
        return true;
      }
      // Both scissors
      else {
        return 'tie';
      }
    }
  }

  /**
   * Play a round of Rock, paper, scissors
   * @returns {Boolean or String} Whether or not the player won the game or tied.
   */
  function playRound() {
    let computerChoice = sample(gameOptions);
    let playerChoice = prompt("What would you like to do?").toLowerCase();

    // Only allow one of the game options.
    while (!(gameOptions.includes(playerChoice))) {
      playerChoice = prompt("Please choose either rock, paper, or scissors.").toLowerCase();
    }
    let playerWins = xBeatsy(playerChoice, computerChoice);
    return playerWins;
  }

  let playerScore = 0;
  let computerScore = 0;

  for (let i = 0; i < numTimes; i++) {
    roundResult = playRound();
    if (roundResult !== 'tie') {
      playerScore += Number(roundResult);
      computerScore += Number(~roundResult);
    }
    // There was a tie, so more rounds need to be played for the best of numTimes.
    else {
      alert("It was a tie! Play again!");
      i -= 1;
    }
    
  }

  if (playerScore > computerScore) {
    alert("Congratulations! You win!");
  }

  else if (playerScore < computerScore) {
    alert("The Computer wins! Better luck next time.");
  }

  else {
    alert("It was a draw!");
  }

}