const overlay = document.getElementById("overlay");
const btnReset = document.querySelector("a.btn__reset");
const phrase = document.getElementById("phrase");
const keyboard = document.getElementById("qwerty");
const ul = document.querySelector("#phrase ul");

let missed = 0;

const phrases = [
  "javascript is awesome",
  "zowie is swole",
  "i will become a software developer",
  "a hundred days of code",
  "this app is pretty cool",
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
    const hearts = document.getElementsByClassName("tries");
    const heartsOL = hearts.parentNode;

    if (!letterFound) {
      missed++;
      heartsOL.removeChild(hearts);
    }
  }

  // for (let i = 0; i < hearts.length; i++) {
  //   console.log(letterFound);
  //   if (letterFound) {
  //     missed++;
  //     console.log("missed");
  //     hearts[i].remove();
  //   }
  // }
});
