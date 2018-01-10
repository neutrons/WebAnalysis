<template>
  <v-btn flat small @click='$emit("reset-chart")' :disabled='!isPlotted'>
    <span>Reset Chart</span>
    <v-icon right>fa-undo</v-icon>
  </v-btn>
</template>

<script>
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'ResetChartButton',
  mixins: [
    getTitle,
  ],
  computed: {
    isPlotted() {
      return this.$store.state[this.title].filesSelected.length > 0;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>