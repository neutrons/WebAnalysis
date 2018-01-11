<template>
    <v-container fluid class='main-container'>
        <p>Files to plot: {{filesToPlot}}</p>
        <p>File to fit: {{fileToFit}}</p>
        <p>Data to plot: {{selectedData}}</p>
        <p>Plot scales: {{plotScales}}</p>
        <p>Plot Fields: {{fields}}</p>
        <p>Fit Settings: {{fitSettings}}</p>
        <p>Fit Equation: {{fitEquation}}</p>
        <p>Fit Initial Values: {{fitInitialValues}}</p>
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import _ from 'lodash';

// Import Mixins
import read1DData from '../../assets/js/readFiles/default';
import parseData from '../../assets/js//readFiles/parse/TAS';

export default {
  name: 'TAS',
  mixins: [
    read1DData,
    parseData,
  ],
  computed: {
    ...mapState('TAS', {
      ID: state => state.ID,
      filesToPlot: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
      selectedData: state => state.selectedData,
      plotScales: state => state.plotScale,
      fields: state => state.field,
      fitSettings: state => state.fitSettings,
      fitEquation: state => state.fitEquation,
      fitInitialValues: state => state.fitInitialValues,
    }),
    ...mapGetters('TAS', [
      'getSavedFile',
      'getURLs',
    ]),
  },
  methods: {
    ...mapMutations('TAS', [
      'resetAll',
      'setCurrentData',
      'resetFitConfiguration',
      'storeData',
    ]),
  },
  watch: {
    filesToPlot() {
      if (this.filesToPlot.length === 0) {
        this.resetAll();
      } else {
        const tempFilesToPlot = _.cloneDeep(this.filesToPlot);
        const vm = this;
        const filesToFetch = [];

        // First check if files to plot are in stored data
        const tempData = tempFilesToPlot.map((filename) => {
          const temp = vm.getSavedFile(filename);

          if (temp === '999') {
            filesToFetch.push(filename);
          }

          return temp;
        }).filter(item => item !== undefined && item !== '999');

        // Next fetch the file URLs
        const fileURLs = this.getURLs(filesToFetch);

        if (fileURLs.length > 0) {
          this.read1DData(fileURLs, tempData);
        } else {
          this.setCurrentData(tempData);
        }
      }
    },
    fileToFit() {
      if (this.fileToFit === null) {
        this.resetFitConfiguration();
      }
    },
  },
};
</script>

<style lang='scss' scoped>

</style>