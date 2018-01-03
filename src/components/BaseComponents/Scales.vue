<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse' class='green white--text'>
    <div slot='header' class='title'>Scales</div>

    <v-container class='grey lighten-4'>
      <v-layout row wrap>

        <v-flex xs12>
          <v-select label='X Scale' :items='xScales' v-model='selectX' hint='Select X Scale'>
          </v-select>

          <v-select label='Y Scale' :items='yScales' v-model='selectY' hint='Select Y Scale'>
          </v-select>

          <v-btn block outline @click='resetScales' color='orange darken-1 white--text'>
            <v-icon left color='orange darken-1'>fa-undo</v-icon> Reset Scales
          </v-btn>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'Scales',
  mixins: [
    getTitle,
  ],
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.selectX = 'x';
    this.selectY = 'y';
  },
  computed: {
    xScales() {
      return Object.keys(this.$store.state[this.title].scale.x);
    },
    selectX: {
      get() {
        return this.$store.state[this.title].plotScale.x.label;
      },
      set(value) {
        this.$store.commit(`${this.title}/setXScale`, value);
      },
    },
    yScales() {
      return Object.keys(this.$store.state[this.title].scale.y);
    },
    selectY: {
      get() {
        return this.$store.state[this.title].plotScale.y.label;
      },
      set(value) {
        this.$store.commit(`${this.title}/setYScale`, value);
      },
    },
  },
  methods: {
    resetScales() {
      this.$store.commit(`${this.title}/resetScales`);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
