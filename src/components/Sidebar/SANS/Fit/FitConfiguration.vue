<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Fit Configuration</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-subheader class='pl-0'>Fit Selection:</v-subheader>
        </v-flex>

        <v-flex xs12 pl-2>
          <v-fit-select />
        </v-flex>

        <v-flex xs12>
          <v-fit-iv-eq />
        </v-flex>

        <v-flex xs12>
          <v-subheader class='pl-0'>Levenberg-marquardt Settings:</v-subheader>
        </v-flex>

        <v-flex xs12 pl-2>
          <v-fit-settings />
        </v-flex>

      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import FitSelect from './FitSelect';
import FitInitialValuesAndEquation from './FitInitialValuesAndEquation';
import FitSettings from '../../../FitSettings/FitSettingsSANS1D';

export default {
  name: 'FitConfiguration',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    'v-fit-select': FitSelect,
    'v-fit-iv-eq': FitInitialValuesAndEquation,
    'v-fit-settings': FitSettings,
  },
};
</script>

<style lang='scss' scoped>
</style>