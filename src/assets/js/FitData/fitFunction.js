import math from 'mathjs';
import LM from 'ml-levenberg-marquardt';
import * as _ from 'lodash';
import getTitle from '../getTitle';
// import { eventBus } from '../eventBus';

function fittedPoints(fittedY, tempX) {
  // Return the fitted values
  const FP = [];

  for (let i = 0; i < fittedY.length; i += 1) {
    FP.push({
      x: tempX[i],
      y: fittedY[i],
    });
  }

  return FP;
}

export default {
  mixins: [
    getTitle,
  ],
  computed: {
    equation() {
      return this.$store.state[this.title].fitEquation;
    },
    initialValues() {
      return this.$store.state[this.title].fitInitialValues;
    },
    fitSettings() {
      return this.$store.state[this.title].fitSettings;
    },
  },
  methods: {
    linspace(a, b, n) {
      /*
        Linear Space Function used from Numeric.js
        Author: Sébastien Loisel
        Source: http://www.numericjs.com/
      */
      const min = a;
      const max = b;
      let total = n;

      if (typeof n === 'undefined') total = Math.max(Math.round(max - min) + 1, 1);

      if (total < 2) {
        return n === 1 ? [min] : [];
      }

      const ret = Array(total);

      total -= 1;

      for (let i = total; i >= 0; i -= 1) {
        ret[i] = ((i * max) + ((total - i) * min)) / total;
      }

      return ret;
    },
    fitFunction(data) {
      // Code to fit data on the transformed data
      // console.log('Fitting data', data);
      let tempEquation = this.equation;
      const temp = _.cloneDeep(data);
      const tempData = {
        x: [],
        y: [],
      };

      temp.forEach((d) => {
        tempData.x.push(d.x);
        tempData.y.push(d.y);
      });

      // Generate a linear space for yFitted
      const xMin = Math.min(...tempData.x);
      const xMax = Math.max(...tempData.x);
      const xFit = this.linspace(xMin, xMax, 100);

      // console.log('temp data:', tempData);

      // First, grab initial values and check for constants and swap them out in equation
      // console.log('Init Values:', this.initialValues);

      this.initialValues.forEach((iv) => {
        if (iv.constant) {
          const reg = new RegExp(iv.coefficient, 'g');
          tempEquation = tempEquation.replace(reg, iv.value);
        }
      });

      // console.log('Equation = ', tempEquation);

      // Second, parse and compile equation
      // Parse the string. We might need some validation here
      const nParsed = math.parse(tempEquation);
      // console.log('nParsed = ', nParsed);

      // need to compile before evaluating
      const nCompiled = nParsed.compile();

      // Getting all variables to fit and remove x!
      const nodesToFit = nParsed.filter(node => node.isSymbolNode && node.name !== 'x' && node.name !== 'X');

      let parameterNamesToFit = nodesToFit.map(node => node.name);

      // reduce duplicate coefficients to one unique value
      parameterNamesToFit = _.uniq(parameterNamesToFit);
      // console.log('parameter names to fit', parameterNamesToFit);

      // If parameter names is an empty array, then all values are constant
      // Just evaluate with mathjs and return values
      if (parameterNamesToFit.length === 0) {
        const constantFitted = xFit.map(el => nCompiled.eval({
          x: el,
        }));

        // console.log('test fitted = ', constantFitted);

        // Since all constants return and don't proceed with rest of function
        // Update fit results table values
        this.$store.commit(`${this.title}/updateFitTableResults`, {
          fittedData: fittedPoints(constantFitted, xFit),
          fitError: null,
          iv: _.cloneDeep(this.initialValues),
        });
      } else {
        // If not all constants, set up parameters for levenberg-marquardt fitting
        const tempSettings = {
          damping: this.fitSettings.damping,
          gradientDifference: this.fitSettings.gradientDifference,
          maxIterations: this.fitSettings.maxIterations,
          errorTolerance: this.fitSettings.errorTolerance,
          initialValues: this.initialValues,
        };

        // console.log('TEMP SETTINGS:', tempSettings);
        const fitFunction = ([...args]) => {
          const scope = {};
          // console.log('ARGS', args);

          for (let i = 0; i < args.length; i += 1) {
            scope[parameterNamesToFit[i]] = args[i];
          }

          // console.log("Scope = ", scope);
          return (x) => {
            scope.x = x;
            return nCompiled.eval(scope);
          };
        };

        /* Get Initial Values only */
        const tempIV = [];
        tempSettings.initialValues.forEach((item) => {
          if (!item.constant) tempIV.push(item.value);
        });
        // console.log('Another temp IV', tempIV);

        // LM options. We might need to adapt some of these values
        tempSettings.initialValues = tempIV;
        const options = _.cloneDeep(tempSettings);

        // Fitting
        // console.log('Options', options);
        const fittedParams = LM(tempData, fitFunction, options);

        // console.log('Fitted params:', fittedParams);
        // Get's the fitted function from the fitted parameters
        // only coefficients are set! Remember it returns a function!)
        // console.log('fittedParams.parameterValues = ', fittedParams.parameterValues);
        const fitFunctionFitted = fitFunction(fittedParams.parameterValues);
        const yFitted = xFit.map(el => fitFunctionFitted(el));

        // console.log('yFitted =', yFitted);
        const initValues = _.cloneDeep(this.initialValues);
        for (let i = 0, count = 0, L = initValues.length; i < L; i += 1) {
          if (!initValues[i].constant) {
            initValues[i].value = fittedParams.parameterValues[count];
            count += 1;
          }

          initValues[i].value = +initValues[i].value.toFixed(4);
        }
        // eventBus.$emit(`revise-initial-values-${this.title}`, _.cloneDeep(initValues));

        // console.log('Final IV', initValues);
        // this.$store.commit(`${this.title}/reviseInitialValues`, _.cloneDeep(initValues));
        // eventBus.$emit('revise-initial-values', _.cloneDeep(initValues));

        // Update fit results table values
        this.$store.commit(`${this.title}/updateFitTableResults`, {
          fittedData: fittedPoints(yFitted, xFit),
          fitError: fittedParams.parameterError,
          iv: _.cloneDeep(initValues),
        });
      }
    },
  },
};

