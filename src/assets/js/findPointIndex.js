export default (point, data, fields) => {
  // A general function to identify index of a point for a curve
  // It is being used for the point deletion feature.
  const xField = fields.x;
  const yField = fields.y;
  const name = point.name;
  const x = point[xField];
  const y = point[yField];

  let testData = [];

  for (let i = 0, length = data.length; i < length; i += 1) {
    if (data[i].filename === name) {
      testData = data[i].data;

      for (let j = 0, L = testData.length; j < L; j += 1) {
        // if a match return index which will exit out of all loops
        if (testData[j][xField] === x && testData[j][yField] === y) return j;
      }
    }
  }

  return null;
};
