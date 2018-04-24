<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Scales</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-select label='X Scale' :items='xScales' v-model='selectX' hint='Select X Scale'>
          </v-select>

          <v-select label='Y Scale' :items='yScales' v-model='selectY' hint='Select Y Scale'>
          </v-select>

          <v-tooltip top :close-delay='1'>
            <v-btn slot='activator' block outline @click='resetPlotScales' color='warning'>
              <v-icon left>fa-undo</v-icon>
              <span>Reset Scales</span>
            </v-btn>
            <span>Click to reset plot scales</span>
          </v-tooltip>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'Scales',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    redrawName() {
      return `redraw-chart-${this.$route.meta.group.toLowerCase()}-${this.$route.meta.feature.toLowerCase()}`;
    },
    xScales() {
      return Object.keys(this.scales.x);
    },
    yScales() {
      return Object.keys(this.scales.y);
    },
    selectX: {
      get() {
        return this.xScaleLabel;
      },
      set(value) {
        // trigger action and wait for a response once a response is returned update chart
        this.setXScale(value)
          .then(() => {
            eventBus.$emit(this.redrawName);
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
    selectY: {
      get() {
        return this.yScaleLabel;
      },
      set(value) {
        // trigger action and wait for a response once a response is returned update chart
        this.setYScale(value)
          .then(() => {
            eventBus.$emit(this.redrawName);
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
  },
  methods: {
    resetPlotScales() {
      if (this.xScaleLabel !== 'x' || this.yScaleLabel !== 'y') {
        this.resetScales()
          .then(() => {
            eventBus.$emit(this.redrawName);
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
