<template>
    <v-select label='Fit' 
      ref='fitList'
      :items='filesToFit'
      v-model='selected'
      autocomplete
      chips
      deletable-chips
      :placeholder='filesToFit.length ? "Select a file to fit" : "No files to fit"'
      hint='Pick a file to fit'
      max-height='250'
      :disabled='!filesToFit.length'
      @change='$refs.fitList.isActive = $event.length > 1'>
    </v-select>
</template>

<script>
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FitList',
  computed: {
    selected: {
      get() {
        return this.fileToFit;
      },
      set(value) {
        // trigger action to update file to fit
        // wait for response before updating chart
        const redrawName = `redraw-chart-${this.$route.meta.group.toLowerCase()}-fit`;

        this.updateFileToFit(value)
          .then(() => {
            eventBus.$emit(redrawName);
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
