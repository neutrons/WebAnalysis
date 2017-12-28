export default {
  Linear: {
    type: 'fit',
    fit: 'Linear',
    equation: '(m*x+b)',
    transformations: {
      x: 'x',
      y: 'y',
    },
    yLabel: 'y',
    xLabel: 'x',
    note: '',
    initialValues: [
      ['m', 1, false],
      ['b', 1, false],
    ],
  },
  Gaussian: {
    type: 'fit',
    /*
    Gaussian function:
    f(x) = a*exp(-(x-x0)**2/(2*sigma**2))+c

    Initial guess:
    n = len(x)
    mean = sum(x*y)/sum(y)
    sigma = sqrt(abs(sum((x-mean)**2*y)/sum(y)))
    a, x0, sigma, c = -max(y), mean, sigma, min(x)+((max(x)-min(x)))/2
    */
    fit: 'Gaussian',
    equation: `(A*exp(${(-4 * Math.log(2)).toFixed(3)}*(x-center)^2/fwhm^2))`,
    transformations: {
      x: 'x',
      y: 'y',
    },
    yLabel: 'y',
    xLabel: 'x',
    note: '',
    initialValues: [
      ['A', 'max(y) - min(y)', false],
      ['center', 'sum(x*y)/sum(y)', false],
      ['fwhm', `sqrt(abs( sum( (x-(sum(x*y)/sum(y))) * (x-(sum(x*y)/sum(y))) * y)/sum(y) )) * ${(Math.sqrt(8 * Math.log(2))).toFixed(3)}`, false],
    ],
  },
  Lorentzian: {
    type: 'fit',
    fit: 'Lorentzian',
    equation: '(A * ((fwhm/2) / ((x-center)^2 + (fwhm/2)^2)))',
    transformations: {
      x: 'x',
      y: 'y',
    },
    yLabel: 'y',
    xLabel: 'x',
    note: '',
    initialValues: [
      ['A', 'max(y) - min(y)', false],
      ['fwhm', `sqrt(abs( sum( (x-(sum(x*y)/sum(y))) * (x-(sum(x*y)/sum(y))) * y)/sum(y) )) * ${(Math.sqrt(8 * Math.log(2))).toFixed(3)}`, false],
      ['center', 'sum(x*y)/sum(y)', false],
    ],
  },
};
