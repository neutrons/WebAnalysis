<template>
  <div>
    <!-- File List -->
    <v-file-explorer :fits='false'/>

    <!-- Scales -->
    <v-scales v-if='isFilesPlotted' :collapse='false' />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SidebarSANS1DStitch',
  components: {
    'v-file-explorer': () => import('../../../FileExplorer/FileExplorerSANSStitch'),
    'v-scales': () => import('../../../Scales/ScalesSANSStitch'),
  },
  computed: {
    ...mapGetters('SANS/Stitch', [
      'isFilesPlotted',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>
