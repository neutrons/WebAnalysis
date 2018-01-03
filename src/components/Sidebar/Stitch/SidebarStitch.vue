<template>
  <div>
    <!-- File List -->
    <v-file-explorer :fits='false'/>

    <!-- Scales -->
    <v-scales v-if='isFilesPlotted' />

    <!-- Tools -->
    <v-tools v-if='isFilesPlotted' />
  </div>
</template>

<script>
import FileExplorer from '../../BaseComponents/FileExplorer/FileExplorer';
import Scales from '../../BaseComponents/Scales';
import Tools from './Tools';

import getTitle from '../../../assets/js/getTitle';
import isFilesPlotted from '../../../assets/js/isFilesPlotted';

export default {
  name: 'SidebarStitch',
  mixins: [
    getTitle,
    isFilesPlotted,
  ],
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-tools': Tools,
  },
};
</script>

<style lang='scss' scoped>

</style>
