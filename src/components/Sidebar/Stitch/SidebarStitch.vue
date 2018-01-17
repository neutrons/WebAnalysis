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
  name: 'SidebarStitch',
  components: {
    'v-file-explorer': () => import('../../FileExplorer/FileExplorerStitch'),
    'v-scales': () => import('../../Scales/ScalesStitch'),
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
