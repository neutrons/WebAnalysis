<template>
    <v-select label='Filter' 
      ref='filterList'
      :items='tags'
      :values='selected'
      @input='updateFilters'
      multiple
      autocomplete
      max-height='250'
      chips
      deletable-chips
      :placeholder='tags.length ? "Select a tag to filter list" : "No tags available"'
      hint='Pick tags to filter files'
      :disabled='tags.length === 0'
      @change='$refs.filterList.isActive = $event.length > 1'>
    </v-select>
</template>

<script>
export default {
  name: 'FilterList',
  computed: {
    filenames() {
      return Object.keys(this.allFiles);
    },
    tags() {
      const finalTags = [];

      this.filenames.forEach((name) => {
        this.allFiles[name].tags.forEach((tag) => {
          // if tag doesn't exist add it to final tag list
          if (finalTags.indexOf(tag) === -1) finalTags.push(tag);
        });
      });

      return finalTags;
    },
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
