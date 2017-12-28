<template>
  <div>
    <!-- File List -->
    <v-file-explorer :fits='false' :multiple='false' />
  </div>
</template>

<script>
import FileExplorer from '../BaseComponents/FileExplorer/FileExplorer';

export default {
  name: 'SidebarSANS2D',
  components: {
    'v-file-explorer': FileExplorer,
  },
};
</script>

<style lang='scss' scoped>

</style>
