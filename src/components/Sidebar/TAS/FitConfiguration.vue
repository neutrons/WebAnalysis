<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Fit Configuration</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-subheader class='pl-0'>Fit Equations:</v-subheader>
        </v-flex>

        <v-flex xs12>
          <v-fit-ivs-eqs />
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
import FitInitialValuesAndEquations from './FitInitialValuesAndEquations';
import FitSettings from '../../FitSettings/FitSettingsTAS';

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