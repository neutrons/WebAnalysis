<template>
    <div>
      <v-subheader class='pl-0 green--text darken-4'>Fit Equation:</v-subheader>

      <v-text-field
        id='fitEquationInput'
        v-model='equation'
        ref='fitEquation'
        :rules='[validateEquation]'
        required
        @keydown.enter.native='enterEquation($event.target.value)'
        class='ml-2'
     />

     <v-subheader class='pl-0 green--text darken-4'>Initial Values:</v-subheader>

      <v-text-field
        v-for='(item, index) in initialValues'
        :key='index'
        :label='item.coefficient'
        hint='Edit initial value for fit coefficients'
        v-model.number='item.value'
        :append-icon='item.constant ? "fa-circle constant" : "fa-circle non-constant"'
        :append-icon-cb='() => toggleConstant(item.constant, index)'
        type='number'
        class='ml-2'
      ></v-text-field>

      <v-btn block outline @click='setInitialValues' color='green darken-1 white--text'>
        <v-icon left>fa-line-chart</v-icon> Re-fit
      </v-btn>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import _ from 'lodash';
import math from 'mathjs';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FitInitialValuesAndEquation',
  created() {
    this.setFitEquation();
    this.equation = this.fitEquation;

    this.setFitInitialValues();
    this.initialValues = _.cloneDeep(this.fitInitialValues);
    eventBus.$on('revise-initial-values', this.reviseInitialValues);
  },
  data() {
    return {
      equation: '',
      initialValues: {},
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
      'removeFitInitialValue',
      'updateFitEquation',
      'setFitInitialValues',
    ]),
    enterEquation() {
      const response = this.validateEntry(this.equation);

      if (response === true && this.fitEquation !== this.equation) {
        const filtered = this.filterCoefficients(this.equation);
        const coefficientsToAdd = filtered.filter(el => this.coefficients.indexOf(el) === -1 && el !== 'x' && el !== 'X');
        const coefficientsToRemove = this.coefficients.filter(el => filtered.indexOf(el) === -1 && el !== 'x' && el !== 'X');

        if (coefficientsToAdd.length) this.addFitInitialValue(coefficientsToAdd);
        if (coefficientsToRemove.length) this.removeFitInitialValue(coefficientsToRemove);

        this.updateFitEquation(this.equation);
        eventBus.$emit('refit-data');
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
    toggleConstant(value, index) {
      this.initialValues[index].constant = !value;
    },
    setInitialValues() {
      const response = this.validateEntry(this.equation);

      if (!_.isEqual(this.initialValues, this.fitInitialValues) && response === true) {
        this.setFitInitialValues(this.initialValues);

        if (this.fitEquation !== this.equation) {
          const filtered = this.filterCoefficients(this.equation);
          const coefficientsToAdd = filtered.filter(el => this.coefficients.indexOf(el) === -1 && el !== 'x' && el !== 'X');
          const coefficientsToRemove = this.coefficients.filter(el => filtered.indexOf(el) === -1 && el !== 'x' && el !== 'X');

          if (coefficientsToAdd.length) this.addFitInitialValue(coefficientsToAdd);
          if (coefficientsToRemove.length) this.removeFitInitialValue(coefficientsToRemove);

          this.updateFitEquation(this.equation);
        }

        eventBus.$emit('refit-data');
      }
    },
    reviseInitialValues(value) {
      this.initialValues = value;
    },
  },
  watch: {
    fitEquation(n, o) {
      if (n !== o) this.equation = n;
    },
  },
};
</script>

<style lang='scss'>
.fa-circle.non-constant {
  color: green !important;
  font-size: 100%;
}

.fa-circle.constant {
  color: brown !important;
  font-size: 100%;
}
</style>
