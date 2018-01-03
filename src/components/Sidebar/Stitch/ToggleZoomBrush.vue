<template>
    <v-container fluid grid-list-xl pa-0>
      <v-layout row justify-space-between pl-5 pb-0>
          <v-flex xs12 pl-5 pb-0>
            <v-radio-group v-model='toggle' row>
              <v-radio label='Zoom' :value='true' color='green'></v-radio>
              <v-radio label='Select' :value='false' color='green'></v-radio>
            </v-radio-group>
          </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'ToggleZoomBrush',
  mixins: [
    getTitle,
  ],
  computed: {
    toggle: {
      get() {
        return this.$store.state[this.title].isZoomBrush;
      },
      set(value) {
        this.$store.commit(`${this.title}/toggleZoomBrush`, value);
      },
    },
    label() {
      return this.toggle ? 'Zoom' : 'Brush';
    },
  },
};
</script>

<style lang='scss' scoped>
</style>