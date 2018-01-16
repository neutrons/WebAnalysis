<template>
<div>
  <v-layout row wrap v-for='(s, index) in selected' :key='index'>

    <v-flex xs2>
      <v-btn flat outline icon color='green' v-if='index === 0' @click='addNewEquation'>
        <v-icon>fa-plus</v-icon>
      </v-btn>

      <v-btn outline @click='removeEquation(index)' flat icon color='red' v-else>
        <v-icon>fa-times</v-icon>
      </v-btn>
    </v-flex>

    <v-flex xs10>
      <v-select :items='fitNames' :value='s.title' @input='updateSelected($event, index)' label='Fit'
      ></v-select>
    </v-flex>

    <v-flex xs12 pl-2>
      <v-text-field :value='s.equation' disabled class='pt-0'
      ></v-text-field>
    </v-flex>

    <v-flex xs12 mb-2>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>

  <v-flex xs12>
    <v-subheader class='pl-0 green--text darken-4'>Initial Values:</v-subheader>
  </v-flex>

  <v-layout row wrap v-for='(select, selectedIndex) in selected'>
    <v-flex xs12 pl-2>
      <v-text-field
        v-for='(iv, ivIndex) in select.initialValues'
        :label='iv.coefficient'
        hint='Edit initial value for fit coefficients'
        v-model.number='iv.value'
        :append-icon='iv.constant ? "fa-circle constant" : "fa-circle non-constant"'
        :append-icon-cb='() => iv.constant = !iv.constant'
        @keydown.enter.native='refit'
        type='number'
      ></v-text-field>
    </v-flex>
  </v-layout>

  <v-layout row wrap>
    <v-flex xs12>
     <v-subheader class='pl-0 green--text darken-4'>Final Fit Equation:</v-subheader>
    </v-flex>

    <v-flex xs12 pl-2>
      <p>{{finalEquation}}</p>
    </v-flex>

    <v-flex xs12>
      <v-btn outline flat block color='green' @click='refit'>
        Re-fit
        <v-icon right>fa-line-chart</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import _ from 'lodash';
import Vue from 'vue';
import math from 'mathjs';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FitInitialValuesAndEquations',
  data() {
    return {
      selected: [],
    };
  },
  created() {
    this.selected.push(_.cloneDeep(this.fits.Linear));
    this.setFitInitialValues();
    this.setFitEquation();
  },
  computed: {
    ...mapState('TAS', {
      fits: state => state.fit,
      fitInitialValues: state => state.fitInitialValues,
    }),
    ...mapGetters('TAS', [
      'fitNames',
    ]),
    allEquations() {
      return this.selected.map(item => item.equation);
    },
    finalEquation() {
      const temp = this.allEquations.map(item => item).join('+');
      // this.setFitEquation(temp);

      return temp;
    },
  },
  methods: {
    ...mapMutations('TAS', [
      'setFitEquation',
      'setFitInitialValues',
    ]),
    updateSelected(value, index) {
      let temp = _.cloneDeep(this.fits[value]);

      temp = this.formatCoefficients(temp, index);

      Vue.set(this.selected, index, temp);
    },
    addNewEquation() {
      let temp = _.cloneDeep(this.fits.Linear);

      temp = this.formatCoefficients(temp, this.selected.length);

      this.selected.push(temp);
    },
    removeEquation(index) {
      Vue.delete(this.selected, index);

      // Update coefficient positions
      this.selected.forEach((item, i) => {
        if (i > 0) {
          item.initialValues.forEach((iv) => {
            const temp = iv.coefficient;
            // eslint-disable-next-line
            iv.coefficient = iv.coefficient.substr(0, iv.coefficient.length - i.toString().length);
            // eslint-disable-next-line
            iv.coefficient = iv.coefficient + i;

            // Finally replace old coefficients in equation with updated
            const reg = new RegExp(temp, 'g');
            // eslint-disable-next-line
            item.equation = item.equation.replace(reg, iv.coefficient);
          });
        }
      });
    },
    parse(value) {
      // Parse the string
      const parsed = math.parse(value.equation);

      // Getting all variables to fit and remove x
      const nodes = parsed.filter(node => node.isSymbolNode && node.name !== 'x');
      const params = nodes.map(node => node.name);

      return _.uniq(params);
    },
    formatCoefficients(value, i) {
      const params = this.parse(value);
      // eslint-disable-next-line
      const newParams = params.map((el) => {
        return i === 0 ? el : el + i;
      });

      params.forEach((el, index) => {
        const reg = new RegExp(el, 'g');
        // eslint-disable-next-line
        value.equation = value.equation.replace(reg, newParams[index]);

        value.initialValues.forEach((iv) => {
          if (iv.coefficient === el) {
            // eslint-disable-next-line
            iv.coefficient = newParams[index];
          }
        });
      });

      return value;
    },
    refit() {
      const temp = [];

      this.selected.forEach((s) => {
        s.initialValues.forEach((iv) => {
          temp.push(iv);
        });
      });

      this.setFitInitialValues(temp);
      this.setFitEquation(this.finalEquation);
      eventBus.$emit('refit-data-TAS');
    },
  },
  watch: {
    fitInitialValues(n) {
      const keys = [];
      const values = [];

      n.forEach((d) => {
        keys.push(d.coefficient);
        values.push(d.value);
      });

      this.selected.forEach((item) => {
        item.initialValues.forEach((iv) => {
          const index = keys.indexOf(iv.coefficient);

          if (index > -1) {
            // eslint-disable-next-line
            iv.value = values[index];
          }
        });
      });
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

.icon--disabled {
  pointer-events: none;
}
</style>