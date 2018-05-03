<template>
<v-list dense>
    <v-list-tile v-for='(md, name) in metadata' :key='name'>
      <v-list-tile-content >
        <span>
          {{ name }} = {{ md === '' ? '[No Value]' : md }}
        </span>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
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