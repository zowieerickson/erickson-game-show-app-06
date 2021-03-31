const overlay = document.getElementById("overlay");
const btnReset = document.querySelector("a.btn__reset");
const phrase = document.getElementById("phrase");
const keyboard = document.getElementById("qwerty");
const ul = document.querySelector("#phrase ul");
// let hearts = document.querySelectorAll('ol li')
let scoreboard = document.querySelector("#scoreboard ol");
let missed = 0;

const phrases = [
  "javascript",
  "zowie",
  // "software developer",
  "coding",
  // "web development",
];

const phrases2 = [
  // "javascript",
  // "zowie",
  "software developer",
  // "coding",
  "web development",
];

btnReset.addEventListener("click", () => {
  overlay.style.display = "none";
});

function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  const characterSpread = [...randomPhrase];
  return characterSpread;
}

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const character = arr[i];
    for (let i = 0; i < character.length; i++) {
      const li = document.createElement("li");
      li.textContent = character;
      ul.appendChild(li);
      if (character.toUpperCase() != character.toLowerCase()) {
        li.className = "letter";
      } else {
        li.className = "space";
      }
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(btn) {
  const characters = document.getElementsByClassName("letter");
  let matchingCharacter = null;
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    if (character.textContent === btn.textContent) {
      character.classList.add("show");
      matchingCharacter = btn.textContent;
    }
  }
  return matchingCharacter;
}

// Check for user`s actual keyboard later also
keyboard.addEventListener("click", (e) => {
  const button = e.target;
  if (e.target.tagName === "BUTTON") {
    button.classList.add("chosen");
    button.disabled = true;
    const letterFound = checkLetter(button);
    let heart = document.querySelector("ol li:last-child");
    if (!letterFound) {
      missed++;
      scoreboard.removeChild(heart);
    }
    checkWin();
  }
});

function insertHearts() {
  let heart = document.querySelector("ol li:last-child");
  const heartClone = heart.cloneNode(true);
  heartClone.classList.add("right_margin");
  scoreboard.insertBefore(heartClone, heart);
}

function insertHeartsLose() {
  const li = document.createElement("li");
  li.classList.add("tries");
  li.classList.add("right_margin");
  const img = document.createElement("img");
  img.src = "images/liveHeart.png";
  li.appendChild(img);
  scoreboard.appendChild(li);
}

function checkWin() {
  const show = document.getElementsByClassName("show");
  const letter = document.getElementsByClassName("letter");
  const li = document.querySelectorAll("#phrase ul li");
  const winOrLose = document.getElementById("winOrLose");
  const buttons = document.querySelectorAll(".keyrow button");
  const hearts = document.querySelectorAll("ol li");
  console.log(show.length);
  console.log(letter.length);
  if (show.length == letter.length) {
    overlay.style.display = "flex";
    overlay.classList.add("win");
    if (overlay.classList.contains("lose")) {
      overlay.classList.remove("lose");
    }
    btnReset.textContent = "Try Again";
    winOrLose.textContent = "You Win!";
    missed = 0;
    // Removes the phrase
    for (let i = 0; i < li.length; i++) {
      ul.removeChild(li[i]);
    }
    // Reactivates keyboard
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("chosen");
      buttons[i].disabled = false;
    }
    // Adds new phrase
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    // Add hearts
    if (hearts.length == 4) {
      insertHearts();
    } else if (hearts.length == 3) {
      insertHearts();
      insertHearts();
    } else if (hearts.length == 2) {
      insertHearts();
      insertHearts();
      insertHearts();
    } else if (hearts.length == 1) {
      insertHearts();
      insertHearts();
      insertHearts();
      insertHearts();
    }
  } else if (missed >= 5) {
    overlay.style.display = "flex";
    overlay.classList.add("lose");
    btnReset.textContent = "Try Again";
    winOrLose.textContent = "You Lose!";
    missed = 0;
    // Removes the phrase
    for (let i = 0; i < li.length; i++) {
      ul.removeChild(li[i]);
    }
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("chosen");
      buttons[i].disabled = false;
    }
    // Adds new phrase
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    // Adds hearts
    if (hearts.length == 0) {
      insertHeartsLose();
      insertHeartsLose();
      insertHeartsLose();
      insertHeartsLose();
      insertHeartsLose();
    }
  }
}
