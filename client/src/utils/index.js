const CART_KEY = "cart";

export const calculatePrice = items => {
  return `£${items
    .reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
    .toFixed(2)}`;
};

export const setCart = (value, cartKey = CART_KEY) => {
  if (localStorage) {
    // check if we actually have access to the local storage
    localStorage.setItem(cartKey, JSON.stringify(value));
  }
};

export const getCart = (cartKey = CART_KEY) => {
  if (localStorage && localStorage.getItem(cartKey)) {
    return JSON.parse(localStorage.getItem(cartKey));
  }
  return [];
};
