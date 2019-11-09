export const calculatePrice = items => {
  return `£${items
    .reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
    .toFixed(2)}`;
};
