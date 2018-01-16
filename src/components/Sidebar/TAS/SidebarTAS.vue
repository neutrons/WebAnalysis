<template>
  <div>
    <!-- File List -->
    <v-file-explorer />

    <!-- Scales -->
    <v-scales v-if='filesSelected.length' />

    <!-- Fields -->
    <v-fields v-if='filesSelected.length' />

    <!-- Fit Configurations -->
    <v-fit-configuration :collapse='false' v-if='fileToFit'/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import FileExplorer from '../../FileExplorer/FileExplorerTAS';
import Scales from '../../Scales/ScalesTAS';
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
    ...mapState('TAS', {
      fileToFit: state => state.fileToFit,
      filesSelected: state => state.filesSelected,
    }),
  },
};
</script>

<style lang='scss' scoped>

</style>
