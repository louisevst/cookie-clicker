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
  countElement.textContent = count.toFixed(0) + ' cookies';
  perSeconds.textContent = 'Par secondes: ' + clickPerSeconds.toFixed(1);
}

document.addEventListener('DOMContentLoaded', () => {
  const bonuses = document.getElementById('bonuses');
  const bonusTemplate = document.getElementById('template-bonus');

  for (const bonus of store) {
    const clone = bonusTemplate.cloneNode(true);

    clone.onclick = () => {
      const count = bonus.multiplier * 0.1;

      setInterval(() => {
        updateCount(count);
      }, 1000);

      clickPerSeconds += count;
    };

    const multiplier = clone.querySelector('.multiplier');
    multiplier.textContent = ' Multiplier: x' + bonus.multiplier;

    bonuses.appendChild(clone);
  }

  bonusTemplate.remove();
});
