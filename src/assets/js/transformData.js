import math from 'mathjs';
import * as _ from 'lodash';

export default function (data, transformations, fields) {
  const tempData = _.cloneDeep(data);
  const xField = fields.x;
  const yField = fields.y;

  const exp = {
    x: transformations.x,
    y: transformations.y,
    error: transformations.error,
  };

  tempData.forEach((el) => {
    const scope = {
      x: el[xField],
      y: el[yField],
      error: el.error,
    };

    /* eslint-disable */
    el[xField] = math.eval(exp.x, scope);
    el[yField] = math.eval(exp.y, scope);
    el.error = math.eval(exp.error, scope);
    /* eslint-enable */
  });

  return tempData;
}
