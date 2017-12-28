<template>
  <div>
    <!-- File List -->
    <v-file-explorer :fits='false'/>

    <!-- Scales -->
    <v-scales />
  </div>
</template>

<script>
import FileExplorer from '../BaseComponents/FileExplorer/FileExplorer';
import Scales from '../BaseComponents/Scales';

export default {
  name: 'SidebarStitch',
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
  },
};
</script>

<style lang='scss' scoped>

</style>
