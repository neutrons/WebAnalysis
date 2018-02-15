<template>
<v-list dense>
  <template v-for="(item, key) in metadata">
    <v-list-tile :key="item.title">
      <v-list-tile-content>
        <div><strong>{{ key }}</strong> = {{ item }}</div>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider :key='key'></v-divider>
  </template>
</v-list>
</template>

<script>
export default {
  name: 'MetadataTable',
  props: {
    metadata: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>