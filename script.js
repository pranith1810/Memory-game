/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

const gameContainer = document.getElementById('game');
const boxes = gameContainer.children;
const restartButton = document.getElementById('restart');
const score = document.getElementById('score');
const lowestClicks = document.getElementById('lowest-clicks');

const imagesList = [
  'img1',
  'img2',
  'img3',
  'img4',
  'img5',
  'img6',
  'img7',
  'img8',
  'img9',
  'img10',
  'img11',
  'img12',
  'img1',
  'img2',
  'img3',
  'img4',
  'img5',
  'img6',
  'img7',
  'img8',
  'img9',
  'img10',
  'img11',
  'img12',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter -= 1;

    // And swap the last element with it
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledImages = shuffle(imagesList);
let clicks = 0;

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForImages(imageArray) {
  for (const image of imageArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(image);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function checkIfImageMatch(previousTarget, currentTarget) {
  // you can use currentTarget to see which element was clicked

  if (previousTarget.classList[0] === currentTarget.classList[0]) {
    currentTarget.classList.add('matched');
    previousTarget.classList.add('matched');
    previousTarget.removeEventListener('click', handleCardClick);
    currentTarget.removeEventListener('click', handleCardClick);
    previousTarget.classList.remove('clicked');
    currentTarget.classList.remove('clicked');
    let flag = 1;
    for (const box of boxes) {
      if (box.style.backgroundImage === '') {
        flag = 0;
        break;
      }
    }
    if (flag === 1) {
      setTimeout(() => {
        if (Number(localStorage.getItem('lowestClicks')) === 0 || Number(localStorage.getItem('lowestClicks')) > clicks) {
          localStorage.setItem('lowestClicks', `${clicks}`);
          lowestClicks.innerText = clicks;
        }
        alert('You have won the game!!!!');
      }, 100);
    }
  } else {
    for (const box of boxes) {
      if (!box.classList.contains('matched')) {
        box.removeEventListener('click', handleCardClick);
      }
    }
    setTimeout(() => {
      previousTarget.style.backgroundImage = '';
      currentTarget.style.backgroundImage = '';
      previousTarget.classList.remove('clicked');
      currentTarget.classList.remove('clicked');
      for (const box of boxes) {
        if (!box.classList.contains('matched')) {
          box.addEventListener('click', handleCardClick);
        }
      }
    }, 1000);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  restartButton.style.display = 'block';
  event.target.style.backgroundImage = `url(gifs/${event.target.classList[0]}.gif)`;
  event.target.style.backgroundSize = 'contain';
  event.target.classList.add('clicked');
  for (const box of boxes) {
    if (box !== event.target && box.classList.contains('clicked')) {
      clicks += 1;
      score.innerText = clicks.toString();
      checkIfImageMatch(box, event.target);
      break;
    }
  }
}

restartButton.addEventListener('click', () => {
  while (boxes.length > 0) {
    boxes[0].remove();
  }
  shuffledImages = shuffle(imagesList);
  createDivsForImages(shuffledImages);
  clicks = 0;
  score.innerText = clicks.toString();
});

// when the DOM loads
createDivsForImages(shuffledImages);
if (localStorage.getItem('lowestClicks') === null) {
  localStorage.setItem('lowestClicks', '0');
  lowestClicks.innerText = '0';
} else {
  lowestClicks.innerText = localStorage.getItem('lowestClicks');
}
