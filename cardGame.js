// Create div for cards

createCards();
function createCards() {
  let cardContainer = document.getElementById("cardContainer");
  for (let i = 0; i < 16; i++) {
    let card = document.createElement("div");
    let cardFront = document.createElement("div");
    let cardBack = document.createElement("img");
    cardContainer.appendChild(card);
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    card.classList = "card";
    cardFront.classList = "cardFront";
    cardBack.classList = "cardBack";
  }
}

// Randomize images
randomizeCard();
function randomizeCard() {
  let images = ["dog1", "dog2", "dog3", "dog4", "dog5", "dog6", "dog7", "dog8"];
  let imageList = images.concat(images);
  let randomziedImages = imageList.sort(() => Math.random() - 0.5);

  // Randomzied images to the HTML
  let cardsBack = document.querySelectorAll(".cardBack");
  cardsBack.forEach((each, index) =>
    each.setAttribute("src", `/images/${randomziedImages[index]}.jpg`)
  );
}

//When card is clicked, the card is flipped
let cards = document.querySelectorAll(".card");
cards.forEach((card) => card.addEventListener("click", () => filpCard(card)));

/* one round => 1+2+3
1. the first card flipped & the second card filped
2. check both are matched or not
3. if they are matched -> stay, if not -> filped again 
*/
let firstCard;
let matchCards = [];

function filpCard(currentCard) {
  if (matchCards.includes(currentCard)) return;

  currentCard.classList.add("flipped");

  // 1.
  if (firstCard === undefined) {
    firstCard = currentCard;
    return;
  }

  const isMatch =
    firstCard.childNodes[1].getAttribute("src") ===
    currentCard.childNodes[1].getAttribute("src");

  // 2.
  if (isMatch) {
    matchCards.push(firstCard);
    matchCards.push(currentCard);
    checkIfWon();
    console.log(matchCards);
  } else {
    // 3.
    flipCardAfterTimeout(firstCard);
    flipCardAfterTimeout(currentCard);
  }

  firstCard = undefined;
}

function flipCardAfterTimeout(card) {
  setTimeout(() => {
    if (matchCards.includes(card)) return;
    card.classList.remove("flipped");
  }, 1000);
}

// Check if all cards are matched
function checkIfWon() {
  if (matchCards.length === 16) {
    setTimeout(AskforReplay, 1000);
  }
}

function resetState() {
  firstCard = undefined;
  matchCards = [];
}

// Re-start if user wants.
function AskforReplay() {
  if (confirm("Do you want to play game again?") == true) {
    cards.forEach((each) => each.classList.remove("flipped"));
    randomizeCard();
    resetState();
  }
}
