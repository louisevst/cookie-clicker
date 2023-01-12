import './index.css';

const clickerElement = document.getElementById('clicker');
const totalCountElement = document.getElementById('total');
const countElement = document.getElementById('count');
const perSecondsElement = document.getElementById('per-seconds');

let count = 0;
let clickPerSeconds = 0;
let totalCount = 0;
let hasBoost = false;

const store = [
  {
    label: 'Bonus 1',
    count: 0,
    price: 1,
    multiplier: 1,
    element: null,
  },
  {
    label: 'Bonus 2',
    count: 0,
    price: 10,
    multiplier: 10,
    element: null,
  },
  {
    label: 'Bonus 3',
    count: 0,
    price: 100,
    multiplier: 100,
    element: null,
  },
];

clickerElement.addEventListener('click', () => {
  const amount = hasBoost ? 2 : 1;
  updateCount(amount);
  updateTotalCount(amount);
  console.log('click', count);
});

function updateCount(nb) {
  count += nb;
  countElement.textContent = count.toFixed(0) + ' cookies';
  perSecondsElement.textContent = 'Par secondes: ' + clickPerSeconds.toFixed(1);
}

function updateTotalCount(nb) {
  totalCount += nb;
  totalCountElement.textContent = 'Total: ' + totalCount.toFixed();
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
  priceElement.innerHTML = 'Price : ' + bonus.price + ' 🍌';
}

function updateBonusMultiplier(bonus) {
  const multiplier = bonus.element.querySelector('.multiplier');
  multiplier.innerHTML = 'Multiplier: x' + bonus.multiplier;
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
  //return Math.random() * (600000 - 300000) + 300000;
  return 10000;
}
//créer la golden banana dans html et la fait disparaître après 30 sec
function createGoldenBanana() {
  var image = document.getElementById('golden-banana');
  image.classList.add('block');

  setTimeout(() => {
    //image.remove();
    image.classList.remove('block');
  }, 30000);
  image.onclick = function () {
    //image.remove();
    image.classList.remove('block');
    boost();
    setTimeout(() => {
      boost = false;
    }, 30000);
  };
}

//function à appeler pour que le boost soit effectif
function boost() {
  hasBoost = true;
}
//function qui appelle la golden banana
function goldenBanana() {
  setTimeout(() => {
    createGoldenBanana();
    goldenBanana();
  }, randomDuration());
}

goldenBanana();

document.addEventListener('DOMContentLoaded', () => {
  const bonuses = document.getElementById('bonuses');
  const bonusTemplate = document.getElementById('template-bonus');

  for (const bonus of store) {
    const clone = bonusTemplate.cloneNode(true);
    clone.onclick = () => bonusOnClick(bonus);

    bonus.element = clone;

    updateBonusLabel(bonus);
    updateBonusCount(bonus);
    updateBonusPrice(bonus);
    updateBonusMultiplier(bonus);

    bonuses.appendChild(clone);
  }

  bonusTemplate.remove();

  const button = document.getElementById('show-div'); //changer bouton
  const hiddenDiv = document.getElementById('timer');

  button.addEventListener('click', () => {
    hiddenDiv.style.display = 'block'; // affiche la div
    setTimeout(() => {
      hiddenDiv.style.display = 'none'; // cache la div après 30 secondes
    }, 30000);
  });

  var timeLeft = 30;
  var elem = document.getElementById('timer');

  var timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      doSomething();
    } else {
      elem.innerHTML = 'Bonus : ' + timeLeft + ' sec. remaining';
      timeLeft--;
    }
  }
});
