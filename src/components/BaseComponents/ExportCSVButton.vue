<template>
  <v-btn flat small @click='$emit("export-csv")' :disabled='!isPlotted'>
    <span>Export CSV</span>
    <v-icon right>fa-table</v-icon>
  </v-btn>
</template>

<script>
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'ExportCSVButton',
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