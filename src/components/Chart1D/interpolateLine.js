import { linear } from 'everpolate'; // const everpolate = require('everpolate');

const LM = require('ml-levenberg-marquardt');
const _ = require('lodash');

function fixNegatives(line) {
  const temp = _.cloneDeep(line);
  const minY = _.min(temp.y);

  if (minY < 0) {
    temp.y = temp.y.map((el) => {
      const result = el + (-1 * minY);

      if (result === 0) {
        return Number.MIN_VALUE; // this is to prevent errors when log of zero
      }

      return result;
    });
  }

  return temp;
}

/* Shift Curves Function:
    The function takes the entire array of selected data and shifts the curve's data by y+k.
    (the same is applied to the selected data).

    k is the constant to shift a curve's y value

    n is the current iteration of the linear interpolation function above.
        This is to prevent applying a k-shift to post-merged curve data.
*/

function shiftCurves(curves, n, k) {
  const tempCurves = _.cloneDeep(curves);

  for (let i = n, length = tempCurves.length; i < length; i += 1) {
    const tempPair = tempCurves[i];

    for (let j = 0, L = tempPair.length - 1; j < L; j += 1) {
      if (!(i === n && j === 0)) {
        // Shift all data
        tempCurves[i][j][1].y = tempCurves[i][j][1].y.map(el => el + k);

        // Shift selected data
        tempCurves[i][j][2].y = tempCurves[i][j][2].y.map(el => el + k);
      }
    }
  }

  return tempCurves;
}

/* Slice Curve Function:
    The function takes a set of data and selects data depending on the direction and cutoff value.

    Direction is either 'left' or 'right', which is associated with a brush.
    Cutoff is the value to place the condition on.
    Anything left/right of cutoff will not be included.

    The final slice is returned for the ultimate merging of curves.
*/

function sliceCurve(data, direction, cutoff) {
  const temp = { x: [], y: [], error: [] };

  for (let i = 0, len = data.x.length; i < len; i += 1) {
    if (direction === 'right') {
      if (data.x[i] > cutoff) {
        temp.x.push(data.x[i]);
        temp.y.push(data.y[i]);
        temp.error.push(data.error[i]);
      }
    }

    if (direction === 'left') {
      if (data.x[i] < cutoff) {
        temp.x.push(data.x[i]);
        temp.y.push(data.y[i]);
        temp.error.push(data.error[i]);
      }
    }
  }

  return temp;
}

  /* Merge Curves Function:
      Takes three segments and marges the points in order of left to right for segment position.
      The three segments merge into a new curve.
      This function is called at the end of the line interpolation.
  */

function mergeSegs(s1, s2, s3) {
  const merged = { x: [], y: [], error: [] };

  merged.x.push(s1.x);
  merged.x.push(s2.x);
  merged.x.push(s3.x);
  merged.x = _.flatten(merged.x);

  merged.y.push(s1.y);
  merged.y.push(s2.y);
  merged.y.push(s3.y);
  merged.y = _.flatten(merged.y);

  merged.error.push(s1.error);
  merged.error.push(s2.error);
  merged.error.push(s3.error);
  merged.error = _.flatten(merged.error);

  return merged;
}

const interpolate = (() => {
  const my = {};

  my.linear = function (selected) {
    let sel = _.cloneDeep(selected);
    let stitchedLine = null;

    // Fitting/minimization function
    function shift([k]) {
      return y => (y + k);
    }

    /* End of Global private values */

    for (let i = 0, len = sel.length; i < len; i += 1) {
      const base = sel[i][0][2];
      const nonBase = sel[i][1][2];
      const yNonBaseInterpolated = linear(base.x, nonBase.x, nonBase.y);

      // Now let's minimize the difference between: YBase and yNonBaseInterpolated
      const options = {
        damping: 0.001,
        initialValues: [1],
        gradientDifference: 0.1,
        maxIterations: 100,
        errorTolerance: 0.001,
      };

      // Data to fit in the func above
      const data = {
        x: yNonBaseInterpolated,
        y: base.y,
      };

      const fittedParams = LM(data, shift, options);
      const k = fittedParams.parameterValues[0];
      // console.log('** Scaling value: K =', k)
      const yNonBaseScaled = nonBase.y.map(el => el + k);
      // console.log('yNonBaseScaled =', yNonBaseScaled);

      // Final curve:
      // Concatenate and sort the arrays
      const xFinal = base.x.concat(nonBase.x);
      const yFinal = base.y.concat(yNonBaseScaled);
      const eFinal = base.error.concat(nonBase.error);

      // 1) combine the arrays:
      const list = [];
      for (let a = 0, L = xFinal.length; a < L; a += 1) {
        list.push({ x: xFinal[a], y: yFinal[a], error: eFinal[a] });
      }

      // 2) sort:
      list.sort((a, b) => a.x - b.x);

      // 3) separate them back out:
      for (let a = 0, L = list.length; a < L; a += 1) {
        xFinal[a] = list[a].x;
        yFinal[a] = list[a].y;
        eFinal[a] = list[a].error;
      }

      const interpCurve = { x: xFinal, y: yFinal, error: eFinal };

      // First shift all curves for proceeding brushes
      sel = shiftCurves(sel, i, k);

      const seg1 = i ? sliceCurve(stitchedLine, 'left', sel[i][2][0]) : sliceCurve(sel[i][0][1], 'left', sel[i][2][0]);
      const seg2 = interpCurve;
      const seg3 = i ? sliceCurve(sel[i][1][1], 'right', sel[i][2][1]) : sliceCurve(sel[i][1][1], 'right', sel[i][2][1]);

      stitchedLine = mergeSegs(seg1, seg2, seg3);
    }

    /*
      Final step: Check if the line is negative for Y
      If so, find the minimum negative value of y and shifted all up by that value
      If no negative values, proceed as normal
    */
    stitchedLine = fixNegatives(stitchedLine);
    // console.log('Stitched Line:', stitchedLine);

    return stitchedLine;
  };

  return my;
})();

export default interpolate;
