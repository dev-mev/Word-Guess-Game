//VARIABLES//
var word = ["braaains", "shamble", "undead", "apocalypse", "graveyard", "feast", "decay", "ghastly", "corpses", "ghouls"];
var win = 0;
var randWord;
var guesses = "";
var turnsRemaining;
var noPressKey = false;

//FUNCTIONS//
//allows key presses, hides end of game message, resets game fields and chooses random word
function beginGame(){
  noPressKey = false;
  document.getElementById("endScreen").style.display = "none";
  guesses = "";
  turnsRemaining = 8;
  randWord = word[Math.floor(Math.random() * word.length)].toLowerCase();
  refreshDisplay();
}

//locks keys, displays end of game message
function endGame(win){
  noPressKey = true;
  document.getElementById("endScreen").style.display = "block";
  if(win === true){
    document.getElementById("txtEndMessage").innerHTML = "YOU WIN! YOU ATE THE ZOMBIES!";
  }
  else{
    document.getElementById("txtEndMessage").innerHTML = "YOU LOSE! YOU WERE EATEN BY ZOMBIES!";
  }
}

//writes out dashes and letters, detects win
function writeWord(){
  var letterOrDash = "";
  var allLettersGuessed = true;

  for(var i=0; i<randWord.length; i++){
    if(guesses.includes(randWord.charAt(i))){
      letterOrDash += randWord.charAt(i) + " ";
    }
    else{
      letterOrDash += "_   ";
      allLettersGuessed = false;
    }

    document.getElementById("writeWord").innerHTML = letterOrDash;
    }

  if (allLettersGuessed === true){
    win++;
    endGame(true);

  }
}

function refreshDisplay() {
  writeWord();
  document.getElementById("incrementWins").innerHTML = win;
  document.getElementById("remaining").innerHTML = turnsRemaining;
  document.getElementById("guesses").innerHTML = guesses.toUpperCase();
}

//EVENTS//
//stores user's guess
document.onkeyup = function(event) {
  //if keys are locked, exit function
  if (noPressKey === true) {
    return;
  }

  var userGuess = event.key.toLowerCase();

  //valid guesses are a single character
  if(userGuess.length === 1){
    document.getElementById("letterGuessed").innerHTML = "You guessed " + userGuess;

    if (guesses.includes(userGuess) === false){
      guesses += userGuess;
    }
    else{
      return;
    }

    //decreases turns remaining when user's guess is not in the current word
    if (randWord.includes(userGuess) === false){
      turnsRemaining--;
    }

    //detects no more turns (game loss)
    refreshDisplay();
    if (turnsRemaining === 0) {
      endGame(false);
    }
  }
  else{
    //player pressed shift, ctrl, etc.
    alert("Please press a single letter.");
  }
}


beginGame();

