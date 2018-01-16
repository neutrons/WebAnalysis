<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12 v-for='(item, index) in metadata' :key='index'>
      {{item}}
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'MetadataTable',
  props: {
    metadata: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>