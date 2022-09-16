export const numberWithCommas = (x) => {
  if (x === undefined) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
