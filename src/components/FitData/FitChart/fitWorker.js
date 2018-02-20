import _ from 'lodash';
import math from 'mathjs';
import LM from 'ml-levenberg-marquardt';
import linearspace from './linearspace';
import scores from './scores';

function fittedPoints(fittedY, tempX) {
  const FP = [];

  for (let i = 0; i < fittedY.length; i += 1) {
    FP.push({
      x: tempX[i],
      y: fittedY[i],
    });
  }

  return FP;
}

function fittingFunction(data, initialValues, fitSettings, equation) {
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

  // Generate a linear space for yFitted
  const xMin = Math.min(...tempData.x);
  const xMax = Math.max(...tempData.x);
  const xFit = linearspace(xMin, xMax, 100);

  initialValues.forEach((iv) => {
    if (iv.constant) {
      const reg = new RegExp(iv.coefficient, 'g');
      tempEquation = tempEquation.replace(reg, iv.value);
    }
  });

  // Second, parse and compile equation
  // Parse the string. We might need some validation here
  const nParsed = math.parse(tempEquation);

  // need to compile before evaluating
  const nCompiled = nParsed.compile();

  // Getting all variables to fit and remove x!
  const nodesToFit = nParsed.filter(node => node.isSymbolNode && node.name !== 'x' && node.name !== 'X');

  let parameterNamesToFit = nodesToFit.map(node => node.name);

  // reduce duplicate coefficients to one unique value
  parameterNamesToFit = _.uniq(parameterNamesToFit);

  // If parameter names is an empty array, then all values are constant
  // Just evaluate with mathjs and return values
  if (parameterNamesToFit.length === 0) {
    const constantFitted = xFit.map(el => nCompiled.eval({
      x: el,
    }));

    // Since all coefficients are constants
    // return and don't proceed with rest of function
    // Update fit results table values
    return {
      fittedData: fittedPoints(constantFitted, xFit),
      fitError: null,
      iv: _.cloneDeep(initialValues),
      scores: null,
    };
  }

  const tempSettings = {
    damping: fitSettings.damping,
    gradientDifference: fitSettings.gradientDifference,
    maxIterations: fitSettings.maxIterations,
    errorTolerance: fitSettings.errorTolerance,
    initialValues,
  };

  const fitFunction = ([...args]) => {
    const scope = {};

    for (let i = 0; i < args.length; i += 1) {
      scope[parameterNamesToFit[i]] = args[i];
    }

    return (x) => {
      scope.x = x;
      return nCompiled.eval(scope);
    };
  };

  const tempIV = [];
  tempSettings.initialValues.forEach((item) => {
    if (!item.constant) tempIV.push(item.value);
  });

  // LM options. We might need to adapt some of these values
  tempSettings.initialValues = tempIV;
  const options = _.cloneDeep(tempSettings);

  // Fitting
  const fittedParams = LM(tempData, fitFunction, options);

  // Get's the fitted function from the fitted parameters
  // only coefficients are set! Remember it returns a function!)
  const fitFunctionFitted = fitFunction(fittedParams.parameterValues);
  const yFitted = xFit.map(el => fitFunctionFitted(el));
  const initValues = _.cloneDeep(initialValues);
  for (let i = 0, count = 0, L = initValues.length; i < L; i += 1) {
    if (!initValues[i].constant) {
      initValues[i].value = fittedParams.parameterValues[count];
      count += 1;
    }

    initValues[i].value = +initValues[i].value.toFixed(4);
  }

  // print out coefficient scores
  // console.log('scores:', scores(tempData.x, tempData.y, fitFunctionFitted));

  return {
    fittedData: fittedPoints(yFitted, xFit),
    fitError: fittedParams.parameterError,
    iv: _.cloneDeep(initValues),
    scores: scores(tempData.x, tempData.y, fitFunctionFitted),
  };
}


// eslint-disable-next-line
onmessage = function (args) {
  if (args.data === 'Starting') {
    postMessage('MSG received');
  } else {
    try {
      const { data, initialValues, fitSettings, equation } = JSON.parse(args.data);
      const result = fittingFunction(data, initialValues, fitSettings, equation);
      postMessage(JSON.stringify(result));
    } catch (reason) {
      postMessage(reason);
    }
  }
};
