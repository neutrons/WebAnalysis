<template>
    <v-select label='Files' 
        :items='filteredFiles'
        v-model='selected'
        :multiple='multiple'
        max-height='400'
        chips
        deletable-chips
        hint='Pick a file to plot'
        light>
    </v-select>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';
import filesList from '../../../assets/js/filesList';

export default {
  name: 'FileList',
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [
    getTitle,
    filesList,
  ],
  computed: {
    selected: {
      get() {
        return this.$store.state[this.title].filesSelected;
      },
      set(value) {
        this.$store.commit(`${this.title}/updateFilesSelected`, value);
      },
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
