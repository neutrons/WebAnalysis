<template>
  <div>
    <!-- File List -->
    <v-file-explorer :fits='false' :multiple='false' />

    <!-- Hex Scales -->
    <v-hex-scales v-if='isFilePlotted' />

    <!-- Hex Bin Slider -->
    <v-hex-bins v-if='isFilePlotted' />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FileExplorer from '../../../FileExplorer/FileExplorerSANS2D';
import HexScales from './HexScales';
import HexBins from './HexBins';

export default {
  name: 'SidebarSANS2D',
  components: {
    'v-file-explorer': FileExplorer,
    'v-hex-scales': HexScales,
    'v-hex-bins': HexBins,
  },
  computed: {
    ...mapGetters('SANS/SANS2D', [
      'isFilePlotted',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>
