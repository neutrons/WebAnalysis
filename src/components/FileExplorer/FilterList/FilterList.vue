<template>
    <v-select label='Filter' 
        :items='tags'
        :values='selected'
        @input='updateFilters'
        multiple
        autocomplete
        max-height='150'
        chips
        deletable-chips
        hint='Pick tags to filter files'
        :disabled='tags.length === 0'>
    </v-select>
</template>

<script>
export default {
  name: 'FilterList',
  computed: {
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
    filenames() {
      return Object.keys(this.allFiles);
    },
    tags() {
      const temp = [];

      this.filenames.forEach((name) => {
        this.allFiles[name].tags.forEach((tag) => {
          if (temp.indexOf(tag) === -1) {
            temp.push(tag);
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
