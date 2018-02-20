<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Files</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12 v-if='filter'>
          <v-filter-list />
        </v-flex>

        <v-flex xs12 v-if='files'>
          <v-files-list :multiple='multiple' />
        </v-flex>

        <v-flex xs12 v-if='fits'>
          <v-fit-list />
        </v-flex>

      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
export default {
  name: 'FileExplorer',
  props: {
    filter: {
      type: Boolean,
      default: true,
    },
    files: {
      type: Boolean,
      default: true,
    },
    fits: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>