<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Bin Settings</div>

    <v-container>
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
            thumb-color='primary'
          ></v-slider>

          <v-tooltip top :close-delay='1'>
            <v-btn slot='activator' block outline @click='resetBS' color='warning'>
              <v-icon left>fa-undo</v-icon> Reset Bin Size
            </v-btn>
            <span>Click to reset bin size</span>
          </v-tooltip>
        </v-flex>

      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapActions } from 'vuex';
import { eventBus } from '../../../../assets/js/eventBus';

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
    ...mapActions('SANS/SANS2D', [
      'setBinSize',
      'resetBinSize',
    ]),
    setBS() {
      // trigger action to set binsize then update chart
      this.setBinSize(this.editBinSize)
        .then(() => {
          eventBus.$emit('redraw-chart-sans-2d');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    resetBS() {
      this.editBinSize = 15;
      // trigger action to reset binsize then update chart
      this.resetBinSize()
        .then(() => {
          eventBus.$emit('redraw-chart-sans-2d');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
