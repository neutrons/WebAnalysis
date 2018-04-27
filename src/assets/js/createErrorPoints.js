export default (temp, yField) =>
  temp.map((point) => {
    // if no error present create one and return point
    if (typeof point.error === 'undefined') {
      return {
        ...point,
        error: point[yField] < 0 ? 0 : Math.sqrt(point[yField]),
      };
    }

    return { ...point };
  });
