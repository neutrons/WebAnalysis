<template>
    <div>
      <v-slider :label='`Damping - ${editDamping.toFixed(1)}`'
        v-model='editDamping'
        @mouseup.native='setDamping'
        :step='0.1'
        :min='0.1'
        :max='10'
        ticks
        thumb-label
        color='green'
        ></v-slider>

      <v-slider :label='`Gradient - ${editGradient.toFixed(1)}`'
        v-model='editGradient'
        @mouseup.native='setGradient'
        :step='0.1'
        :min='0.1'
        :max='1'
        ticks
        thumb-label
        color='green'
        ></v-slider>

      <v-slider :label='`Iterations - ${editIterations}`'
        v-model='editIterations'
        @mouseup.native='setIterations'
        :step='100'
        :min='100'
        :max='10000'
        ticks
        thumb-label
        color='green'
        ></v-slider>

      <v-slider :label='`Error - ${editError.toFixed(1)}`'
        v-model='editError'
        @mouseup.native='setError'
        :step='0.1'
        :min='0.1'
        :max='1'
        ticks
        thumb-label
        color='green'
        ></v-slider>

      <v-btn block outline @click='resetFitSettings' color='orange darken-1 white--text'>
        <v-icon left color='orange darken-1'>fa-undo</v-icon> Reset Levenberg
      </v-btn>
    </div>
</template>

<script>
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'FitSettings',
  mixins: [
    getTitle,
  ],
  data() {
    return {
      editDamping: 0.1,
      editGradient: 0.1,
      editIterations: 100,
      editError: 0.1,
    };
  },
  methods: {
    setDamping() {
      this.$store.commit(`${this.title}/setFitDamping`, this.editDamping);
    },
    setGradient() {
      this.$store.commit(`${this.title}/setFitGradient`, this.editGradient);
    },
    setIterations() {
      this.$store.commit(`${this.title}/setFitIterations`, this.editIterations);
    },
    setError() {
      this.$store.commit(`${this.title}/setFitError`, this.editError);
    },
    resetFitSettings() {
      this.editDamping = 0.1;
      this.editGradient = 0.1;
      this.editIterations = 100;
      this.editError = 0.1;
      this.$store.commit(`${this.title}/resetFitSettings`);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
