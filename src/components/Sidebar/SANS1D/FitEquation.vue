<template>
    <!-- <v-text-field
      v-model='equation'
      @keydown.enter.native='enterEquation($event.target.value)'
    ></v-text-field> -->

    <v-text-field
      v-model='equation'
      ref='fitEquation'
      :rules='[validateEquation]'
      required
      @keydown.enter.native='enterEquation($event.target.value)'
     />
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import math from 'mathjs';

export default {
  name: 'FitEquation',
  created() {
    this.setFitEquation();
    this.equation = this.fitEquation;
  },
  data() {
    return {
      equation: '',
    };
  },
  computed: {
    ...mapState('SANS1D', {
      fitEquation: state => state.fitEquation,
      fitInitialValues: state => state.fitInitialValues,
    }),
    coefficients() {
      return this.fitInitialValues.map(el => el.coefficient);
    },
  },
  methods: {
    ...mapMutations('SANS1D', [
      'setFitEquation',
      'addFitInitialValue',
      'updateFitEquation',
    ]),
    enterEquation(value) {
      const response = this.validateEntry(this.equation);
      console.log('enter equation', value, this.equation);
      if (response === true && this.fitEquation !== value) {
        const filtered = this.filterCoefficients(this.equation);
        const coefficientsToAdd = filtered.filter(el => this.coefficients.indexOf(el) === -1 && el !== 'x' && el !== 'X');
        this.addFitInitialValue(coefficientsToAdd);
        this.updateFitEquation(this.equation);
      }
    },
    validateEquation(expression) {
      return this.validateEntry(expression);
    },
    validateEntry(entry) {
      try {
        const filtered = this.filterCoefficients(entry);
        const scope = {};
        // eslint-disable-next-line
        filtered.forEach(el => {
          scope[el] = 1;
        });

        // throw an error if y is in the equation
        if (filtered.indexOf('y') !== -1 || filtered.indexOf('Y') !== -1) throw new Error('Cannot use y in the equation.');

        // throw error if equation cannot evaluate
        math.eval(entry, scope);

        return true;
      } catch (reason) {
        return reason.message;
      }
    },
    filterCoefficients(entry) {
      const nodes = math.parse(entry);
      const filtered = nodes.filter(node => node.isSymbolNode).map(node => node.name);

      return filtered;
    },
  },
  watch: {
    fitEquation(n, o) {
      if (n !== o) this.equation = n;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
