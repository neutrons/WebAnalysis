<template>
    <v-text-field
      :value='equation'
      @keydown.enter.native='enterEquation($event.target.value)'
    ></v-text-field>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'FitEquation',
  mixins: [
    getTitle,
  ],
  created() {
    this.$store.commit(`${this.title}/setFitEquation`);
  },
  computed: {
    equation() {
      return this.$store.state[this.title].fitEquation;
    },
  },
  methods: {
    enterEquation(value) {
      this.$store.commit(`${this.title}/setFitEquation`, value);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
