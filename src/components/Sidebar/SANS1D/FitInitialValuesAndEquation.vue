<template>
    <div>
      <v-subheader class='pl-0'>Fit Equation:</v-subheader>

      <v-text-field
        id='fitEquationInput'
        v-model='equation'
        ref='fitEquation'
        :rules='[validateEquation]'
        required
        @keydown.enter.native='enterEquation($event.target.value)'
        class='ml-2'
     />

     <v-subheader class='pl-0'>Initial Values:</v-subheader>

      <v-text-field
        v-for='(item, index) in initialValues'
        :key='index'
        :label='item.coefficient'
        hint='Edit initial value for fit coefficients'
        v-model.number='item.value'
        @input='inputInitialValues'
        :append-icon='item.constant ? "fa-circle constant" : "fa-circle non-constant"'
        :append-icon-cb='() => toggleConstant(item.constant, index)'
        @keydown.enter.native='inputInitialValues'
        :prepend-icon='isPick ? "cancel" : "fa-crosshairs"'
        :prepend-icon-cb='() => isPick ? togglePick(false, index) : togglePick(true, index)'
        type='number'
        class='ml-2'
      ></v-text-field>

      <v-btn block outline @click='setInitialValues' color='success' :disabled='isFitting'>
        <v-icon left>fa-line-chart</v-icon>
        <span>{{ isFitting ? 'Fitting...' : 'Fit' }}</span>
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

    eventBus.$on('update-initial-value-pick-SANS1D', this.updateInitialValueWithPick);
    eventBus.$on('toggle-picker-icon-SANS1D', () => {
      this.isPick = false;
    });
  },
  data() {
    return {
      equation: '',
      initialValues: {},
      pickIndex: null,
      isPick: false,
    };
  },
  computed: {
    ...mapState('SANS1D', {
      fitEquation: state => state.fitEquation,
      fitInitialValues: state => state.fitInitialValues,
      isFitting: state => state.isFitting,
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
        eventBus.$emit('refit-data-SANS1D');
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

      if (response === true) {
        this.setFitInitialValues(this.initialValues);

        if (this.fitEquation !== this.equation) {
          const filtered = this.filterCoefficients(this.equation);
          const coefficientsToAdd = filtered.filter(el => this.coefficients.indexOf(el) === -1 && el !== 'x' && el !== 'X');
          const coefficientsToRemove = this.coefficients.filter(el => filtered.indexOf(el) === -1 && el !== 'x' && el !== 'X');

          if (coefficientsToAdd.length) this.addFitInitialValue(coefficientsToAdd);
          if (coefficientsToRemove.length) this.removeFitInitialValue(coefficientsToRemove);

          this.updateFitEquation(this.equation);
        }

        eventBus.$emit('refit-data-SANS1D');
      }
    },
    inputInitialValues() {
      eventBus.$emit('revise-fit-line-SANS1D', this.initialValues);
    },
    togglePick(value, index) {
      this.isPick = value;

      if (value) {
        eventBus.$emit('toggle-pick-area-SANS1D', true);
        this.pickIndex = index;
      } else {
        eventBus.$emit('toggle-pick-area-SANS1D', false);
      }
    },
    updateInitialValueWithPick(value) {
      this.initialValues[this.pickIndex].value = +value.toFixed(2);
      this.isPick = false;
      this.pickIndex = null;
      eventBus.$emit('revise-fit-line-SANS1D', this.initialValues);
    },
  },
  watch: {
    fitEquation(n, o) {
      if (n !== o) this.equation = n;
    },
    fitInitialValues(n) {
      this.initialValues = _.cloneDeep(n);
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
