<template>
    <v-select
      :items='fitKeys'
      v-model='select'
      placeholder='Select fit type'
      class='pt-0'
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
    ...mapGetters('SANS/Fit', [
      'fitKeys',
    ]),
    ...mapState('SANS/Fit', {
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
    ...mapMutations('SANS/Fit', [
      'setFitType',
      'transformData',
    ]),
  },
};
</script>

<style lang='scss' scoped>
</style>
