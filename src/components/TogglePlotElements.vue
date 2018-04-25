<template>
<v-menu offset-y :disabled='disable' :class='{"disabled-toggle": disable}'>
  <v-tooltip top slot="activator">
    <v-btn flat small :icon='isBreakpointSmall' slot="activator">
      <span class='hidden-md-and-down'>Toggle Elements</span>
      <v-icon :right='!isBreakpointSmall'>fa-toggle-on</v-icon>
    </v-btn>
    <span>Toggle plot elements visibility.</span>
  </v-tooltip>

  <v-list>
    <v-list-tile v-for='item in menuItems' :key='item.text' @click='$emit("toggle-plot-element", item.type)'>
      <v-list-tile-action>
        <v-icon :color='item.value ? "success" : "error"'>{{ item.value ? "fa-check" : "fa-times" }}</v-icon>
      </v-list-tile-action>

      <v-list-tile-title>
        {{ item.text }}
      </v-list-tile-title>
    </v-list-tile>
  </v-list>
</v-menu>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'TogglePlotElements',
  mixins: [
    isBreakpointSmall,
  ],
  props: {
    isScatterPoints: {
      type: Boolean,
      required: true,
    },
    isScatterLines: {
      type: Boolean,
      required: true,
    },
    isErrorBars: {
      type: Boolean,
      required: true,
    },
    isLegend: {
      type: Boolean,
      required: true,
    },
    disable: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    menuItems() {
      return [
        {
          text: 'Scatter Points',
          type: 'scatterPoint',
          value: this.isScatterPoints,
        },
        {
          text: 'Scatter Lines',
          type: 'scatterLine',
          value: this.isScatterLines,
        },
        {
          text: 'Error Bars',
          type: 'errorBar',
          value: this.isErrorBars,
        },
        {
          text: 'Legend',
          type: 'legend',
          value: this.isLegend,
        },
      ];
    },
  },
};
</script>

<style scoped>
.disabled-toggle {
  opacity: 0.5;
}
</style>