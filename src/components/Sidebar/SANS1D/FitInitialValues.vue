<template>
    <div>
      <v-text-field
        v-for='(item, index) in initialValues'
        :key='index'
        :label='item.coefficient'
        hint='Edit initial value for fit coefficients'
        v-model.number='item.value'
        :append-icon='item.constant ? "fa-circle constant" : "fa-circle non-constant"'
        :append-icon-cb='() => item.constant = !item.constant'
        type='number'
      ></v-text-field>
    </div>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'FitInitialValues',
  mixins: [
    getTitle,
  ],
  created() {
    this.$store.commit(`${this.title}/setFitInitialValues`);
  },
  computed: {
    initialValues: {
      get() {
        return this.$store.state[this.title].fitInitialValues;
      },
      set() {},
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
