import 'animate.css';
import '../css/index.css';
import '../css/tailwind.css';

import { v4 as uuid } from 'uuid';
import { ninjaAdjectives, ninjaNames, serverUrl, store } from './constants';
import { calculateCps, calculatePrice, roundDecimalNumber } from './utils';

const clickerElement = document.getElementById('clicker');
const bankElement = document.getElementById('count');
const scoreElement = document.getElementById('total');
const perSecondsElement = document.getElementById('per-seconds');
const timerElement = document.getElementById('timer');
const nameElement = document.getElementById('name');
const bonusList = document.getElementById('bonus-list');
const bonusTemplate = document.getElementById('bonus-template');
const shurikenElement = document.getElementById('shuriken');
const resetButton = document.getElementById('reset');
const notificationsList = document.getElementById('notifications-list');
const notificationTemplate = document.getElementById('notification-template');
const newNameButton = document.getElementById('new-name');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup-button');

let bank = 0;
let clickPerSeconds = 0;
let score = 0;
let hasBoost = false;
let cpsIntervalId;
let name;
let id;
let token;

// RANDOM NAME

function setRandomNinjaName() {
  const adjectiveRandom = Math.floor(Math.random() * (ninjaAdjectives.length - 1));
  const nameRandom = Math.floor(Math.random() * (ninjaNames.length - 1));
  const randomName = `${ninjaAdjectives[adjectiveRandom]} ${ninjaNames[nameRandom]}`;

  name = name || randomName;
  const span = nameElement.querySelector('span');
  span.innerHTML = name;
}

function getNewName() {
  name = '';
  setRandomNinjaName();
}

// NOTIFICATIONS

function showNotification(string) {
  const clone = notificationTemplate.cloneNode(true);
  clone.querySelector('p').innerHTML = string;
  clone.classList.remove('hidden');

  const deleteNotification = () => {
    clone.classList.remove('slide-in');
    clone.classList.add('animate__fadeOutRight');
    setTimeout(() => {
      clone.remove();
    }, 500);
  };

  clone.onclick = () => {
    deleteNotification();
  };

  setTimeout(deleteNotification, 10 * 1000);

  notificationsList.appendChild(clone);
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

  if (sum < 0) {
    clickPerSeconds = 0;
  }

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
  multiplier.textContent = `${roundDecimalNumber(bonus.cps * bonus.count)}/sec`;
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
  showNotification(
    `You just clicked the bonus <u>${bonus.label}</u> ! </br>- ${bonus.price} ninjas</br>+ ${bonus.cps} ninjas/seconde`,
  );
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
    clearInterval(shurikenSpinner);
    updateClickPerSeconds(0);
  };

  setTimeout(hideShuriken, 30 * 1000);

  let angle = 0;
  const shurikenSpinner = setInterval(() => {
    angle += 2;
    shurikenElement.style.transform = 'rotateZ(' + angle + 'deg)';
  }, 15);

  shurikenElement.onclick = () => {
    showNotification(
      `Congrats! You just clicked on the shuriken, all your clicks are doubled for 30 seconds.`,
    );
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

closePopupButton.addEventListener('click', () => {
  popup.classList.add('hidden');
  localStorage.setItem('popup', 'true');
});

clickerElement.addEventListener('click', () => {
  clickerElement.src = './karate-2.svg';

  const multiplier = hasBoost ? 2 : 1;
  updateBank(1 * multiplier);
  updateScore(1 * multiplier);
  updateBonusAvailability();

  setTimeout(() => {
    clickerElement.src = './karate-1.svg';
  }, 100);
});

newNameButton.addEventListener('click', () => {
  getNewName();
});

resetButton.addEventListener('click', () => {
  if (confirm('Click OK to reset your game. All your progress will be deleted.')) {
    updateScore(-score);
    updateBank(-bank);
    updateClickPerSeconds(-clickPerSeconds);

    for (const bonus of store) {
      updateBonusCount(bonus, -bonus.count);
      updateBonusCps(bonus, -bonus.cps);
      updateBonusPrice(bonus, -bonus.price);
    }

    hasBoost = false;
    id = uuid();
    localStorage.setItem('id', id);
    notificationsList.innerHTML = '';

    name = '';
    setRandomNinjaName();

    updateBonusAvailability();
  }
});

// REQUESTS

async function getToken() {
  try {
    const response = await fetch(`${serverUrl}/auth`, {
      method: 'POST',
      body: id,
    });
    const data = await response.text();

    if (response.ok) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }
}

async function getDatabase(route) {
  try {
    const response = await fetch(`${serverUrl}/${route}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }
}

async function postDatabase(route, data) {
  try {
    const response = await fetch(`${serverUrl}/${route}/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    await response.json();

    if (response.ok) {
      return true;
    }
  } catch (e) {
    console.error(e);
  }
}

setInterval(() => {
  postDatabase('game', {
    score,
    bank,
    clickPerSeconds,
    name,
    hasBoost,
  });
  postDatabase('bonus', {
    store,
  });
}, 1000);

document.addEventListener('DOMContentLoaded', async () => {
  id = localStorage.getItem('id') || uuid();
  localStorage.setItem('id', id);

  token = await getToken();

  await getDatabase('game').then((data) => {
    if (data) {
      score = data.score;
      bank = data.bank;
      clickPerSeconds = data.clickPerSeconds;
      hasBoost = data.hasBoost;
      name = data.name;
    }
  });

  await getDatabase('bonus').then((data) => {
    if (data) {
      for (let i = 0; i < store.length; i++) {
        store[i] = data.store[i];
      }
    }
  });

  setRandomNinjaName();
  randomShurikenSpawn();

  if (!localStorage.getItem('popup')) {
    popup.classList.remove('hidden');
  }

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

    bonusList.appendChild(clone);
  }

  updateScore(0);
  updateBank(0);
  updateClickPerSeconds(0);
  updateBonusAvailability();

  bonusTemplate.remove();
});
