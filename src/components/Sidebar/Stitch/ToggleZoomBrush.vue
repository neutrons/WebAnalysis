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
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ToggleZoomBrush',
  computed: {
    ...mapState('Stitch', {
      isZoomBrush: state => state.isZoomBrush,
    }),
    toggle: {
      get() {
        return this.isZoomBrush;
      },
      set(value) {
        this.toggleZoomBrush(value);
      },
    },
    label() {
      return this.toggle ? 'Zoom' : 'Brush';
    },
  },
  methods: {
    ...mapMutations('Stitch', [
      'toggleZoomBrush',
    ]),
  },
};
</script>

<style lang='scss' scoped>
</style>