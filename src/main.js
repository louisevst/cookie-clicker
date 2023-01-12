import './index.css';

const clickerElement = document.getElementById('clicker');
const countElement = document.getElementById('count');
const perSeconds = document.getElementById('per-seconds');
const total = document.getElementById('total');

let count = 0;
let clickPerSeconds = 0;
let totalCount = 0;

const store = [
  {
    label: 'Bonus',
    count: 0,
    price: 10,
    multiplier: 1,
  },
];

clickerElement.addEventListener('click', () => {
  updateCount(1);
  console.log('click', count);
});

function updateCount(nb) {
  count += nb;
  totalCount += nb;
  total.textContent = 'Total: ' + totalCount.toFixed(1);
  countElement.textContent = count.toFixed(0) + ' cookies';
  perSeconds.textContent = 'Par secondes: ' + clickPerSeconds.toFixed(1);
}

document.addEventListener('DOMContentLoaded', () => {
  const bonuses = document.getElementById('bonuses');
  const bonusTemplate = document.getElementById('template-bonus');

  for (const bonus of store) {
    const clone = bonusTemplate.cloneNode(true);

    clone.onclick = () => {
      const multiplier = bonus.multiplier * 0.1;

      if (count < bonus.price) {
        return;
      }

      setInterval(() => {
        updateCount(multiplier);
      }, 1000);

      count -= bonus.price;

      clickPerSeconds += multiplier;
    };

    const multiplier = clone.querySelector('.multiplier');
    multiplier.textContent = ' Multiplier: x' + bonus.multiplier;

    bonuses.appendChild(clone);

    const price = clone.querySelector('.price');
    price.innerHTML = 'Price: ' + bonus.price;
  }

  bonusTemplate.remove();
  //8
  const priceButton = document.getElementById('price');
  let price = 1;
  priceButton.innerHTML = 'Price : ' + price + ' 🍌';

  priceButton.addEventListener('click', () => {
    if (price < 50) {
      price *= 2;
    } else if (price >= 50 && price < 200) {
      price *= 3;
    } else if (price >= 200) {
      price *= 4;
    }
    priceButton.innerHTML = 'Price : ' + price + ' 🍌';
  });
  //fin 8
});
