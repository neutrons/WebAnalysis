<template>
    <v-select label='Fit' 
        :items='filesToFit'
        v-model='selected'
        chips
        deletable-chips
        hint='Pick a file to fit'
        light
        :disabled='filesToFit.length === 0'>
    </v-select>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'FitList',
  mixins: [
    getTitle,
  ],
  computed: {
    filesToFit() {
      return this.$store.state[this.title].filesSelected;
    },
    selected: {
      get() {
        return this.$store.state[this.title].fileToFit;
      },
      set(value) {
        this.$store.commit(`${this.title}/updateFileToFit`, value);
      },
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
