// create div for cards
// let cards = [];
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
    // cards.push(card);
    card.classList = "card";
    cardFront.classList = "cardFront";
    cardBack.classList = "cardBack";
  }
}
// randomize images
randomizeCard();
function randomizeCard() {
  let images = ["dog1", "dog2", "dog3", "dog4", "dog5", "dog6", "dog7", "dog8"];
  let imageList = images.concat(images);
  let randomziedImages = imageList.sort(() => Math.random() - 0.5);

  // randomzied images to the HTML
  let cardBack = document.querySelectorAll(".cardBack");
  cardBack.forEach((each, index) =>
    each.setAttribute("src", `/images/${randomziedImages[index]}.jpg`)
  );
}

//when card is clicked, flip
let card = document.querySelectorAll(".card");
gameStartByclick();
function gameStartByclick() {
  card.forEach((each) => each.addEventListener("click", filpCards));
}

let firstCard, secondCard;
let anyClicked = true;

function filpCards() {
  this.classList.add("fliped");

  if (!anyClicked) {
    secondCard = this;
    anyClicked = true;
  } else {
    firstCard = this;
    anyClicked = false;
  }
  // console.log(firstCard);
  // console.log(secondCard);
  if (
    secondCard.childNodes[1].getAttribute("src") ===
    firstCard.childNodes[1].getAttribute("src")
  ) {
    // firstCard.removeEventListener("click", filpCards);
    // secondCard.removeEventListener("click", filpCards);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("fliped");
      secondCard.classList.remove("fliped");
      console.log("diff");
    }, 1500);
  }
  checkFlipedCards();
}

// when all the cards are fliped, show scores and then re-randomize cards
function checkFlipedCards() {
  cardArray = Array.from(card);
  /* Nodelist and array is not the same! -> how to convert nodelist to array*/
  let IsAllFliped = cardArray.every((el) => el.className === "card fliped");
  if (IsAllFliped == true) {
    setTimeout(AskforReplay, 3000);
  }
}

const AskforReplay = function () {
  if (confirm("Do you want to play game again?") == true) {
    card.forEach((each) => each.classList.remove("fliped"));
    randomizeCard();
    gameStartByclick();
  }
};
