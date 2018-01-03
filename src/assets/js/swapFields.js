import _ from 'lodash';

export default function (data, fields) {
  let tempData = _.cloneDeep(data);

  tempData = tempData.map((point) => {
    // eslint-disable-next-line
    point = _.mapKeys(point, (value, key) => {
      if (fields.x === key) {
        return 'x';
      } else if (fields.y === key) {
        return 'y';
      }

      return key;
    });

    return point;
  });

  return tempData;
}
