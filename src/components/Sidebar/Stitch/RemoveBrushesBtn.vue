<template>
<v-btn block outline @click='removeBrushes' color='red darken-1 white--text' :disabled='false'>
  <v-icon left color='red darken-1'>fa-ban</v-icon> Remove Selections
</v-btn>
</template>

<script>
export default {
  name: 'RemoveBrushesBtn',
  methods: {
    removeBrushes() {
      // where brushes are removed
    },
  },
};
</script>

<style lang='scss' scoped>
</style>