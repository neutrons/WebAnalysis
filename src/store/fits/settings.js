// leveberg-marquardt default settings for fit settings component
export default {
  damping: {
    value: 0.1,
    min: 0.1,
    max: 10,
    increment: 0.1,
  },
  gradientDifference: {
    value: 0.1,
    min: 0.1,
    max: 1,
    increment: 0.1,
  },
  maxIterations: {
    value: 100,
    min: 10,
    max: 1000,
    increment: 10,
  },
  errorTolerance: {
    value: 0.1,
    min: 0.1,
    max: 1,
    increment: 0.1,
  },
};
