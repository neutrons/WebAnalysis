export default (point, data, fields) => {
  const xField = fields.x;
  const yField = fields.y;
  const name = point.name;
  const x = point[xField];
  const y = point[yField];

  let testData = [];
  for (let i = 0, length = data.length; i < length; i += 1) {
    if (data[i].key === name) {
      testData = data[i].values;

      for (let j = 0, L = testData.length; j < L; j += 1) {
        if (testData[j][xField] === x && testData[j][yField] === y) return j;
      }
    }
  }

  return null;
};
