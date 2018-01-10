<template>
    <div>
      <v-text-field
        v-for='(item, index) in initialValues'
        :key='index'
        :label='item.coefficient'
        hint='Edit initial value for fit coefficients'
        v-model.number='item.value'
        :append-icon='item.constant ? "fa-circle constant" : "fa-circle non-constant"'
        :append-icon-cb='() => toggleConstant(item.constant, index)'
        type='number'
      ></v-text-field>

      <v-btn block outline @click='setInitialValues' color='green darken-1 white--text'>
        <v-icon left>fa-line-chart</v-icon> Re-fit
      </v-btn>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import _ from 'lodash';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FitInitialValues',
  created() {
    this.setFitInitialValues();
    this.initialValues = _.cloneDeep(this.fitInitialValues);
    eventBus.$on('revise-initial-values', this.reviseInitialValues);
  },
  data() {
    return {
      initialValues: {},
    };
  },
  computed: {
    ...mapState('SANS1D', {
      fitInitialValues: state => state.fitInitialValues,
    }),
  },
  methods: {
    ...mapMutations('SANS1D', [
      'setFitInitialValues',
    ]),
    toggleConstant(value, index) {
      this.initialValues[index].constant = !value;
    },
    setInitialValues() {
      if (!_.isEqual(this.initialValues, this.fitInitialValues)) {
        this.setFitInitialValues(this.initialValues);
        eventBus.$emit('refit-data');
      }
    },
    reviseInitialValues(value) {
      this.initialValues = value;
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
