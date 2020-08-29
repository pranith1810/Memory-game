const gameContainer = document.getElementById("game");
let boxes = gameContainer.children;

const imagesList = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5",
  "img6",
  "img7",
  "img8",
  "img9",
  "img10",
  "img11",
  "img12",
  "img1",
  "img2",
  "img3",
  "img4",
  "img5",
  "img6",
  "img7",
  "img8",
  "img9",
  "img10",
  "img11",
  "img12"
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

let shuffledImages = shuffle(imagesList);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForImages(imageArray) {
  for (let image of imageArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(image);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  event.target.style.backgroundImage = `url(gifs/${event.target.classList[0]}.gif)`;
  event.target.style.backgroundSize = "contain";
  event.target.classList.add("clicked");
  for (let box of boxes) {
    if (box !== event.target && box.classList.contains("clicked")) {
      checkIfImageMatch(box, event.target);
      break;
    }
  }
}

function checkIfImageMatch(previousTarget, currentTarget) {
  // you can use currentTarget to see which element was clicked

  if (previousTarget.classList[0] === currentTarget.classList[0]) {
    currentTarget.classList.add("matched");
    previousTarget.classList.add("matched");
    previousTarget.removeEventListener("click", handleCardClick);
    currentTarget.removeEventListener("click", handleCardClick);
    previousTarget.classList.remove("clicked");
    currentTarget.classList.remove("clicked");
    let flag = 1;
    for (let box of boxes) {
      if (box.style.backgroundImage === "") {
        flag = 0;
        break;
      }
    }
    if (flag === 1) {
      setTimeout(() => {
        alert("You have won the game!!!!");
      }, 10);

    }
  }
  else {
    for (let box of boxes) {
      if (!box.classList.contains("matched"))
        box.removeEventListener("click", handleCardClick);
    }
    setTimeout(() => {
      previousTarget.style.backgroundImage = "";
      currentTarget.style.backgroundImage = "";
      previousTarget.classList.remove("clicked");
      currentTarget.classList.remove("clicked");
      for (let box of boxes) {
        if (!box.classList.contains("matched"))
          box.addEventListener("click", handleCardClick);
      }
    }, 1000);
  }
}


// when the DOM loads
createDivsForImages(shuffledImages);
