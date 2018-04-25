<template>
  <div>
    <v-flex xs12 v-if='vcorrErrorMsg !== null'>
      <v-alert 
        outline
        :value='true'
        type='warning'
        transition='fade-transition'
        icon='fa-exclamation-triangle'
        class='pa-2'
      >{{ vcorrErrorMsg }}</v-alert>
    </v-flex>

    <v-flex xs12 v-if='differentVcorrErrorMsg !== null'>
      <v-alert 
        outline
        :value='true'
        type='warning'
        transition='fade-transition'
        icon='fa-exclamation-triangle'
        class='pa-2'
      >{{ differentVcorrErrorMsg }}</v-alert>
    </v-flex>

    <v-flex xs12>
      <v-select
        :items='items'
        v-model='selected'
        item-text='name'
        item-value='value'
        label='VCorr (file to normalize data)'
        hint='Select file to Normalize Data'
      />
    </v-flex>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'VCorrSelect',
  created() {
    this.setDefaultVCorr();
  },
  data() {
    return {
      m1Error: false,
      colltransError: false,
      isDifferentVcorr: false,
    };
  },
  computed: {
    ...mapState('POWDER', {
      vcorrFiles: state => state.normalizeFilesData.vcorr,
    }),
    ...mapState('POWDER/Combine', {
      normalizeByVCorr: state => state.normalizeByVCorr,
      selectedData: state => state.selectedData,
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
    vcorrErrorMsg() {
      if (this.m1Error && this.colltransError) {
        return 'Colltrans is not -80 nor 80 AND M1 is not 9.45 nor 0. Assuming VCorr Ge_115_OUT.';
      } else if (this.m1Error) {
        return 'M1 is not 9.45 nor 0. Assuming VCorr Ge_115.';
      } else if (this.colltransError) {
        return 'Colltrans is not -80 nor 80. Assuming VCorr OUT.';
      }

      return null;
    },
    differentVcorrErrorMsg() {
      if (this.isDifferentVcorr) {
        return 'Atleast one or more files require different VCorr.';
      }

      return null;
    },
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'setNormalizeByVCorr',
    ]),
    resetVcorrErrors() {
      this.m1Error = false;
      this.colltransError = false;
      this.isDifferentVcorr = false;
    },
    vcorrErrors() {
      // Function checks if all plotted curves share same vcorr file
      // and whether one of the default vcorr files was selected
      const vcorrChecks = [];

      this.selectedData.forEach((curve, index) => {
        if (curve.vcorr.colltransError) this.isColltransError = true;
        if (curve.vcorr.m1Error) this.isM1Error = true;

        if (!index || vcorrChecks.indexOf(curve.vcorr.filename) > -1) {
          vcorrChecks.push(curve.vcorr.filename);
        } else {
          this.isDifferentVcorr = true;
        }
      });

      return false;
    },
    setDefaultVCorr() {
      // Get vcorr file depending on first plotted data
      const vcorr = this.selectedData[0].vcorr.filename;
      this.selected = this.vcorrFiles[vcorr];

      this.resetVcorrErrors();
      this.vcorrErrors();
    },
  },
  watch: {
    selectedData() {
      this.resetVcorrErrors();
      this.vcorrErrors();
    },
  },
};
</script>
