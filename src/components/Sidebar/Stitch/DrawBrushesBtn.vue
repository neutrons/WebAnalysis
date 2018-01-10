<template>
<v-btn block outline @click='drawBrushes' color='green darken-1 white--text' :disabled='false'>
  <v-icon left color='green darken-1'>fa-square-o</v-icon> Draw Saved Selections
</v-btn>
</template>

<script>
export default {
  name: 'DrawBrushesBtn',
  methods: {
    drawBrushes() {
      // where brushes will be drawn
    },
  },
};
</script>

<style lang='scss' scoped>
</style>