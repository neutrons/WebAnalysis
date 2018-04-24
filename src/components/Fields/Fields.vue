<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Axes</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-select label='X Axes' :items='getFields' v-model='selectX' hint='Select X Variable'>
          </v-select>

          <v-select label='Y Axes' :items='getFields' v-model='selectY' hint='Select Y Variable'>
          </v-select>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'Fields',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    redrawName() {
      return `redraw-chart-${this.$route.meta.group.toLowerCase()}-${this.$route.meta.feature.toLowerCase()}`;
    },
    selectX: {
      get() {
        return this.field.x;
      },
      set(value) {
        this.setXField(value)
          .then(() => {
            eventBus.$emit(this.redrawName);
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
    selectY: {
      get() {
        return this.field.y;
      },
      set(value) {
        this.setYField(value)
          .then(() => {
            eventBus.$emit(this.redrawName);
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
