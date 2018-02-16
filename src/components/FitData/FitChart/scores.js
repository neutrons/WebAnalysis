import LM from 'ml-levenberg-marquardt';

/**
 * Return the correlation coefficient of determination (r) and chi-square.
 * From: https://github.com/mljs/regression-base
 */
export default function scores(x, y, func) {
  if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length) {
    throw new Error('x and y must be arrays of the same length');
  }

  const n = x.length;
  const y2 = Array(n);

  for (let i = 0; i < n; i += 1) {
    y2[i] = func(x[i]);
  }

  let xSum = 0;
  let ySum = 0;
  let chi2 = 0;
  let rmsd = 0;
  let xSquared = 0;
  let ySquared = 0;
  let xY = 0;

  for (let i = 0; i < n; i += 1) {
    xSum += y2[i];
    ySum += y[i];
    xSquared += y2[i] * y2[i];
    ySquared += y[i] * y[i];
    xY += y2[i] * y[i];

    if (y[i] !== 0) {
      chi2 += ((y[i] - y2[i]) * (y[i] - y2[i])) / y[i];
    }
    rmsd = (y[i] - y2[i]) * (y[i] - y2[i]);
  }

  const r =
    ((n * xY) - (xSum * ySum)) /
    Math.sqrt(((n * xSquared) - (xSum * xSum)) * ((n * ySquared) - (ySum * ySum)));

  return {
    r,
    chi2,
    r2: r * r,
    rmsd: (rmsd * rmsd) / n,
  };
}
