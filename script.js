const gameContainer = document.getElementById("game");
let boxes = gameContainer.children;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let previousTarget = null;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  event.target.style.backgroundColor = event.target.classList[0];

  if (previousTarget === null) {
    previousTarget = event.target;
  }
  else {
    if (previousTarget.classList[0] === event.target.classList[0]) {
      previousTarget = null;
      let flag = 1;
      for (let box of boxes) {
        if (box.style.backgroundColor === "") {
          flag = 0;
          break;
        }
      }
      if (flag === 1) {
        setTimeout(() => {
          alert("You have won the game!!!!");
        }, 1);

      }
    }
    else {
      for (let box of boxes) {
        box.removeEventListener("click", handleCardClick);
      }
      setTimeout(() => {
        previousTarget.style.backgroundColor = "";
        event.target.style.backgroundColor = "";
        previousTarget = null;
        for (let box of boxes) {
          box.addEventListener("click", handleCardClick);
        }
      }, 1000);
    }
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);
