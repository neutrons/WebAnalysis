<template>
<div> 
  <!-- Component to select files to normalize by vcorr data -->
  <v-vcorr-select ref='vcorr' v-if='!noVcorrFiles' />

  <!-- If no vcorr files available show error message and prevent normalizing -->
  <v-alert 
    outline
    :value='noVcorrFiles'
    type='warning'
    transition='fade-transition'
    icon='fa-exclamation-triangle'
    class='pa-2'
  >No Vcorr files available for normalize. Please upload vcorr file.</v-alert>

  <v-tooltip top :close-delay='1' :disabled='isNormalized'>
    <v-btn slot='activator' outline block flat color='success' @click='onNormalizeData' :disabled='isNormalized || noVcorrFiles'>Normalize Data</v-btn>
    <span>Click to normalize data</span>
  </v-tooltip>
  <v-tooltip top :close-delay='1' :disabled='!isNormalized'>
    <v-btn slot='activator' outline block flat color='warning' @click='onResetNormalizedData' :disabled='!isNormalized || noVcorrFiles'>Reset Data</v-btn>
    <span>Click to reset normalized data</span>
  </v-tooltip>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import { eventBus } from '../../../../assets/js/eventBus';

export default {
  name: 'NormalizePOWDER',
  components: {
    'v-vcorr-select': () => import('./VCorrPOWDER'),
  },
  data() {
    return {
      valid: true,
    };
  },
  computed: {
    ...mapState('POWDER/Combine', {
      isNormalized: state => state.isNormalized,
    }),
    ...mapState('POWDER', {
      vcorrFiles: state => state.normalizeFilesData.vcorr,
    }),
    noVcorrFiles() {
      return this.vcorrFiles.length === 0;
    },
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'setNormalizeValue',
      'setNormalizeField',
    ]),
    ...mapActions('POWDER/Combine', [
      'normalizeData',
      'resetNormalizedData',
    ]),
    onNormalizeData() {
      this.normalizeData()
        .then(() => {
          eventBus.$emit('redraw-chart-powder-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    onResetNormalizedData() {
      // reset the vcorr file
      this.$refs.vcorr.setDefaultVCorr();

      this.resetNormalizedData()
        .then(() => {
          eventBus.$emit('redraw-chart-powder-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
  },
};
</script>
