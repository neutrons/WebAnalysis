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
import FileExplorer from '../../BaseComponents/FileExplorer/FileExplorer';
import HexScales from './HexScales';
import HexBins from './HexBins';

import getTitle from '../../../assets/js/getTitle';

export default {
  name: 'SidebarSANS2D',
  mixins: [
    getTitle,
  ],
  components: {
    'v-file-explorer': FileExplorer,
    'v-hex-scales': HexScales,
    'v-hex-bins': HexBins,
  },
  computed: {
    isFilePlotted() {
      return this.$store.state[this.title].filesSelected !== null;
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
