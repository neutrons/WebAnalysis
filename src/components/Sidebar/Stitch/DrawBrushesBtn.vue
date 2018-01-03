<template>
<v-btn block outline @click='drawBrushes' color='green darken-1 white--text' :disabled='false'>
  <v-icon left color='green darken-1'>fa-square-o</v-icon> Draw Saved Selections
</v-btn>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'DrawBrushesBtn',
  mixins: [
    getTitle,
  ],
  methods: {
    drawBrushes() {
      // where brushes will be drawn
    },
  },
};
</script>

<style lang='scss' scoped>
</style>