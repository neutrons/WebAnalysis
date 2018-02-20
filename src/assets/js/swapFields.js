import _ from 'lodash';

export default function (data, fields) {
  let tempData = _.cloneDeep(data);

  tempData = tempData.map((point) => {
    const nObj = Object.assign({}, point);

    nObj.x = nObj[fields.x];
    nObj.y = nObj[fields.y];
    // Set up error points - SQRT(y)
    nObj.error = nObj.y < 0 ? 0 : Math.sqrt(nObj.y);

    delete nObj[fields.x];
    delete nObj[fields.y];

    return nObj;
  });

  return tempData;
}
