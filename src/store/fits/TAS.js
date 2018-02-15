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
    title: 'Lorentzian',
    equation: '(A * ((fwhm/2) / ((x-center)^2 + (fwhm/2)^2)))',
    initialValues: [
      { coefficient: 'A', value: 'max(y) - min(y)', constant: false },
      { coefficient: 'fwhm',
        value: 'sqrt(abs(sum(dotMultiply(dotPow((x - sum(dotMultiply(x, y)) / sum(y)), 2), y)) / sum(y)))',
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
  'Lorentzian^2': {
    title: 'Lorentzian^2',
    equation: 'A * ((fwhm / 2) / ((x - center)^2 + (fwhm / 2)^2))^2',
    initialValues: [
      { coefficient: 'A', value: 'max(y) - min(y)', constant: false },
      { coefficient: 'fwhm',
        value: 'sqrt(abs(sum(dotMultiply(dotPow((x - sum(dotMultiply(x, y)) / sum(y)), 2), y)) / sum(y)))',
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
