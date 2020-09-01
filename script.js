/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

const gameContainer = document.getElementById('game');
const boxes = gameContainer.children;
const restartButton = document.getElementById('restart');
const startButton = document.getElementById('start');
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

/**
 * Shuffles the passed array based on Fisher Yates algorithm and returns the array
 * @param {array} array The array which has to be shuffled
 * @returns {array} The shuffled version of the passed array
 */
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

/**
 * Creates divisions for each image which has to be guessed
 * @param {array} imageArray Contains a class name for each division
 */
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

/**
 * Checks if the two divisions which are passed to this function have same first class name
 * @param {HTMLElement} previousTarget Html Element object of the first clicked division
 * @param {HTMLElement} secondTarget Html Element object of the second clicked division
 */
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
      if (!box.classList.contains('matched')) {
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
      previousTarget.style.backgroundImage = 'url(gifs/qmark.png)';
      currentTarget.style.backgroundImage = 'url(gifs/qmark.png)';
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

/**
 * Handles the click event for click event listener of each division
 * @param {event} event event object of the click
 */
function handleCardClick(event) {
  event.target.style.backgroundImage = `url(gifs/${event.target.classList[0]}.gif)`;
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

restartButton.addEventListener('click', handleRestartClick);
startButton.addEventListener('click', handleStartClick);

/**
 * Handles the click event for click event listener of restart button
 */
function handleRestartClick() {
  while (boxes.length > 0) {
    boxes[0].remove();
  }
  shuffledImages = shuffle(imagesList);
  createDivsForImages(shuffledImages);
  clicks = 0;
  score.innerText = clicks.toString();
}

function handleStartClick() {
  createDivsForImages(shuffledImages);
  startButton.style.display = 'none';
  restartButton.style.display = 'block';
}

if (localStorage.getItem('lowestClicks') === null) {
  localStorage.setItem('lowestClicks', '0');
  lowestClicks.innerText = '0';
} else {
  lowestClicks.innerText = localStorage.getItem('lowestClicks');
}
