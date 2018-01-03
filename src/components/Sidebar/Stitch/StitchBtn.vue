<template>
<v-btn block outline @click='stitchData' color='green darken-1 white--text' :disabled='false'>
  <v-icon left color='green darken-1'>fa-line-chart</v-icon> Stitch Data
</v-btn>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'StitchBtn',
  mixins: [
    getTitle,
  ],
  methods: {
    stitchData() {
    // where stitch line will be
    },
  },
};
</script>

<style lang='scss' scoped>
</style>