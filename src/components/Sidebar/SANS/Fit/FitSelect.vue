<template>
    <v-select
        :items='fitKeys'
        v-model='select'
        hint='Select Fit'
    ></v-select>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'FitSelect',
  created() {
    this.select = 'Linear';
  },
  computed: {
    ...mapGetters('SANS', [
      'fitKeys',
    ]),
    ...mapState('SANS', {
      fitType: state => state.fitType,
    }),
    select: {
      get() {
        return this.fitType;
      },
      set(value) {
        this.setFitType(value);
        this.transformData();
      },
    },
  },
  methods: {
    ...mapMutations('SANS', [
      'setFitType',
      'transformData',
    ]),
  },
};
</script>

<style lang='scss' scoped>
</style>
