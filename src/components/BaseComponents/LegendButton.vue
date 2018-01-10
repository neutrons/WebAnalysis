<template>
  <v-btn flat small :disabled='!isPlotted' @click='$emit("toggle-legend")'>
    <span>Legend</span>
    <v-icon right>fa-th-list</v-icon>
  </v-btn>  
</template>

<script>
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'LegendButton',
  mixins: [
    getTitle,
  ],
  computed: {
    isPlotted() {
      return this.$store.state[this.title].filesSelected.length > 0;
    },
  },
  watch: {
    isPlotted() {
      if (!this.isPlotted) this.$emit('close-legend');
    },
  },
};
</script>
