import './index.css';

const clickerElement = document.getElementById('clicker');
const totalCountElement = document.getElementById('total');
const countElement = document.getElementById('count');
const perSecondsElement = document.getElementById('per-seconds');
const timerElement = document.getElementById('timer');
const nameElement = document.getElementById('name');

let count = 0;
let clickPerSeconds = 0;
let totalCount = 0;
let hasBoost = false;

const store = [
  {
    label: 'Leonardo',
    count: 0,
    price: 1,
    multiplier: 1,
    src: './bonus-1.svg',
  },
  {
    label: 'Raphaël',
    count: 0,
    price: 10,
    multiplier: 5,
    src: './bonus-2.svg',
  },
  {
    label: 'Donatello',
    count: 0,
    price: 100,
    multiplier: 10,
    src: './bonus-3.svg',
  },
  {
    label: 'Michelangelo',
    count: 0,
    price: 1000,
    multiplier: 25,
    src: './bonus-4.svg',
  },
  {
    label: 'Splinter',
    count: 0,
    price: 10000,
    multiplier: 50,
    src: './bonus-5.svg',
  },
  {
    label: 'Shredder',
    count: 0,
    price: 100000,
    multiplier: 75,
    src: './bonus-6.svg',
  },
  {
    label: 'Krang',
    count: 0,
    price: 1000000,
    multiplier: 100,
    src: './bonus-7.svg',
  },
  // {
  //   label: 'Splinter',
  //   count: 0,
  //   price: 10000000,
  //   multiplier: 250,
  //   src: './bonus-.svg',
  // },
  // {
  //   label: 'Splinter',
  //   count: 0,
  //   price: 10000000,
  //   multiplier: 500,
  //   src: './bonus-.svg',
  // },
  // {
  //   label: 'Splinter',
  //   count: 0,
  //   price: 100000000,
  //   multiplier: 1000,
  //   src: './bonus-.svg',
  // },
];

const ninjaName1 = [
  'Silent',
  'Big',
  'Sad',
  'Dark',
  'Agile',
  'Fragile',
  'Dumb',
  'Dead',
  'Ghost',
  'Snake',
  'Mysterious',
  'Clumsy',
  'Hollow',
  'Iron',
  'Golden',
  'Gracefull',
  'Invisible',
];
const ninjaName2 = [
  'Killer',
  'Soldier',
  'Assassin',
  'Demon',
  'Hunter',
  'Spider',
  'Bullet',
  'Buildozer',
  'Stalker',
  'Samaritan',
  'Ninja',
  'Thunder',
  'Wolf',
];
function getNinjaName() {
  var num1 = Math.round(Math.random() * (ninjaName1.length - 1));
  var num2 = Math.round(Math.random() * (ninjaName2.length - 1));
  nameElement.innerHTML = `${ninjaName1[num1]} ${ninjaName2[num2]}`;
}
clickerElement.addEventListener('click', () => {
  const amount = hasBoost ? 2 : 1;
  updateCount(amount);
  updateTotalCount(amount);
  console.log('click', count);
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
    console.log(hasBoost);
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
  }, 5 * 1000);

  image.onclick = function () {
    var timeLeft = 30;

    var timerId = setInterval(countdown, 1000);

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
    }, 30 * 1000);
  };
}

//function qui appelle la golden banana
function shuriken() {
  setTimeout(() => {
    createShuriken();
    shuriken();
  }, randomDuration());
}

document.addEventListener('DOMContentLoaded', () => {
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
