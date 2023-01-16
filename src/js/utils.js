const baseValueRounded = (price) => {
  const digits = Math.pow(10, Math.ceil(Math.log(Math.ceil(price)) / Math.LN10)) / 100;
  return Math.round(price / digits) * digits;
};

// calculate price with algorithm

const getBasePrice = (id) => {
  let price = id + 9;
  if (id >= 5) {
    price += Math.pow(id - 5, 1.75) * 5;
  }
  price *= Math.pow(10, id);
  price *= Math.max(1, id - 14);
  return price;
};

export const calculatePrice = (id, count) => {
  const basePrice = getBasePrice(id);
  const priceRounded = baseValueRounded(basePrice);
  return Math.ceil(priceRounded * Math.pow(1.15, Math.max(0, count)));
};

// calculate CPS (per seconds) with algorithm

const getBaseCps = (id) => {
  if (id === 0) {
    id = 0.1;
  }
  return Math.ceil(Math.pow(id * 1, id * 0.5 + 2) * 10) / 10;
};

export const calculateCps = (id) => {
  const baseCps = getBaseCps(id);
  const cpsRounded = baseValueRounded(baseCps);
  return Math.round(baseCps / cpsRounded) * cpsRounded;
};

// misc

export const roundDecimalNumber = (number) => {
  return +number.toFixed(1);
};
