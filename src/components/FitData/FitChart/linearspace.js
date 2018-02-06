export default function (a, b, n) {
  /*
    Linear Space Function used from Numeric.js
    Author: Sébastien Loisel
    Source: http://www.numericjs.com/
  */
  const min = a;
  const max = b;
  let total = n;

  if (typeof n === 'undefined') total = Math.max(Math.round(max - min) + 1, 1);

  if (total < 2) {
    return n === 1 ? [min] : [];
  }

  const ret = Array(total);

  total -= 1;

  for (let i = total; i >= 0; i -= 1) {
    ret[i] = ((i * max) + ((total - i) * min)) / total;
  }

  return ret;
}
