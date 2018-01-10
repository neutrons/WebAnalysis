<template>
  <div>
    <!-- File List -->
    <v-file-explorer />

    <!-- Scales -->
    <v-scales v-if='isFilesPlotted' />

    <!-- Fields -->
    <v-fields v-if='isFilesPlotted' :collapse='false' />

    <!-- Fit Configurations -->
    <v-fit-configuration :collapse='false' v-if='isFileFit'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FileExplorer from '../../BaseComponents/FileExplorer/FileExplorer';
import Scales from '../../BaseComponents/Scales';
import Fields from './Fields';
import FitConfiguration from './FitConfiguration';

export default {
  name: 'SidebarTAS',
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-fields': Fields,
    'v-fit-configuration': FitConfiguration,
  },
  computed: {
    ...mapGetters('TAS', [
      'isFileFit',
      'isFilesPlotted',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>
