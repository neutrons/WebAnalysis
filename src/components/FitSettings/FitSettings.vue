<template>
    <div>
      <v-slider :label='`Damping - ${editDamping.toFixed(1)}`'
        v-model='editDamping'
        @mouseup.native='setFitDamping(editDamping)'
        :step='0.1'
        :min='0.1'
        :max='10'
        ticks
        thumb-label
        color='green'
        ></v-slider>

      <v-slider :label='`Gradient - ${editGradient.toFixed(1)}`'
        v-model='editGradient'
        @mouseup.native='setFitGradient(editGradient)'
        :step='0.1'
        :min='0.1'
        :max='1'
        ticks
        thumb-label
        color='green'
        ></v-slider>

      <v-slider :label='`Iterations - ${editIterations}`'
        v-model='editIterations'
        @mouseup.native='setFitIterations(editIterations)'
        :step='100'
        :min='100'
        :max='10000'
        ticks
        thumb-label
        color='green'
        ></v-slider>

      <v-slider :label='`Error - ${editError.toFixed(1)}`'
        v-model='editError'
        @mouseup.native='setFitError(editError)'
        :step='0.1'
        :min='0.1'
        :max='1'
        ticks
        thumb-label
        color='green'
        ></v-slider>

      <v-btn block outline @click='resetEditFitSettings' color='orange darken-1 white--text'>
        <v-icon left color='orange darken-1'>fa-undo</v-icon> Reset Levenberg
      </v-btn>
    </div>
</template>

<script>
export default {
  name: 'FitSettings',
  data() {
    return {
      editDamping: 0.1,
      editGradient: 0.1,
      editIterations: 100,
      editError: 0.1,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
