<template>
    <v-select label='Files' 
        :items='filteredFiles'
        v-model='selected'
        :multiple='multiple'
        max-height='400'
        chips
        deletable-chips
        hide-selected
        hint='Pick a file to plot'
        light
        :disabled='filteredFiles.length === 0'>
    </v-select>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

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
    getFetched() {
      return this.$store.state[this.title].fetched;
    },
    getUploaded() {
      return this.$store.state[this.title].uploaded;
    },
    getFiles() {
      return Object.assign({}, this.getFetched, this.getUploaded);
    },
    fileKeys() {
      return Object.keys(this.getFiles);
    },
    filters() {
      return this.$store.state[this.title].filters;
    },
    filteredFiles() {
      const vm = this;

      if (this.filters.length === 0) {
        return this.fileKeys;
      }

      const temp = [];

      this.filters.forEach((tag) => {
        vm.fileKeys.forEach((name) => {
          if (this.getFiles[name].tags.indexOf(tag) > -1) {
            temp.push(name);
          }
        });
      });

      return temp;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
