<template>
<!-- <v-container>
  <v-subheader class='pl-0'>Metadata:</v-subheader>
  <v-layout row wrap>
    <v-flex xs12 v-for='(item, key) in metadata' :key='key'>
      <v-subheader>{{key}}</v-subheader>
      {{item}}
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</v-container> -->
  <v-tabs>
    <v-toolbar dark color='blue' dense><v-toolbar-title>Metadata</v-toolbar-title></v-toolbar>
    <v-tabs-bar dark color='blue'>
      <v-tabs-slider color='white'></v-tabs-slider>
      <v-tabs-item
        v-for='(item, key) in metadata'
        :key='key'
        :href='`#tab-${key}`'
      >
        {{ key }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for='(item, key) in metadata'
        :key='key'
        :id='`tab-${key}`'
      >
        <v-card flat>
          <v-card-text>
                <v-container fluid grid-list-xs>
              <v-layout row wrap>
                  <v-flex v-for='(md, index) in item' :key='index' xs4 sm>{{md}}</v-flex>
              </v-layout>
                </v-container>
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
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