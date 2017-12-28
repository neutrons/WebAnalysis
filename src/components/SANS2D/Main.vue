<template>
    <v-container fluid class='main-container'>
        <h4>{{msg}}</h4>
        <p>Files to plot: {{fileToPlot}}</p>
        <p>Data to plot: {{selectedData}}</p>
    </v-container>
</template>

<script>
import getTitle from '../../assets/js/getTitle';

// Import Mixins
import read2DData from '../../assets/js/readFiles/readSANS2D';
import parseData from '../../assets/js//readFiles/parse/SANS2D';

export default {
  name: 'SANS2D',
  mixins: [
    getTitle,
    read2DData,
    parseData,
  ],
  data() {
    return {
      msg: 'Welcome to SANS2D!',
      ID: 'SANS2D',
    };
  },
  computed: {
    fileToPlot() {
      return this.$store.state[this.ID].filesSelected;
    },
    selectedData() {
      return this.$store.state[this.ID].selectedData;
    },
  },
  watch: {
    fileToPlot() {
      if (this.fileToPlot === null || this.fileToPlot.length === 0) {
        this.$store.commit(`${this.title}/resetCurrentData`);
      } else {
        const vm = this;
        let fileURLs = [];

        // First check if files to plot are in stored data
        let tempData = [];
        const temp = vm.$store.getters[`${this.title}/getSavedFile`](this.fileToPlot);

        if (temp === '999' || temp === undefined) {
          fileURLs = this.$store.getters[`${this.title}/getURLs`]([this.fileToPlot]);
        } else {
          tempData = temp;
        }

        if (fileURLs.length > 0) {
          this.read2DData(fileURLs, tempData);
        } else {
          this.$store.commit(`${this.title}/setCurrentData`, tempData);
        }
      }
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
