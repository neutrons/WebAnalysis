<template>
  <div>
    <!-- File List -->
    <v-file-explorer :collapse='false' />

    <!-- Scales -->
    <v-scales v-if='isFilesPlotted' />
    
    <!-- Transformations -->
    <v-transformations v-if='isFilesPlotted' />

    <!-- Fit Configurations -->
    <v-fit-configuration :collapse='false' v-if='isFileFit'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FileExplorer from '../../BaseComponents/FileExplorer/FileExplorer';
import Scales from '../../BaseComponents/Scales';
import Transformations from '../../BaseComponents/Transformations';
import FitConfiguration from './FitConfiguration';

export default {
  name: 'SidebarSANS1D',
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-transformations': Transformations,
    'v-fit-configuration': FitConfiguration,
  },
  computed: {
    ...mapGetters('SANS1D', [
      'isFilesPlotted',
      'isFileFit',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>
