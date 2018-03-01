<template>
<v-container pt-0>
  <v-layout row wrap>
    <v-flex xs12 v-if='allowExport'>
      <v-tooltip top :close-delay='1'>
        <v-btn slot='activator' outline flat @click='downloadFitEquation' color='success'>
          <v-icon :left='!isBreakpointSmall'>file_download</v-icon>
          <span class='hidden-md-and-down'>Results</span>
        </v-btn>
        <span>Click to export fit results to .csv file</span>
      </v-tooltip>
    </v-flex>
    <v-flex md12 lg3 pa-1><b>Fit File:</b> {{fileToFit}}</v-flex>
    <v-flex md12 lg2 pa-1><b>Fit Type:</b> {{fitType}}</v-flex>
    <v-flex md12 lg2 pa-1><b>No. Points:</b> {{fitCount}}</v-flex>
    <v-flex md12 lg3 pa-1><b>Fit Range:</b> ({{fitRange[0]}}, {{fitRange[1]}})</v-flex>
    <v-flex md12 lg2 pa-1><b>Fit Error:</b> {{fitError}}</v-flex>
    <v-flex xs12 mb-1>
      <v-divider></v-divider>
    </v-flex>

    <v-layout row wrap v-if='fitScores'>
      <v-flex md12 lg1 pa-1><b>Fit Scores:</b> </v-flex>
      <v-flex md12 lg2 pa-1><b>R:</b> {{fitScores.r.toFixed(3)}}</v-flex>
      <v-flex md12 lg3 pa-1><b>R^2:</b> {{fitScores.r2.toFixed(3)}}</v-flex>
      <v-flex md12 lg3 pa-1><b>RMSD:</b> {{fitScores.rmsd.toFixed(3)}}</v-flex>
      <v-flex md12 lg3 pa-1><b>Chi^2:</b> {{fitScores.chi2.toFixed(3)}}</v-flex>
      </v-layout>

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
      const headers = `fit type,no. points,range start,range end,fit error,R,R2,RMSD,CHI2,equation,${this.initialValues.map(d => d.coefficient)}\n`;
      const arr = [[
        this.fitType,
        this.fitCount,
        ...this.fitRange,
        this.fitError,
        this.fitScores.r,
        this.fitScores.r2,
        this.fitScores.rmsd,
        this.fitScores.chi2,
        this.fitEquation,
        ...this.initialValues.map(d => d.value),
      ]];

      const filename = `${this.fileToFit}_fit_results.csv` || 'fit_results.csv';
      this.downloadCSV(arr, headers, filename);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>