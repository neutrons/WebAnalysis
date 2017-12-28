<template>
  <div>
    <!-- File List -->
    <v-file-explorer />

    <!-- Scales -->
    <v-scales />
    
    <!-- Transformations -->
    <v-transformations />

    <!-- Fit Equations -->
    <v-fit-configuration />
  </div>
</template>

<script>
import FileExplorer from '../BaseComponents/FileExplorer/FileExplorer';
import Scales from '../BaseComponents/Scales';
import Transformations from '../BaseComponents/Transformations';
import FitConfiguration from '../BaseComponents/FitConfiguration';

export default {
  name: 'SidebarSANS1D',
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-transformations': Transformations,
    'v-fit-configuration': FitConfiguration,
  },
};
</script>

<style lang='scss' scoped>

</style>
