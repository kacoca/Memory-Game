// varibles list
const iconsArray = ["fas fa-birthday-cake",
            "fas fa-birthday-cake",
            "fas fa-kiwi-bird",
            "fas fa-kiwi-bird",
            "fas fa-quidditch",
            "fas fa-quidditch",
            "fas fa-heart",
            "fas fa-heart",
            "fas fa-puzzle-piece",
            "fas fa-puzzle-piece",
            "fas fa-couch",
            "fas fa-couch",
            "fas fa-rocket",
            "fas fa-rocket",
            "fas fa-moon",
            "fas fa-moon"];
// cards
const cardsContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];
// timer start
let firstClick = true;
// moves
const movesContainer =  document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
// rating
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
// timer
const timerContainer = document.querySelector(".timer");
let seconds = 0;
let minutes = 0;
timerContainer.innerHTML = minutes + ":" + seconds;
// restart
const restartButton = document.querySelector(".restart");
// game over pop up
const modal = document.querySelector(".modal");
const finalMoves = document.querySelector(".finalMoves");
const finalStars = document.querySelector(".finalStars");
const finalMinutes = document.querySelector(".finalMinutes");
const finalSeconds = document.querySelector(".finalSeconds");

// create card and start the game
function begin() {
  const icons = shuffle(iconsArray);
  for(let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card", "animated");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);
  // add click event to each card
  click(card);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// a card is clicked
function click(card) {
  card.addEventListener("click", function() {
    //starts timer when first card is clicked
    if(firstClick) {
      startTimer();
    firstClick = false; }
    const currentCard = this;
    const previousCard = openedCards[0];
    // a card has been opened
    if(openedCards.length === 1) {
      card.classList.add("open", "show", "disable", "pulse");
      openedCards.push(this);
      // comparing two opened cards
      compare(currentCard, previousCard);
    } else {
      // no cards are open
      currentCard.classList.add("open", "show", "disable", "pulse");
      openedCards.push(this);
    }
  });
}

// function to compare cards
function compare(currentCard, previousCard){
  if(currentCard.innerHTML === previousCard.innerHTML) {
     // matched cards
    currentCard.classList.add("match", "fadeOut");
    previousCard.classList.add("match", "fadeOut");
    matchedCards.push(currentCard, previousCard);
    openedCards =  [];
    // check if all the cards are matched
    gameOver();
  } else {
    // show both opened cards
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
    }, 600);
    openedCards = [];
  }
  // add moves
  addMove();
}

// function to check if the game is over
function gameOver() {
  if(matchedCards.length === iconsArray.length) {
    stopTimer();
    gameWon();
  }
}

// game won popup
function gameWon() {
  modal.style.display = 'block';
  //moves increased by one to fix error in modal where incorrect number of moves is shown
  finalMoves.innerHTML = moves + 1;
  finalStars.innerHTML = starsContainer.innerHTML;
  finalMinutes.innerHTML = minutes;
  finalSeconds.innerHTML = seconds;
}

// play again button
playAgain = document.querySelector(".playAgain");

playAgain.addEventListener("click", function() {
  // delete all cards
  cardsContainer.innerHTML = "";
  // call begin to create new cards
  begin();
  // reset variables
  empty();
  // remove popup
  modal.style.display = "none";
  // start timer
  startTimer();
});

//add moves
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  // set rating
  rating();
}

// rating system
// ratings decreased by one move to account for error in popup modal where incorrect number of stars is shown on last possible move
function rating() {
  if(moves < 14) {
    starsContainer.innerHTML = star + star + star;
  } else if (moves < 16) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  }
}

// timer
 function startTimer() {
    initialTimer = setInterval(function() {
        seconds++;
        if(seconds === 60){
          minutes++;
          seconds = 0;
        }
        timerContainer.innerHTML = minutes + ":" + seconds;
    }, 1000);
}
function stopTimer() {
  clearInterval(initialTimer);
}

//restart game
restartButton.addEventListener("click", function() {
  // delete all cards
  cardsContainer.innerHTML = "";
  // call begin to create new cards
  begin();
  // reset variables
  empty();
});

// function to reset variables
function empty(){
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = star + star + star;
  seconds = 0;
  minutes = 0;
  timerContainer.innerHTML = minutes + ":" + seconds;
}

//begin game
begin();
