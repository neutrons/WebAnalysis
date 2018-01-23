import _ from 'lodash';

export default function (data, fields) {
  let tempData = _.cloneDeep(data);

  tempData = tempData.map((point) => {
    const nObj = Object.assign({}, point);

    nObj.x = nObj[fields.x];
    nObj.y = nObj[fields.y];
    if (fields.x !== 'error') delete nObj[fields.x];
    if (fields.y !== 'error') delete nObj[fields.y];

    return nObj;
  });

  return tempData;
}
