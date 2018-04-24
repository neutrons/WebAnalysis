<template>
  <v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Exclude Detectors</div>

    <v-container>
      <v-layout row wrap mb-4>
        <v-flex xs3 v-for='(item, index) in items' :key='index' @mouseover='onMouseover(item)' @mouseout='onMouseout(item)'>
          <v-checkbox hide-details :label='`${item}`' :input-value='inSelected(item)' @click='onToggleAnode(item)' color='secondary'></v-checkbox>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <v-tooltip top :close-delay='1'>
            <v-btn slot='activator' block outline color='warning' @click='resetSelected'>
              <v-icon left>fa-undo</v-icon>
              <span>Reset Exclude</span>
            </v-btn>
            <span>Click to reset detectors to exclude</span>
          </v-tooltip>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import * as d3 from 'd3';
import { mapState, mapGetters, mapActions } from 'vuex';

import { eventBus } from '../../../../assets/js/eventBus';

export default {
  name: 'ExcludeDetectorsPOWDER',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    // initialize anodes to exclude from exclude_detectors file data
    const values = this.defaultAnodesToExclude;
    values.forEach(d => this.onToggleAnode(d));
  },
  computed: {
    ...mapState('POWDER/Combine', {
      anodesToExclude: state => state.anodesToExclude,
    }),
    ...mapState('POWDER', {
      defaultAnodesToExclude: state => state.normalizeFilesData.excludeDetectors,
    }),
    ...mapGetters('POWDER/Combine', {
      items: 'getAnodeNames',
      isCombined: 'isCombined',
      getPreparedData: 'getPreparedData',
    }),
  },
  methods: {
    ...mapActions('POWDER/Combine', [
      'setAnodesToExclude',
      'resetAnodesToExclude',
      'combineData',
    ]),
    resetSelected() {
      this.resetAnodesToExclude()
        .then(() => {
          eventBus.$emit('redraw-chart-powder-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'danger');
        });
    },
    onMouseover(value) {
      d3.selectAll(`*[class$=anode${value}]`)
        .style('stroke-width', '5px');
    },
    onMouseout(value) {
      d3.selectAll(`*[class$=anode${value}]`)
        .style('stroke-width', '1.5px');
    },
    onToggleAnode(value) {
      // If value is already in selected filter it out, otherwise add it and update selected
      const result = this.inSelected(value) ?
        this.anodesToExclude.slice().filter(a => a !== value) :
        this.anodesToExclude.slice().concat([value]);

      this.setAnodesToExclude(result)
        .then(async () => { // eslint-disable-line
          // intermediate step to check if combined data exists
          // if so re-do combine data to account for newly updated
          // exclude detectors array
          if (this.isCombined) await this.combineData(this.getPreparedData);

          return true;
        })
        .then(() => {
          eventBus.$emit('redraw-chart-powder-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'danger');
        });
    },
    inSelected(value) {
      return this.anodesToExclude.indexOf(value) > -1;
    },
  },
};
</script>