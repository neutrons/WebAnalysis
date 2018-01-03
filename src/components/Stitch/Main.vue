<template>
    <v-container fluid class='main-container'>
        <h4>{{msg}}</h4>
        <p>Files to plot: {{filesToPlot}}</p>
        <p>Data to plot: {{selectedData}}</p>
        <p>Plot scales: {{plotScales}}</p>
        <p>Zoom Brush Toggle: {{zoomBrush}}</p>
    </v-container>
</template>

<script>
import _ from 'lodash';

// Import Mixins
import getTitle from '../../assets/js/getTitle';
import read1DData from '../../assets/js/readFiles/default';
import parseData from '../../assets/js//readFiles/parse/SANS1D';

export default {
  name: 'Stitch',
  mixins: [
    getTitle,
    read1DData,
    parseData,
  ],
  data() {
    return {
      msg: 'Welcome to Stitch!',
      ID: 'Stitch',
    };
  },
  computed: {
    filesToPlot() {
      return this.$store.state[this.ID].filesSelected;
    },
    selectedData() {
      return this.$store.state[this.ID].selectedData;
    },
    plotScales() {
      return this.$store.state[this.ID].plotScale;
    },
    zoomBrush() {
      return this.$store.state[this.ID].isZoomBrush;
    },
  },
  watch: {
    filesToPlot() {
      if (this.filesToPlot.length === 0) {
        this.$store.commit(`${this.title}/resetAll`);
      } else {
        const tempFilesToPlot = _.cloneDeep(this.filesToPlot);
        const vm = this;
        const filesToFetch = [];

        // First check if files to plot are in stored data
        const tempData = tempFilesToPlot.map((filename) => {
          const temp = vm.$store.getters[`${this.title}/getSavedFile`](filename);

          if (temp === '999') {
            filesToFetch.push(filename);
          }

          return temp;
        }).filter(item => item !== undefined && item !== '999');

        // Next fetch the file URLs
        const fileURLs = this.$store.getters[`${this.title}/getURLs`](filesToFetch);

        if (fileURLs.length > 0) {
          this.read1DData(fileURLs, tempData);
        } else {
          this.$store.dispatch(`${this.title}/setCurrentData`, tempData);
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
