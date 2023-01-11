import './index.css';

const clickerElement = document.getElementById('clicker');
const countElement = document.getElementById('count');
const perSeconds = document.getElementById('per-seconds');

let count = 0;
let clickPerSeconds = 0;

const store = [
  {
    label: 'Bonus',
    count: 0,
    price: 100,
    multiplier: 1,
  },
];

clickerElement.addEventListener('click', () => {
  updateCount(1);
  console.log('click', count);
});

function updateCount(nb) {
  count += nb;
  countElement.innerHTML = count.toFixed(1) + ' cookies';
}

let interval;

document.addEventListener('DOMContentLoaded', () => {
  const bonuses = document.getElementById('bonuses');
  const bonusTemplate = document.getElementById('template-bonus');

  for (const bonus of store) {
    const clone = bonusTemplate.cloneNode(true);

    clone.onclick = () => {
      if (clickPerSeconds === 0) {
        interval = setInterval(() => {
          perSeconds.innerHTML = 'Par secondes: ' + clickPerSeconds;
          updateCount(clickPerSeconds);
        }, 1000);
      }

      clickPerSeconds += bonus.multiplier * 0.1;
    };

    const multiplier = clone.querySelector('.multiplier');
    multiplier.innerHTML = ' Multiplier: x' + bonus.multiplier;

    bonuses.appendChild(clone);
  }

  bonusTemplate.remove();
});
