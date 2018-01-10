<template>
<v-container v-if='isFitted'>
  <v-subheader class='pl-0'>Fit Results:</v-subheader>
  <v-layout row wrap>
    <v-flex xs12 sm3 pa-1><b>Fit File:</b> {{fileToFit}}</v-flex>
    <v-flex xs12 sm2 pa-1><b>Fit Type:</b> {{fitType}}</v-flex>
    <v-flex xs12 sm2 pa-1><b>No. Points:</b> {{fitCount}}</v-flex>
    <v-flex xs12 sm3 pa-1><b>Fit Range:</b> ({{fitRange[0]}}, {{fitRange[1]}})</v-flex>
    <v-flex xs12 sm2 pa-1><b>Fit Error:</b> {{fitError}}</v-flex>
    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 sm4 pa-1><b>Fit Configuration:</b>
      <p class='pl-3 mb-1'>Damping: {{damping}}</p>
      <p class='pl-3 mb-1'>No. Iterations: {{maxIterations}}</p>
      <p class='pl-3 mb-1'>Error Tolerance: {{errorTolerance}}</p>
      <p class='pl-3 mb-1'>Gradient Difference: {{gradientDifference}}</p>
    </v-flex>
    <v-flex xs12 sm4 pa-1><b>Coefficients:</b>
      <p v-for='(item, index) in initialValues' :key='index' class='pl-3 mb-1'>
        {{formatInitialValues(item)}}
      </p>
    </v-flex>
    <v-flex xs12 sm4 pa-1><b>Note:</b> {{fitNote}}</v-flex>
    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import * as d3 from 'd3';
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'FitResultsTable',
  mixins: [
    getTitle,
  ],
  props: {
    xScale: {
      type: Function,
    },
  },
  computed: {
    isFitted() {
      return this.fileToFit !== null;
    },
    fileToFit() {
      return this.$store.state[this.title].fileToFit;
    },
    fitType() {
      return this.$store.state[this.title].fitType;
    },
    fittedData() {
      return this.$store.state[this.title].fittedData;
    },
    fitCount() {
      return this.fittedData.length;
    },
    fitRange() {
      if (this.fitCount === 0) return [0, 0];
      return d3.extent(this.fittedData, d => d.x).map(d => d.toExponential(2));
    },
    fitError() {
      return (this.$store.state[this.title].fitError === null ||
        this.$store.state[this.title].fitError === undefined) ?
          'Not Available' :
          this.$store.state[this.title].fitError.toExponential(2);
    },
    fitSettings() {
      return this.$store.state[this.title].fitSettings;
    },
    damping() {
      return this.fitSettings.damping;
    },
    maxIterations() {
      return this.fitSettings.maxIterations;
    },
    errorTolerance() {
      return this.fitSettings.errorTolerance;
    },
    gradientDifference() {
      return this.fitSettings.gradientDifference;
    },
    initialValues() {
      return this.$store.state[this.title].fitInitialValues;
    },
    fitNote() {
      return this.$store.state[this.title].fitNote;
    },
    xBrushSelection() {
      return this.$store.state[this.title].brushSelection[1];
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
  },
};
</script>

<style lang='scss' scoped>
</style>