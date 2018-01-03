<template>
    <v-select
        :items='fits'
        v-model='select'
        hint='Select Fit'
    ></v-select>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'FitSelect',
  mixins: [
    getTitle,
  ],
  created() {
    this.select = 'Linear';
  },
  computed: {
    fits() {
      return Object.keys(this.$store.state[this.title].fits);
    },
    select: {
      get() {
        return this.$store.state[this.title].fitType;
      },
      set(value) {
        this.$store.commit(`${this.title}/setFitType`, value);
        this.$store.commit(`${this.title}/transformData`);
      },
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
