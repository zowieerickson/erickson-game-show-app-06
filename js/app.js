const overlay = document.getElementById("overlay");
const btnReset = document.querySelector("a.btn__reset");
const phrase = document.getElementById("phrase");
const keyboard = document.getElementById("qwerty");
const ul = document.querySelector("#phrase ul");
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

function checkWin() {
  const show = document.getElementsByClassName("show");
  const letter = document.getElementsByClassName("letter");
  const li = document.querySelectorAll("#phrase ul li");
  const winOrLose = document.getElementById("winOrLose");
  const buttons = document.querySelectorAll(".keyrow button");
  const hearts = document.querySelectorAll("ol li");
  const createLI = document.createElement("li");
  console.log(hearts);
  if (show.length == letter.length) {
    overlay.style.display = "flex";
    overlay.classList.add("win");
    btnReset.textContent = "Try Again";
    winOrLose.textContent = "You Win!";
    missed = 0;
    for (let i = 0; i < li.length; i++) {
      ul.removeChild(li[i]);
    }
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("chosen");
      buttons[i].disabled = false;
    }
    getRandomPhraseAsArray(phrases2);
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    for (let i = 0; i < 6; i++) {
      scoreboard.appendChild(createLI);
    }
  } else if (missed >= 5) {
    overlay.style.display = "flex";
    overlay.classList.add("lose");
    btnReset.textContent = "Try Again";
    winOrLose.textContent = "You Lose!";
    getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    missed = 0;
    button.classList.add("chosen");
    button.disabled = true;
    for (let i = 0; i < letter.length; i++) {
      letter[i].style.display = "none";
    }
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("chosen");
      buttons[i].disabled = false;
    }
    // for (let j = 0; j < 6; i++) {
    //   scoreboard.appendChild(hearts[j]);
    // }
  }
}
