<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse' class='green'>
    <div slot='header' class='title white--text'>Fit Configuration</div>

    <v-container class='grey lighten-4'>
      <v-layout row wrap>

        <v-flex xs12>
          <v-subheader class='pl-0 green--text darken-4'>Fit Selection:</v-subheader>
        </v-flex>

        <v-flex xs12 pl-2>
          <v-fit-select />
        </v-flex>

        <v-flex xs12>
          <v-subheader class='pl-0 green--text darken-4'>Fit Equation:</v-subheader>
        </v-flex>

        <v-flex xs12 pl-2>
          <v-fit-equation />
        </v-flex>

        <v-flex xs12>
          <v-subheader class='pl-0 green--text darken-4'>Initial Values:</v-subheader>
        </v-flex>

        <v-flex xs12 pl-2>
          <v-fit-initial-values />
        </v-flex>

        <v-flex xs12>
          <v-subheader class='pl-0 green--text darken-4'>Levenberg-marquardt Settings:</v-subheader>
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
import FitEquation from './FitEquation';
import FitInitialValues from './FitInitialValues';
import FitSettings from '../../BaseComponents/FitSettings';

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
    'v-fit-equation': FitEquation,
    'v-fit-initial-values': FitInitialValues,
    'v-fit-settings': FitSettings,
  },
  computed: {
    fits() {
      return Object.keys(this.$store.state[this.title].fits);
    },
    select: {
      get() {
        return this.$store.state[this.title].fitType;
      },
      set(value) {
        this.$store.commit(`${this.title}/setFitType`, value);
      },
    },
  },
};
</script>

<style lang='scss' scoped>
</style>