import '../css/tailwind.css';

import { ninjaAdjectives, ninjaNames, store } from './constants';
import { calculateCps, calculatePrice, roundDecimalNumber } from './utils';

const clickerElement = document.getElementById('clicker');
const bankElement = document.getElementById('count');
const scoreElement = document.getElementById('total');
const perSecondsElement = document.getElementById('per-seconds');
const timerElement = document.getElementById('timer');
const nameElement = document.getElementById('name');
const bonusParent = document.getElementById('bonuses');
const bonusTemplate = document.getElementById('template-bonus');
const shurikenElement = document.getElementById('shuriken');
const resetElement = document.getElementById('reset');

let bank = 0;
let clickPerSeconds = 0;
let score = 0;
let hasBoost = false;
let cpsIntervalId;
let name;

function setRandomNinjaName() {
  const adjectiveRandom = Math.floor(Math.random() * (ninjaAdjectives.length - 1));
  const nameRandom = Math.floor(Math.random() * (ninjaNames.length - 1));
  const randomName = `${ninjaAdjectives[adjectiveRandom]} ${ninjaNames[nameRandom]}`;

  name = name || randomName;
  setLocalStorage('name', name);

  nameElement.innerHTML = name;
}

// LOCAL STORAGE

function getLocalStorage(property) {
  const value = localStorage.getItem('game');
  const object = JSON.parse(value);
  if (object !== null) {
    return object[property];
  }
}

function setLocalStorage(property, value) {
  localStorage.setItem(
    'game',
    JSON.stringify({
      bank,
      hasBoost,
      score,
      clickPerSeconds,
      name,
      [property]: value,
    }),
  );
}

function getLocalStorageBonus() {
  const storedStore = JSON.parse(localStorage.getItem('bonus'));

  if (!storedStore) {
    return;
  }

  for (let i = 0; i < store.length; i++) {
    store[i] = { ...store[i], ...storedStore[i] };
  }
}

function setLocalStorageBonus(index, property, value) {
  store[index][property] = value;
  localStorage.setItem('bonus', JSON.stringify(store));
}

// INFO

function updateScore(amount) {
  score += amount;
  scoreElement.textContent = `Score: ${Math.floor(score)}`;
}

function updateBank(amount) {
  bank += amount;
  bankElement.textContent = `${Math.floor(bank)} ninjas`;
}

function updateClickPerSeconds(amount) {
  const sum = clickPerSeconds + roundDecimalNumber(amount);
  clickPerSeconds = sum;

  if (cpsIntervalId) {
    clearInterval(cpsIntervalId);
  }

  const multipliedSum = () => (hasBoost ? 2 * sum : sum);

  cpsIntervalId = setInterval(() => {
    updateBank(multipliedSum() / 10);
    updateScore(multipliedSum() / 10);
    updateBonusAvailability();
  }, 1000 / 10);

  perSecondsElement.textContent = `${roundDecimalNumber(multipliedSum())} per sec.`;
}

// BONUS

function updateBonusImg(bonus) {
  const imgElement = bonus.element.querySelector('img');
  imgElement.src = `./bonus-${bonus.index + 1}.svg`;
}

function updateBonusLabel(bonus) {
  const labelElement = bonus.element.querySelector('.label');
  labelElement.textContent = bonus.label;
}

function updateBonusCount(bonus, amount = 0) {
  bonus.count += amount;
  const countElement = bonus.element.querySelector('.count');
  countElement.textContent = bonus.count;
}

function updateBonusPrice(bonus) {
  bonus.price = calculatePrice(bonus.index, bonus.count);
  const priceElement = bonus.element.querySelector('.price');
  priceElement.textContent = Math.round(bonus.price);
}

function updateBonusCps(bonus) {
  bonus.cps = calculateCps(bonus.index);
  const multiplier = bonus.element.querySelector('.multiplier');
  multiplier.textContent = roundDecimalNumber(bonus.cps * bonus.count);
}

function updateBonusAvailability() {
  for (const bonus of store) {
    const isAvailable = bonus.element.disabled === false;
    if (isAvailable && bank < bonus.price) {
      bonus.element.disabled = true;
    } else if (!isAvailable && bank >= bonus.price) {
      bonus.element.disabled = false;
    }
  }
}

function onBonusClick(bonus) {
  if (bank < bonus.price) {
    return;
  }

  updateBank(-bonus.price);
  updateBonusCount(bonus, 1);
  updateBonusPrice(bonus);
  updateBonusCps(bonus);
  updateBonusAvailability();
  updateClickPerSeconds(bonus.cps);
}

// SHURIKEN MULTIPLIER

function createShuriken() {
  shurikenElement.classList.remove('hidden');

  let xPosition = 10;
  let yPosition = 10;
  let xSpeed = 4;
  let ySpeed = 4;

  const moveShuriken = () => {
    if (xPosition + shurikenElement.clientWidth >= window.innerWidth || xPosition <= 0) {
      xSpeed = -xSpeed;
    }
    if (
      yPosition + shurikenElement.clientHeight >= window.innerHeight ||
      yPosition <= 0
    ) {
      ySpeed = -ySpeed;
    }

    xPosition += xSpeed;
    yPosition += ySpeed;

    shurikenElement.style.left = xPosition + 'px';
    shurikenElement.style.top = yPosition + 'px';
  };

  const shurikenInterval = setInterval(moveShuriken, 1000 / 100);

  const hideShuriken = () => {
    shurikenElement.classList.add('hidden');
    clearInterval(shurikenInterval);
    updateClickPerSeconds(0);
  };

  setTimeout(hideShuriken, 30 * 1000);
  let angle = 0; //faire tourner le shuriken
  setInterval(() => {
    angle += 2;
    shurikenElement.style.transform = 'rotateZ(' + angle + 'deg)';
  }, 15);

  shurikenElement.onclick = () => {
    timerElement.style.display = 'block';

    let timeLeft = 30;
    hasBoost = true;

    const countdown = () => {
      if (timeLeft == -1) {
        clearTimeout(timerId);
      } else {
        timerElement.innerHTML = 'Boost: ' + timeLeft + ' sec. remaining';
        timeLeft--;
      }
    };

    const timerId = setInterval(countdown, 1000);

    const hideTimer = () => {
      timerElement.style.display = 'none';
      hasBoost = false;
      updateClickPerSeconds(0);
    };

    setTimeout(hideTimer, 30 * 1000); // hides the timer after 30 seconds

    hideShuriken();
  };
}

function randomShurikenSpawn() {
  const randomDuration = Math.random() * (600000 - 300000) + 300000;
  setTimeout(() => {
    createShuriken();
    randomShurikenSpawn();
  }, randomDuration);
}

// EVENT LISTENERS

clickerElement.addEventListener('mousedown', () => {
  clickerElement.src = './karate-2.svg';

  const multiplier = hasBoost ? 2 : 1;
  updateBank(1 * multiplier);
  updateScore(1 * multiplier);
  updateBonusAvailability();
});

clickerElement.addEventListener('mouseup', () => {
  clickerElement.src = './karate-1.svg';
});

resetElement.addEventListener('click', () => {
  hasBoost = false;

  updateScore(-score);
  updateBank(-bank);
  updateClickPerSeconds(-clickPerSeconds);

  for (const bonus of store) {
    updateBonusCount(bonus, -bonus.count);
    updateBonusCps(bonus, -bonus.cps);
    updateBonusPrice(bonus, -bonus.price);
  }

  updateBonusAvailability();
});

setInterval(() => {
  setLocalStorage('score', score);
  setLocalStorage('clickPerSeconds', clickPerSeconds);
  setLocalStorage('bank', bank);
  setLocalStorage('hasBoost', hasBoost);

  for (let i = 0; i < store.length; i++) {
    setLocalStorageBonus(i, 'count', store[i].count);
  }
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
  score = getLocalStorage('score') || score;
  bank = getLocalStorage('bank') || bank;
  clickPerSeconds = getLocalStorage('clickPerSeconds') || clickPerSeconds;
  hasBoost = getLocalStorage('hasBoost') || hasBoost;
  name = getLocalStorage('name') || name;
  getLocalStorageBonus();

  setRandomNinjaName();
  randomShurikenSpawn();

  for (const bonus of store) {
    const clone = bonusTemplate.cloneNode(true);
    const index = store.indexOf(bonus);

    bonus.element = clone;
    bonus.index = index;

    updateBonusImg(bonus);
    updateBonusLabel(bonus);
    updateBonusCount(bonus);
    updateBonusPrice(bonus);
    updateBonusCps(bonus);

    clone.removeAttribute('id');
    clone.onclick = () => {
      onBonusClick(bonus);
    };

    bonusParent.appendChild(clone);
  }

  updateScore(0);
  updateBank(0);
  updateClickPerSeconds(0);
  updateBonusAvailability();

  bonusTemplate.remove();
});
