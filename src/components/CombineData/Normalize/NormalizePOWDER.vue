<template>
<div>
  <!-- Add three inputs -->
  <!-- gaps -->
  <!-- exclude detectors -->
  <!-- vcorr -->
  <v-tooltip top :close-delay='1' :disabled='isNormalized || !valid'>
    <v-btn slot='activator' outline block flat color='success' @click='onNormalizeData' :disabled='isNormalized || !valid'>Normalize Data</v-btn>
    <span>Click to normalize data</span>
  </v-tooltip>
  <v-tooltip top :close-delay='1' :disabled='!isNormalized || !valid'>
    <v-btn slot='activator' outline block flat color='warning' @click='onResetNormalizedData' :disabled='!isNormalized || !valid'>Reset Data</v-btn>
    <span>Click to reset normalized data</span>
  </v-tooltip>
</div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

// import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'NormalizePOWDER',
  data() {
    return {
      valid: true,
    };
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
      console.log('normalize powder data');
    },
    onResetNormalizedData() {
      console.log('reset normalize powder data');
    },
  },
};
</script>
