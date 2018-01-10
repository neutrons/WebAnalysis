<template>
<v-btn block outline @click='saveStitchLine' color='green darken-1 white--text' :disabled='false'>
  <v-icon left color='green darken-1'>fa-floppy-o</v-icon> Save Stitch Line
</v-btn>
</template>

<script>
export default {
  name: 'SaveStitchBtn',
  methods: {
    saveStitchLine() {
      // where save stitch line will go
    },
  },
};
</script>

<style lang='scss' scoped>
</style>