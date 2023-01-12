import './index.css';

const clickerElement = document.getElementById('clicker');
const totalCountElement = document.getElementById('total');
const countElement = document.getElementById('count');
const perSecondsElement = document.getElementById('per-seconds');

let count = 0;
let clickPerSeconds = 0;
let totalCount = 0;

const store = [
  {
    label: 'Bonus',
    count: 0,
    price: 10,
    multiplier: 1,
    element: null,
  },
];

clickerElement.addEventListener('click', () => {
  updateCount(1);
  updateTotalCount(1);
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

function updatePrice(bonus) {
  const priceElement = bonus.element.querySelector('.price');
  priceElement.innerHTML = 'Price : ' + bonus.price + ' 🍌';
}

function updateMultiplier(bonus) {
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

  if (bonus.price < 50) {
    bonus.price *= 2;
  } else if (bonus.price >= 50 && bonus.price < 200) {
    bonus.price *= 3;
  } else if (bonus.price >= 200) {
    bonus.price *= 4;
  }

  updatePrice(bonus);

  setInterval(() => {
    updateCount(multiplier);
    updateTotalCount(multiplier);
  }, 1000);
}
//fonction pour avoir la durée entre 5 et 10min qui déclanche banane dorée
function randomDuration() {
  return Math.random() * (600000 - 300000) - 300000;
}
//créer la golden banana dans html
var image = document.createElement('img');
image.src = './banane.png';
document.body.appendChild(image);

document.addEventListener('DOMContentLoaded', () => {
  const bonuses = document.getElementById('bonuses');
  const bonusTemplate = document.getElementById('template-bonus');

  for (const bonus of store) {
    const clone = bonusTemplate.cloneNode(true);
    clone.onclick = () => bonusOnClick(bonus);

    bonus.element = clone;

    updatePrice(bonus);
    updateMultiplier(bonus);

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
