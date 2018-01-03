import math from 'mathjs';
import LM from 'ml-levenberg-marquardt';
import * as _ from 'lodash';
import { eventBus } from '../eventBus';

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
  methods: {
    fitFunction(data, equation, fitsettings) {
      // Code to fit data on the transformed data
      let tempEquation = equation;
      const temp = _.cloneDeep(data);
      const tempData = {
        x: [],
        y: [],
      };

      temp.forEach((d) => {
        tempData.x.push(d.x);
        tempData.y.push(d.y);
      });

      // console.log("temp data:", tempData);

      // First, grab initial values and check for constants and swap them out in equation
      const tempFitSettings = _.cloneDeep(fitsettings);
      // console.log('fit data', fitsettings);

      const initValues = _.cloneDeep(tempFitSettings.initialValues);
      // console.log("INIT VALUES:", initValues);

      initValues.forEach((iv) => {
        if (iv[2]) {
          tempEquation = tempEquation.replace(iv[0], iv[1]);
        }
      });

      // console.log('Equation = ', equation);

      // Second, parse and compile equation
      // Parse the string. We might need some validation here
      const nParsed = math.parse(equation);
      // console.log('nParsed = ', nParsed);

      // need to compile before evaluating
      const nCompiled = nParsed.compile();

      // Getting all variables to fit and remove x!
      const nodesToFit = nParsed.filter(node => node.isSymbolNode && node.name !== 'x');

      let parameterNamesToFit = nodesToFit.map(node => node.name);

      // reduce duplicate coefficients to one unique value
      parameterNamesToFit = _.uniq(parameterNamesToFit);

      // If parameter names is an empty array, then all values are constant
      // Just evaluate with mathjs and return values
      if (parameterNamesToFit.length === 0) {
        const constantFitted = tempData.x.map(el => nCompiled.eval({
          x: el,
        }));

        // console.log('test fitted = ', constantFitted);

        // Since all constants return and don't proceed with rest of function
        return {
          fittedData: fittedPoints(constantFitted, tempData.x),
          error: null,
          paramVals: _.cloneDeep(initValues),
        }; // Return fit data array
      }

      // If not all constants, set up parameters for levenberg-marquardt fitting
      let tempSettings = {};

      tempSettings = {
        damping: tempFitSettings.settings.damping.value,
        gradientDifference: tempFitSettings.settings.gradientDifference.value,
        maxIterations: tempFitSettings.settings.maxIterations.value,
        errorTolerance: tempFitSettings.settings.errorTolerance.value,
        initialValues: tempFitSettings.initialValues,
      };

      // console.log("TEMP SETTINGS:", tempSettings);

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

      for (let i = 0, L = tempSettings.initialValues.length; i < L; i += 1) {
        if (!tempSettings.initialValues[i][2]) {
          tempIV.push(tempSettings.initialValues[i][1]);
        }
      }

      // LM options. We might need to adapt some of these values
      tempSettings.initialValues = tempIV;
      const options = _.cloneDeep(tempSettings);

      // Fitting
      // console.log('Options', options);
      const fittedParams = LM(tempData, fitFunction, options);

      // console.log('Fitted params:', fittedParams);
      // Get's the fitted function from the fitted parameters
      // only coefficients are set! Remember it returns a function!)
      // console.log("fittedParams.parameterValues = ", fittedParams.parameterValues);
      const fitFunctionFitted = fitFunction(fittedParams.parameterValues);

      const yFitted = tempData.x.map(el => fitFunctionFitted(el));

      // console.log('yFitted =', yFitted);

      for (let i = 0, count = 0, L = initValues.length; i < L; i += 1) {
        if (!initValues[i][2]) {
          initValues[i][1] = fittedParams.parameterValues[count];
          count += 1;
        }

        initValues[i][1] = +initValues[i][1].toFixed(4);
      }

      // console.log('Final IV', initValues);
      eventBus.$emit('revise-initial-values', _.cloneDeep(initValues));

      return {
        fittedData: fittedPoints(yFitted, tempData.x),
        error: fittedParams.parameterError,
        paramVals: _.cloneDeep(initValues),
      }; // Return fit data array
    },
  },
};

