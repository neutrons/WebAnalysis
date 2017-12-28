/* Code to Transform Data Points Based on the Curve Fitting Chosen */
import math from 'mathjs';
import LM from 'ml-levenberg-marquardt';
import * as _ from 'lodash';
import { eventBus } from '../eventBus';

const fd = {};

fd.isSymbols = (expression) => {
  // Function to check that user did not enter a transformation that doesn't include 'x' or 'y'
  // E.g. x*2+c would throw an error
  let result = 0;

  // console.log("Expression", expression);
  // Mathjs to parse each transformation into a node
  const nodeParsed = math.parse(expression);
  // console.log("Parsed Nodes", node_parsed);

  nodeParsed.forEach((el) => {
    const t = el.filter(n => n.isSymbolNode);

    t.forEach((item) => {
      result += (item.name !== 'y' && el.name !== 'x');
    });
  });

  // console.log("result", result);
  return result > 0;
};

fd.transformData = (data, transformations, fields = {
  x: 'x',
  y: 'y',
}) => {
  const trans = _.cloneDeep(transformations);
  // Need to make a temp value of data, so as to not alter the original values
  // This is passing a value rather than a reference (using lodash to handle the cloning)
  // References:
  // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
  // https://stackoverflow.com/questions/7574054/javascript-how-to-pass-object-by-value
  const t = _.cloneDeep(data);

  console.log('Transforming your data', trans, t);
  // First swap x,y for field names
  let transKeys = Object.keys(trans);
  const fieldKeys = Object.keys(fields);

  fieldKeys.forEach((el) => {
    if (trans[el] !== undefined) {
      const re = new RegExp(el, 'g');
      trans[fields[el]] = trans[el].replace(re, fields[el]);

      // if field key is not a transformation key, delete transform key
      if (transKeys.indexOf(fields[el]) < 0) {
        // console.log(`delete ${key} from transformations.`)
        delete trans[el];
      }
    }
  });

  // Then get transformations
  const exp = [];
  transKeys.forEach((el) => {
    exp.push(trans[el]);
  });

  transKeys = Object.keys(trans);

  t.forEach((el) => {
    // Re-assign the transformed data to x and y
    // math.eval returns an array of transformed [x,y] values
    // so d.x = math.eval()[0], d.y = math.eval()[1]
    //[el.x, el.y, el.e] = math.eval(exp, el);

    const [k0, k1, k2] = [...transKeys];

    // eslint-disable-next-line
    [el[k0], el[k1], el[k2]] = math.eval(exp, el);
  });

  return t; // returns transformed data array
};

fd.fitData = (data, equation, fitsettings) => {
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
    const constantFitted = tempData.x.map(el => nCompiled.eval({ x: el }));

    // console.log('test fitted = ', constantFitted);

    // Since all constants return and don't proceed with rest of function
    return {
      fittedData: fd.fittedPoints(constantFitted, tempData.x),
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
    fittedData: fd.fittedPoints(yFitted, tempData.x),
    error: fittedParams.parameterError,
    paramVals: _.cloneDeep(initValues),
  }; // Return fit data array
};

fd.fittedPoints = (fittedY, tempX) => {
  // Return the fitted values
  const fittedPoints = [];

  for (let i = 0; i < fittedY.length; i += 1) {
    fittedPoints.push({
      x: tempX[i],
      y: fittedY[i],
    });
  }

  return fittedPoints;
};

export default fd;
