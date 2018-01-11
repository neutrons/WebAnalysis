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
import { mapGetters } from 'vuex';
import FileExplorer from '../../BaseComponents/FileExplorer/FileExplorer';
import Scales from '../../BaseComponents/Scales';
import Tools from './Tools';

export default {
  name: 'SidebarStitch',
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-tools': Tools,
  },
  computed: {
    ...mapGetters('Stitch', [
      'isFilesPlotted',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>
