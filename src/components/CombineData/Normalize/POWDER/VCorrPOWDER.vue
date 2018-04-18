<template>
  <v-select
    :items='items'
    v-model='selected'
    item-text='name'
    item-value='value'
    return-object
    label='VCorr (file to normalize data)'
    hint='Select file to Normalize Data'
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'VCorrSelect',
  created() {
    this.selected = this.items[0];
  },
  computed: {
    ...mapState('POWDER', {
      vcorrFiles: state => state.normalizeFilesData.vcorr,
    }),
    ...mapState('POWDER/Combine', {
      normalizeByVCorr: state => state.normalizeByVCorr,
    }),
    items() {
      const result = [];

      /* eslint-disable */
      // get an array of objects for vcorr filenames and data values
      for (let key in this.vcorrFiles) {
        result.push({
          name: key,
          value: this.vcorrFiles[key],
        });
      }
      /* eslint-enable*/

      return result;
    },
    selected: {
      get() {
        return this.normalizeByVCorr;
      },
      set(value) {
        // when a vcorr file is selected update the state with file's data
        this.setNormalizeByVCorr(value);
      },
    },
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'setNormalizeByVCorr',
    ]),
  },
};
</script>
