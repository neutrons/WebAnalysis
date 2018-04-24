export default (data) => {
  /*
  *  Depending on file plotted we use one of four vcorr file choices:
  *    1) Ge113_IN
  *    2) Ge113_OUT
  *    3) Ge115_IN
  *    4) Ge115_OUT
  *
  *  In order to identify VCorr we use combined values of fields: colltrans & M1
  *  This is found in the plotted curve's data table.
  *
  *  Below are the tests to run:
  *  If column colltrans == 0 => VCorr IN
  *  If column colltrans != 0 => VCorr OUT
  *
  *  If (colltrans != 0 or colltrans != -80 or colltrans != 80)
  *    VCorr OUT but send warning saying colltrans is not -80 nor 80. Assuming VCorr OUT.
  *
  *  If column M1 == 9.45 => VCorr GE113
  *  If column M1 != 9.45 => VCorr GE115
  *
  *  If (M1 != 9.45 or M1 != 0)
  *    VCorr GE115 but send warning saying M1 is not 9.45 nor 0. Assuming VCorr GE115.
  *
  *  The final result will be an object with filename and error status if no matching value.
  */

  // Check if any data, if not don't end function immediately
  if (!data.length) return undefined;

  const m1 = +data[0].m1;
  const colltrans = +data[0].colltrans;

  const result = {
    filename: 'Ge',
    m1Error: false,
    colltransError: false,
  };

  if (m1 === 9.45) {
    result.filename += '_115';
  } else if (m1 === 0) {
    result.filename += '_113';
  } else {
    result.filename += '_115';
    result.m1Error = true;
  }

  if (colltrans === 0) {
    result.filename += '_OUT';
  } else if (colltrans === 80 || colltrans === -80) {
    result.filename += '_IN';
  } else {
    result.filename += '_OUT';
    result.colltransError = true;
  }

  return result;
};
