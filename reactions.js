const letters = "ABCDEFGH".split("");
const cards = [...letters, ...letters].sort(() => Math.random() - 0.5);
const gameBoard = document.getElementById("gameBoard");

let firstCard = null;
let secondCard = null;
let matched = 0;
let lock = false;

cards.forEach(letter => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.letter = letter;
  card.textContent = "";

  card.onclick = () => {
    if (lock || card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.textContent = letter;

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lock = true;

      if (firstCard.dataset.letter === secondCard.dataset.letter) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matched += 2;
        reset();
        if (matched === cards.length) alert("🎉 You win!");
      } else {
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard.textContent = "";
          secondCard.textContent = "";
          reset();
        }, 1000);
      }
    }
  };

  gameBoard.appendChild(card);
});

function reset() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}
