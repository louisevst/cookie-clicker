import './index.css';
import { store, ninjaAdjectives, ninjaNames } from './constants';

const clickerElement = document.getElementById('clicker');
const totalCountElement = document.getElementById('total');
const countElement = document.getElementById('count');
const perSecondsElement = document.getElementById('per-seconds');
const timerElement = document.getElementById('timer');
const nameElement = document.getElementById('name');

const hideAfter = 30 * 1000;

let count = 0;
let clickPerSeconds = 0;
let totalCount = 0;
let hasBoost = false;

function setLocalStorage(property, value) {
  localStorage.setItem(
    'game',
    JSON.stringify({
      totalCount: 0,
      hasBoost: false,
      count: 0,
      clickPerSeconds: 0,
      [property]: value,
    }),
  );
}

function setLocalStorageBonus(index, property, value) {
  store[index][property] = value;
  localStorage.setItem('bonus', JSON.stringify(store));
}

function getLocalStorageBonus() {
  if (typeof Storage !== 'undefined') {
    // vérifie si le navigateur prend en charge localStorage
    const storedStore = JSON.parse(localStorage.getItem('bonus'));
    for (let i = 0; i < store.length; i++) {
      store[i] = { ...store[i], ...storedStore[i] };
    }
  }
}

function getLocalStorage(property) {
  if (typeof Storage !== 'undefined') {
    const value = localStorage.getItem('game');
    const object = JSON.parse(value);
    if (object !== null) {
      return object[property];
    }
  }
}

function getNinjaName() {
  const num1 = Math.floor(Math.random() * (ninjaAdjectives.length - 1));
  const num2 = Math.floor(Math.random() * (ninjaNames.length - 1));
  nameElement.innerHTML = `${ninjaAdjectives[num1]} ${ninjaNames[num2]}`;
}

clickerElement.addEventListener('mousedown', () => {
  clickerElement.src = './karate-2.svg';

  const amount = hasBoost ? 2 : 1;
  updateCount(amount);
  updateTotalCount(amount);
});

clickerElement.addEventListener('mouseup', () => {
  clickerElement.src = './karate-1.svg';
});

function updateCount(nb) {
  count += nb;
  countElement.textContent = count.toFixed(0) + ' ninjas';
  perSecondsElement.textContent = `Par secondes: ${clickPerSeconds.toFixed(1)} ${
    hasBoost ? ' x2' : ''
  }`;
}

function updateTotalCount(nb) {
  totalCount += nb;
  totalCountElement.textContent = 'Total: ' + totalCount.toFixed();
}

function updateBonusImg(bonus) {
  const imgElement = bonus.element.querySelector('img');
  imgElement.src = bonus.src;
}

function updateBonusLabel(bonus) {
  const labelElement = bonus.element.querySelector('.label');
  labelElement.innerHTML = bonus.label;
}

function updateBonusCount(bonus) {
  const countElement = bonus.element.querySelector('.count');
  countElement.innerHTML = bonus.count;
}

function updateBonusPrice(bonus) {
  const priceElement = bonus.element.querySelector('.price');
  priceElement.innerHTML = bonus.price;
}

function updateBonusMultiplier(bonus) {
  const multiplier = bonus.element.querySelector('.multiplier');
  multiplier.innerHTML = 'x' + bonus.multiplier;
}

function bonusOnClick(bonus) {
  const multiplier = bonus.multiplier * 0.1;

  if (count < bonus.price) {
    return;
  }

  count -= bonus.price;
  clickPerSeconds += multiplier;
  bonus.count += 1;

  if (bonus.price < 50) {
    bonus.price *= 2;
  } else if (bonus.price >= 50 && bonus.price < 200) {
    bonus.price *= 3;
  } else if (bonus.price >= 200) {
    bonus.price *= 4;
  }

  updateBonusCount(bonus);
  updateBonusPrice(bonus);

  setInterval(() => {
    if (hasBoost) {
      updateCount(multiplier * 2);
      updateTotalCount(multiplier * 2);
    } else {
      updateCount(multiplier);
      updateTotalCount(multiplier);
    }
  }, 1000);
}

//fonction pour avoir la durée entre 5 et 10min qui déclanche banane dorée
function randomDuration() {
  return Math.random() * (600000 - 300000) + 300000;
}

//créer la golden banana dans html et la fait disparaître après 30 sec
function createShuriken() {
  const image = document.getElementById('shuriken');
  image.classList.remove('hidden');

  let xPosition = 10;
  let yPosition = 10;
  let xSpeed = 4;
  let ySpeed = 4;

  function update() {
    image.style.left = xPosition + 'px';
    image.style.top = yPosition + 'px';
  }

  const interval = setInterval(() => {
    if (xPosition + image.clientWidth >= window.innerWidth || xPosition <= 0) {
      xSpeed = -xSpeed;
    }
    if (yPosition + image.clientHeight >= window.innerHeight || yPosition <= 0) {
      ySpeed = -ySpeed;
    }

    xPosition += xSpeed;
    yPosition += ySpeed;
    update();
  }, 1000 / 60);

  setTimeout(() => {
    image.classList.add('hidden');
    clearInterval(interval);
  }, hideAfter);

  image.onclick = function () {
    const timerId = setInterval(countdown, 1000);
    let timeLeft = 30;

    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
      } else {
        timerElement.innerHTML = 'Bonus : ' + timeLeft + ' sec. remaining';
        timeLeft--;
      }
    }

    timerElement.style.display = 'block'; // affiche la div
    image.classList.add('hidden');
    clearInterval(interval);
    hasBoost = true;

    setTimeout(() => {
      timerElement.style.display = 'none'; // cache la div après 30 secondes
      hasBoost = false;
    }, hideAfter);
  };
}

//function qui appelle la golden banana
function shuriken() {
  setTimeout(() => {
    createShuriken();
    shuriken();
  }, randomDuration());
}

const saveInterval = setInterval(() => {
  setLocalStorage('count', count);
  setLocalStorage('clickPerSeconds', clickPerSeconds);
  setLocalStorage('totalCount', totalCount);
  setLocalStorage('hasBoost', hasBoost);
  for (let i = 0; i < store.length; i++) {
    setLocalStorageBonus(i, 'count', store[i].count);
    setLocalStorageBonus(i, 'price', store[i].price);
    setLocalStorageBonus(i, 'multiplier', store[i].multiplier);
  }
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
  saveInterval;
  getLocalStorage('count');
  getLocalStorage('clickPerSeconds');
  getLocalStorage('totalCount');
  for (let i = 0; i < store.length; i++) {
    getLocalStorageBonus(i, 'count', store[i].count);
    getLocalStorageBonus(i, 'price', store[i].price);
    getLocalStorageBonus(i, 'multiplier', store[i].multiplier);
  }
  getNinjaName();
  shuriken();

  const bonuses = document.getElementById('bonuses');
  const bonusTemplate = document.getElementById('template-bonus');

  for (const bonus of store) {
    const clone = bonusTemplate.cloneNode(true);
    clone.onclick = () => bonusOnClick(bonus);
    bonus.element = clone;

    updateBonusImg(bonus);
    updateBonusLabel(bonus);
    updateBonusCount(bonus);
    updateBonusPrice(bonus);
    updateBonusMultiplier(bonus);

    bonuses.appendChild(clone);
  }

  bonusTemplate.remove();
});
