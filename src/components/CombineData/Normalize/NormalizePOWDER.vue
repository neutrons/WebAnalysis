<template>
<div>
  <!-- Add three inputs -->
  <!-- gaps -->
  <!-- exclude detectors -->
  <!-- vcorr -->
  <v-tooltip top :close-delay='1' :disabled='isNormalized'>
    <v-btn slot='activator' outline block flat color='success' @click='onNormalizeData' :disabled='isNormalized'>Normalize Data</v-btn>
    <span>Click to normalize data</span>
  </v-tooltip>
  <v-tooltip top :close-delay='1' :disabled='!isNormalized'>
    <v-btn slot='activator' outline block flat color='warning' @click='onResetNormalizedData' :disabled='!isNormalized'>Reset Data</v-btn>
    <span>Click to reset normalized data</span>
  </v-tooltip>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

// import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'NormalizePOWDER',
  data() {
    return {
      valid: true,
    };
  },
  computed: {
    ...mapState('POWDER/Combine', {
      isNormalized: state => state.isNormalized,
    }),
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
      this.normalizeData();
    },
    onResetNormalizedData() {
      this.resetNormalizedData();
    },
  },
};
</script>
