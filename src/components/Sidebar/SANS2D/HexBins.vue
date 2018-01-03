<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse' class='green white--text'>
    <div slot='header' class='title'>Bin Settings</div>

    <v-container class='grey lighten-4'>
      <v-layout row wrap>

        <v-flex xs12>
          <v-slider :label='`Bin Size - ${editBinSize}`'
            v-model='editBinSize'
            @mouseup.native='setBinSize'
            :step='1'
            :min='1'
            :max='25'
            ticks
            thumb-label
            color='green'
          ></v-slider>

          <v-btn block outline @click='resetBinSize' color='orange darken-1 white--text'>
            <v-icon left color='orange darken-1'>fa-undo</v-icon> Reset Bin Size
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
  name: 'HexBins',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [
    getTitle,
  ],
  data() {
    return {
      editBinSize: 15,
    };
  },
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
    setBinSize() {
      this.$store.commit(`${this.title}/setBinSize`, this.editBinSize);
    },
    resetBinSize() {
      this.editBinSize = 15;
      this.$store.commit(`${this.title}/resetBinSize`);
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
