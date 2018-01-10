export default function (d, yType, y) {
  if (d.y - d.error < 0 && yType === 'Log(Y)') {
    return y(d.y);
  }

  return y(d.y - d.error);
}
