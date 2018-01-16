<template>
  <v-btn flat small @click='$emit("reset-chart")' :disabled='disable' :icon='isIcon'>
    <span class='hidden-sm-and-down'>Reset Chart</span>
    <v-icon :right='!isIcon'>fa-undo</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ResetChartButton',
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
};
</script>
