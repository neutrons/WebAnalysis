<template>
<v-btn block outline @click='stitchData' color='green darken-1 white--text' :disabled='false'>
  <v-icon left color='green darken-1'>fa-line-chart</v-icon> Stitch Data
</v-btn>
</template>

<script>
export default {
  name: 'StitchBtn',
  methods: {
    stitchData() {
    // where stitch line will be
    },
  },
};
</script>

<style lang='scss' scoped>
</style>