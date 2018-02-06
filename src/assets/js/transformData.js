import math from 'mathjs';
import * as _ from 'lodash';

export default function (data, transformations) {
  const trans = _.cloneDeep(transformations);
  const t = _.cloneDeep(data);

  // console.log('Transforming your data', trans, t);
  // First swap x,y for field names
  const transKeys = Object.keys(trans);

  // Then get transformations
  const exp = [];
  transKeys.forEach((el) => {
    exp.push(trans[el]);
  });

  t.forEach((el) => {
    // Re-assign the transformed data to x and y
    // math.eval returns an array of transformed [x,y] values
    // so d.x = math.eval()[0], d.y = math.eval()[1]
    // [el.x, el.y, el.e] = math.eval(exp, el);

    const [k0, k1, k2] = [...transKeys];

    // eslint-disable-next-line
    [el[k0], el[k1], el[k2]] = math.eval(exp, el);
  });

  return t; // returns transformed data array
}
