<template>
    <v-select label='Filter' 
        :items='tags'
        :values='selected'
        @input='updateFilters'
        multiple
        max-height='400'
        chips
        deletable-chips
        hint='Pick tags to filter files'
        light
        :disabled='tags.length === 0'>
    </v-select>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'FilterList',
  mixins: [
    getTitle,
  ],
  computed: {
    selected() {
      return this.$store.state[this.title].filters;
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
    filenames() {
      return Object.keys(this.getFiles);
    },
    tags() {
      const temp = [];

      this.filenames.forEach((name) => {
        this.getFiles[name].tags.forEach((tag) => {
          if (temp.indexOf(tag) === -1) {
            temp.push(tag);
          }
        });
      });

      return temp;
    },
  },
  methods: {
    updateFilters(e) {
      this.$store.commit(`${this.title}/updateFilters`, e);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
