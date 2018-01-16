<template>
  <v-btn flat small :disabled='disable' @click='$emit("toggle-legend")' :icon='isIcon'>
    <span class='hidden-sm-and-down' >Legend</span>
    <v-icon :right='!isIcon'>fa-th-list</v-icon>
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
  computed: {
    isIcon() {
      return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm';
    },
  },
  watch: {
    disable() {
      if (this.disable) this.$emit('close-legend');
    },
  },
};
</script>
