<template>
<div>
  <v-expansion-panel>
    <v-expansion-panel-content :value='!collapse'>
      <div slot='header' class='title'>Fit Configuration</div>

      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-fit-ivs-eqs />
          </v-flex>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>

  <v-expansion-panel>
  <v-expansion-panel-content :value='false'>
      <div slot='header' class='title'>Levenberg Settings</div>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 pl-2>
            <v-fit-settings />
          </v-flex>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</div>
</template>

<script>
import FitInitialValuesAndEquations from './FitInitialValuesAndEquations';
import FitSettings from '../../../FitSettings/FitSettingsTAS';

export default {
  name: 'FitConfiguration',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    'v-fit-ivs-eqs': FitInitialValuesAndEquations,
    'v-fit-settings': FitSettings,
  },
};
</script>

<style lang='scss' scoped>
</style>