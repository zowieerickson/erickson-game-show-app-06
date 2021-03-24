const overlay = document.getElementById("overlay");
const btnReset = document.querySelector("a.btn__reset");
const phrase = document.getElementById("phrase");
const qwerty = document.getElementById("qwerty");
const ul = document.querySelector("#phrase ul");
let missed = 0;

const phrases = [
  "JavaScript is awesome",
  "Zowie is swole",
  "I will become a software developer",
  "A hundred days of code",
  "This app is pretty cool",
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
      }
    }
  }
}

function checkLetter(btn) {
  const characters = document.getElementsByClassName("letter");
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    if (character == btn.textContent) {
      li.classList.add("show");
      const matchingCharacter = character; // Not sure if this works
      return matchingCharacter; // Same, not sure if will work if the one on top doesn't work
    } else {
      return null;
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
