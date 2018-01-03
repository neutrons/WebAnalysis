<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse' class='green white--text'>
    <div slot='header' class='title'>Intensity Scale</div>

    <v-container class='grey lighten-4'>
      <v-layout row wrap>

        <v-flex xs12>
          <v-select label='Intensity Scale' :items='scales' v-model='hexScale'></v-select>

          <v-btn block outline @click='resetScale' color='orange darken-1 white--text'>
            <v-icon left color='orange darken-1'>fa-undo</v-icon> Reset Scale
          </v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'HexScales',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [
    getTitle,
  ],
  computed: {
    scales() {
      return this.$store.state[this.title].scales;
    },
    hexScale: {
      get() {
        return this.$store.state[this.title].hexScale;
      },
      set(value) {
        this.$store.commit(`${this.title}/setScale`, value);
      },
    },
  },
  methods: {
    resetScale() {
      this.$store.commit(`${this.title}/resetScale`);
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
