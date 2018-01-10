<template>
  <v-btn flat small @click='$emit("export-chart")' :disabled='!isPlotted'>
    <span>Export Chart</span>
    <v-icon right>fa-floppy-o</v-icon>
  </v-btn>
</template>

<script>
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'ExportChartButton',
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