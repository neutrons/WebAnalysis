<template>
<v-expansion-panel expand>
  <v-expansion-panel-content :value='true'>
    <div slot='header' class='title'>Files to Combine</div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-filter-list />
        </v-flex>
        
        <v-flex xs12>
          <v-file-list />
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>

  <v-scales v-if='selectedData.length' />
  <v-exclude-detectors v-if='selectedData.length' />

  <v-expansion-panel-content :value='true' v-if='selectedData.length'>
    <div slot='header' class='title'>Normalize</div>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-combine-normalize />
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>

  <v-expansion-panel-content :value='true' v-if='selectedData.length && isNormalized'>
    <div slot='header' class='title'>Combine</div>
    <v-container>
      <v-layout row>        
        <v-flex xs12>
          <v-combine-tolerance />
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapState } from 'vuex';

import FilterList from '../../../FileExplorer/FilterList/FilterListPOWDERCombine';
import FilesListPOWDERCombine from '../../../FileExplorer/FilesList/FilesListPOWDERCombine';
import CombineNormalize from '../../../CombineData/Normalize/NormalizePOWDER';
import CombineTolerance from '../../../CombineData/Tolerance/TolerancePOWDER';
import Scales from '../../../Scales/ScalesPOWDERCombine';
import ExcludeDetectors from './ExcludeDetectors';

export default {
  name: 'SidebarPOWDERCombine',
  components: {
    'v-filter-list': FilterList,
    'v-file-list': FilesListPOWDERCombine,
    'v-combine-normalize': CombineNormalize,
    'v-combine-tolerance': CombineTolerance,
    'v-scales': Scales,
    'v-exclude-detectors': ExcludeDetectors,
  },
  computed: {
    ...mapState('POWDER/Combine', {
      selectedData: state => state.selectedData,
      isNormalized: state => state.isNormalized,
    }),
  },
};
</script>

<style lang='scss'>

</style>
