const overlay = document.getElementById("overlay");
const btnReset = document.querySelector("a.btn__reset");
const phrase = document.getElementById("phrase");
const qwerty = document.getElementById("qwerty");
let missed = 0;

const phrases = [
  "JavaScript is awesome",
  "Zowie is swole",
  "I will be a software developer",
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

console.log(getRandomPhraseAsArray(phrases));

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const characters = arr[i];
    console.log(characters);
  }
}

//
// lets go
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
