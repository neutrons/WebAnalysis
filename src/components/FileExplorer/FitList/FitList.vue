<template>
    <v-select label='Fit' 
        :items='filesToFit'
        v-model='selected'
        chips
        deletable-chips
        hint='Pick a file to fit'
        :disabled='!filesToFit.length'>
    </v-select>
</template>

<script>
export default {
  name: 'FitList',
  watch: {
    filesToFit() {
      if (!this.filesToFit.length) {
        this.selected = null;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
