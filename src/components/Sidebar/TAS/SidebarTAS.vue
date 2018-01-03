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
import FileExplorer from '../../BaseComponents/FileExplorer/FileExplorer';
import Scales from '../../BaseComponents/Scales';
import Fields from './Fields';
import FitConfiguration from './FitConfiguration';

import getTitle from '../../../assets/js/getTitle';
import isFileFit from '../../../assets/js/isFileFit';
import isFilesPlotted from '../../../assets/js/isFilesPlotted';

export default {
  name: 'SidebarTAS',
  mixins: [
    getTitle,
    isFileFit,
    isFilesPlotted,
  ],
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-fields': Fields,
    'v-fit-configuration': FitConfiguration,
  },
};
</script>

<style lang='scss' scoped>

</style>
