<template>
    <v-container fluid class='main-container'>
        <p>Files to plot: {{filesToPlot}}</p>
        <p>Plot scales: {{plotScales}}</p>
        <p>Zoom Brush Toggle: {{zoomBrush}}</p>
        <p>Data to plot: {{selectedData}}</p>
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import _ from 'lodash';

// Import Mixins
import read1DData from '../../assets/js/readFiles/default';
import parseData from '../../assets/js//readFiles/parse/SANS1D';

export default {
  name: 'Stitch',
  mixins: [
    read1DData,
    parseData,
  ],
  computed: {
    ...mapState('Stitch', {
      ID: state => state.ID,
      filesToPlot: state => state.filesSelected,
      selectedData: state => state.selectedData,
      plotScales: state => state.plotScale,
      zoomBrush: state => state.isZoomBrush,
    }),
    ...mapGetters('Stitch', [
      'getSavedFile',
      'getURLs',
    ]),
  },
  methods: {
    ...mapMutations('Stitch', [
      'resetAll',
      'setCurrentData',
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
  },
};
</script>

<style lang='scss' scoped>

</style>
