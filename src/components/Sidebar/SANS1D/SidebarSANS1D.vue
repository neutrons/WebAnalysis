<template>
  <div>
    <!-- File List -->
    <v-file-explorer :collapse='false' />

    <!-- Scales -->
    <v-scales v-if='isFilesPlotted' :collapse='false' />
    
    <!-- Transformations -->
    <v-transformations v-if='isFilesPlotted' />

    <!-- Fit Configurations -->
    <v-fit-configuration :collapse='false' v-if='isFileFit'/>
  </div>
</template>

<script>
import FileExplorer from '../../BaseComponents/FileExplorer/FileExplorer';
import Scales from '../../BaseComponents/Scales';
import Transformations from '../../BaseComponents/Transformations';
import FitConfiguration from './FitConfiguration';

import getTitle from '../../../assets/js/getTitle';
import isFileFit from '../../../assets/js/isFileFit';
import isFilesPlotted from '../../../assets/js/isFilesPlotted';

export default {
  name: 'SidebarSANS1D',
  mixins: [
    getTitle,
    isFileFit,
    isFilesPlotted,
  ],
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-transformations': Transformations,
    'v-fit-configuration': FitConfiguration,
  },
};
</script>

<style lang='scss' scoped>

</style>
