//VARIABLES//
var word = ["braaains", "shamble", "undead", "apocalypse", "graveyard", "feast", "decay"];
var win = 0;
var randWord;
var guesses = "";
var turnsRemaining;
var noPressKey = false;

//FUNCTIONS//
function beginGame(){
  noPressKey = false;
  document.getElementById("endScreen").style.display = "none";
  guesses = "";
  turnsRemaining = 8;
  randWord = word[Math.floor(Math.random() * word.length)].toLowerCase();
  refreshDisplay();
}

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
document.onkeyup = function(event) {
  if (noPressKey === true) {
    return;
  }

  var userGuess = event.key.toLowerCase();
  if(userGuess.length === 1){
    document.getElementById("letterGuessed").innerHTML = "You guessed " + userGuess;
    if (guesses.includes(userGuess) === false){
      guesses += userGuess;
    }
    else{
      return;
    }

    if (randWord.includes(userGuess) === false){
      turnsRemaining--;
    }

    //YOU LOSE
    refreshDisplay();
    if (turnsRemaining === 0) {
      endGame(false);
    }
  }
  else{
    alert("Please press a single letter.");
  }
}


beginGame();

