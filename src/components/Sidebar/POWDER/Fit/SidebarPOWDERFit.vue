<template>
  <div>
    <v-file-explorer :fits='false' />

    <v-scales v-if='filesSelected.length' />

    <v-fields v-if='filesSelected.length' />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import FileExplorer from '../../../FileExplorer/FileExplorerPOWDER';
import Scales from '../../../Scales/ScalesPOWDER';
import Fields from '../../../Fields/FieldsPOWDERFit';

export default {
  name: 'SidebarPOWDERFit',
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-fields': Fields,
  },
  computed: {
    ...mapState('POWDER/Fit', {
      filesSelected: state => state.filesSelected,
    }),
  },
};
</script>

<style lang='scss' scoped>

</style>
