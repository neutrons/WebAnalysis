<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse' class='green white--text'>
    <div slot='header' class='title'>Bin Settings</div>

    <v-container class='grey lighten-4'>
      <v-layout row wrap>

        <v-flex xs12>
          <v-slider :label='`Bin Size - ${editBinSize}`'
            v-model='editBinSize'
            @mouseup.native='setBS'
            :step='1'
            :min='1'
            :max='25'
            ticks
            thumb-label
            color='green'
          ></v-slider>

          <v-btn block outline @click='resetBS' color='orange darken-1 white--text'>
            <v-icon left color='orange darken-1'>fa-undo</v-icon> Reset Bin Size
          </v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'HexBins',
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editBinSize: 15,
    };
  },
  methods: {
    ...mapMutations('SANS2D', [
      'setBinSize',
      'resetBinSize',
    ]),
    setBS() {
      this.setBinSize(this.editBinSize);
    },
    resetBS() {
      this.editBinSize = 15;
      this.resetBinSize();
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
