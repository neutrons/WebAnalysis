<template>
<v-container pt-0>
  <v-layout row wrap>
    <v-flex xs12 v-if='allowExport'>
      <v-btn outline flat @click='downloadFitEquation' color='success'>
        <v-icon :left='!isBreakpointSmall'>file_download</v-icon>
        <span class='hidden-md-and-down'>Fit Equation</span>
      </v-btn>
    </v-flex>
    <v-flex md12 lg3 pa-1><b>Fit File:</b> {{fileToFit}}</v-flex>
    <v-flex md12 lg2 pa-1><b>Fit Type:</b> {{fitType}}</v-flex>
    <v-flex md12 lg2 pa-1><b>No. Points:</b> {{fitCount}}</v-flex>
    <v-flex md12 lg3 pa-1><b>Fit Range:</b> ({{fitRange[0]}}, {{fitRange[1]}})</v-flex>
    <v-flex md12 lg2 pa-1><b>Fit Error:</b> {{fitError}}</v-flex>
    <v-flex xs12 mb-1>
      <v-divider></v-divider>
    </v-flex>

    <v-flex xs12 pa-1>
      <b>Fit Equation:</b> <i>{{ fitEquation }}</i></p>
    </v-flex>

    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
    <v-flex sm12 md4 pa-1><b>Fit Configuration:</b>
      <p class='pl-3 mb-1'>Damping: {{damping}}</p>
      <p class='pl-3 mb-1'>No. Iterations: {{maxIterations}}</p>
      <p class='pl-3 mb-1'>Error Tolerance: {{errorTolerance}}</p>
      <p class='pl-3 mb-1'>Gradient Difference: {{gradientDifference}}</p>
    </v-flex>
    <v-flex sm12 md4 pa-1><b>Coefficients:</b>
      <p v-for='(item, index) in initialValues' :key='index' class='pl-3 mb-1'>
        {{formatInitialValues(item)}}
      </p>
    </v-flex>
    <v-flex sm12 md4 pa-1><b>Note:</b> {{fitNote}}</v-flex>
    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import downloadCSV from '../../assets/js/downloadCSV';
import isBreakpointSmall from '../../assets/js/isBreakpointSmall';

export default {
  name: 'FitResultsTable',
  mixins: [
    downloadCSV,
    isBreakpointSmall,
  ],
  props: {
    xScale: {
      type: Function,
    },
    allowExport: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    formatInitialValues(item) {
      if (this.fitType === 'Guinier' && item.coefficient === 'Rg') {
        const RgX = item.value * Math.sqrt(this.xScale.invert(this.xBrushSelection));
        return `${item.coefficient}: ${item.value} | Rg * x_max = ${RgX}`;
      }

      return `${item.coefficient}: ${item.value}`;
    },
    downloadFitEquation() {
      const headers = `equation, ${this.fitEquation}\n`;
      // eslint-disable-next-line
      const arr = this.initialValues.map((iv) => {
        return [iv.coefficient, iv.value];
      });
      const filename = `${this.fileToFit}_fit_equation.csv` || 'fitted_equation.csv';

      this.downloadCSV(arr, headers, filename);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>