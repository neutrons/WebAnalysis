<template>
    <v-select label='Files' 
        :items='filteredFiles'
        v-model='selected'
        :multiple='multiple'
        max-height='150'
        autocomplete
        chips
        deletable-chips
        hide-selected
        hint='Pick a file to plot'
        :disabled='filteredFiles.length === 0'>
    </v-select>
</template>

<script>
export default {
  name: 'FileList',
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
    fileKeys() {
      return Object.keys(this.allFiles);
    },
    filteredFiles() {
      const vm = this;

      if (this.filters.length === 0) {
        return this.fileKeys;
      }

      const temp = [];

      this.filters.forEach((tag) => {
        vm.fileKeys.forEach((name) => {
          if (this.allFiles[name].tags.indexOf(tag) > -1) {
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
