<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse' class='green white--text'>
    <div slot='header' class='title'>Fields</div>

    <v-container class='grey lighten-4'>
      <v-layout row wrap>

        <v-flex xs12>
          <v-select label='X Field' :items='fields' v-model='selectX' hint='Select X Variable' :disabled='!isFilesPlotted'>
          </v-select>

          <v-select label='Y Field' :items='fields' v-model='selectY' hint='Select Y Variable' :disabled='!isFilesPlotted'>
          </v-select>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'Fields',
  mixins: [
    getTitle,
  ],
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    fields() {
      return this.$store.getters[`${this.title}/getFields`];
    },
    selectX: {
      get() {
        return this.$store.state[this.title].field.x;
      },
      set(value) {
        this.$store.commit(`${this.title}/setXField`, value);
        this.$store.commit(`${this.title}/changeFields`);
      },
    },
    selectY: {
      get() {
        return this.$store.state[this.title].field.y;
      },
      set(value) {
        this.$store.commit(`${this.title}/setYField`, value);
        this.$store.commit(`${this.title}/changeFields`);
      },
    },
    isFilesPlotted() {
      return this.$store.state[this.title].filesSelected.length > 0;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
