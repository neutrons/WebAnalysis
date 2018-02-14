export default {
  Linear: {
    title: 'Linear',
    equation: '(m*x+b)',
    initialValues: [
      { coefficient: 'm', value: 1, constant: false },
      { coefficient: 'b', value: 1, constant: false },
    ],
    transformations: {
      x: 'x',
      y: 'y',
      error: 'error',
    },
    yLabel: 'y',
    xLabel: 'x',
    note: '',
  },
  Gaussian: {
    title: 'Gaussian',
    equation: `(A*exp(${(-4 * Math.log(2)).toFixed(3)}*(x-center)^2/fwhm^2))`,
    initialValues: [
      { coefficient: 'A', value: 'max(y) - min(y)', constant: false },
      { coefficient: 'center', value: 'sum(dotMultiply(x, y)) / sum(y)', constant: false },
      { coefficient: 'fwhm',
        value: `sqrt(abs(sum(dotMultiply(dotPow(x - (sum(dotMultiply(x, y)) / sum(y)), 2), y))/ sum(y))) * ${Math.sqrt(8 * Math.log(2))}`,
        constant: false,
      },
    ],
    transformations: {
      x: 'x',
      y: 'y',
      error: 'error',
    },
    yLabel: 'y',
    xLabel: 'x',
    note: '',
  },
  Lorentzian: {
    /*
      Initial Guess for  A, center, fwhm from the y_noise!
      A = np.max(y_noise) - np.min(y_noise)
      center = np.sum(x*y_noise)/np.sum(y_noise)
      sigma = np.sqrt(np.abs(
          np.sum((x-center)**2 * y_noise)/np.sum(y_noise)
      ))
      fwhm = 2 * sigma
    */
    title: 'Lorentzian',
    equation: '(A * ((fwhm/2) / ((x-center)^2 + (fwhm/2)^2)))',
    initialValues: [
      { coefficient: 'A', value: 'max(y) - min(y)', constant: false },
      { coefficient: 'fwhm',
        value: '2 * sqrt(abs(sum(dotMultiply(dotPow((x - sum(dotMultiply(x, y)) / sum(y)), 2), y)) / sum(y)))',
        constant: false,
      },
      { coefficient: 'center', value: 'sum(dotMultiply(x, y)) / sum(y)', constant: false },
    ],
    transformations: {
      x: 'x',
      y: 'y',
      error: 'error',
    },
    yLabel: 'y',
    xLabel: 'x',
    note: '',
  },
};
