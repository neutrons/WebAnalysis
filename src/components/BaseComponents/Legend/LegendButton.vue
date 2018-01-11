<template>
  <v-btn flat small :disabled='disable' @click='$emit("toggle-legend")'>
    <span>Legend</span>
    <v-icon right>fa-th-list</v-icon>
  </v-btn>  
</template>

<script>
export default {
  name: 'LegendButton',
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    disable() {
      if (this.disable) this.$emit('close-legend');
    },
  },
};
</script>
