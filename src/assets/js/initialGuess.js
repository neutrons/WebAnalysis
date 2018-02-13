import math from 'mathjs';
import _ from 'lodash';
import { eventBus } from './eventBus';

/*
    These mixins are to handle fit configurations that have an initial value as a function.
    The functions will need to be processed in mathjs and returned as a single number/float
    in order to be used in the levengerg-marquardt fitting function.
*/

export default {
  methods: {
    getInitialGuesses(value) {
      const temp = _.cloneDeep(value);
      let data;
      let isFirst = false;

      for (let i = 0, L = temp.initialValues.length; i < L; i += 1) {
        if (typeof temp.initialValues[i].value === 'string') {
          if (!isFirst) {
            data = this.structureData();
            isFirst = true;
          }

          temp.initialValues[i].value = this.computeGuess(temp.initialValues[i].value, data);
        }
      }

      return temp;
    },
    computeGuess(expression, data) {
      let result;

      try {
        const code = math.compile(expression);

        result = expression === '' ? 1 : code.eval(data);

        // Catch that result is not an array for cases when user enters 'x+1'
        // Math.JS treats that as operating on an array, so there isn't a reduced value
        if (Array.isArray(result)) {
          // eslint-disable-next-line
          throw 'Function must return a single value, not an array.';
        } else {
          return result;
        }
      } catch (error) {
        // If an error occurs when altering initial values send it to error function
        eventBus.$emit('error-message', error, 'danger');
        return 1;
      }
    },
    structureData() {
      const obj = { x: [], y: [] };

      for (let i = 0, L = this.selectedData.length; i < L; i += 1) {
        const d = this.selectedData[i];
        if (d.filename === this.fileToFit) {
          for (let j = 0, nL = d.dataTransformed.length; j < nL; j += 1) {
            const dt = d.dataTransformed[j];
            obj.x.push(dt.x);
            obj.y.push(dt.y);
          }

          break;
        }
      }

      return obj;
    },
  },
};
