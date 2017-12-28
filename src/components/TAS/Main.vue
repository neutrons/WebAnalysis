<template>
    <v-container fluid class='main-container'>
        <h4>{{msg}}</h4>
        <p>Files to plot: {{filesToPlot}}</p>
        <p>File to fit: {{fileToFit}}</p>
        <p>Data to plot: {{selectedData}}</p>
        <p>Plot scales: {{plotScales}}</p>
    </v-container>
</template>

<script>
import _ from 'lodash';
import getTitle from '../../assets/js/getTitle';

// Import Mixins
import read1DData from '../../assets/js/readFiles/default';
import parseData from '../../assets/js//readFiles/parse/TAS';

export default {
  name: 'TAS',
  mixins: [
    getTitle,
    read1DData,
    parseData,
  ],
  data() {
    return {
      msg: 'Welcome to TAS!',
      ID: 'TAS',
    };
  },
  computed: {
    filesToPlot() {
      return this.$store.state[this.ID].filesSelected;
    },
    fileToFit() {
      return this.$store.state[this.ID].fileToFit;
    },
    selectedData() {
      return this.$store.state[this.ID].selectedData;
    },
    plotScales() {
      return this.$store.state[this.ID].plotScale;
    },
  },
  watch: {
    filesToPlot() {
      if (this.filesToPlot.length === 0) {
        this.$store.commit(`${this.title}/resetCurrentData`);
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