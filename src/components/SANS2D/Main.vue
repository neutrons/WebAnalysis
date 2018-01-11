<template>
    <v-container fluid class='main-container'>
        <p>Files to plot: {{fileToPlot}}</p>
        <p>Hex Bin Size: {{hexBinSize}}</p>
        <p>Hex Scale: {{hexScale}}</p>
        <p>Data to plot: {{selectedData}}</p>
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

// Import Mixins
import read2DData from '../../assets/js/readFiles/readSANS2D';
import parseData from '../../assets/js//readFiles/parse/SANS2D';

export default {
  name: 'SANS2D',
  mixins: [
    read2DData,
    parseData,
  ],
  computed: {
    ...mapState('SANS2D', {
      ID: state => state.ID,
      fileToPlot: state => state.filesSelected,
      selectedData: state => state.selectedData,
      hexBinSize: state => state.hexBinSize,
      hexScale: state => state.hexScale,
    }),
    ...mapGetters('SANS2D', [
      'getSavedFile',
      'getURLs',
    ]),
  },
  methods: {
    ...mapMutations('SANS2D', [
      'setCurrentData',
      'storeData',
      'resetAll',
    ]),
  },
  watch: {
    fileToPlot() {
      if (this.fileToPlot === null || this.fileToPlot.length === 0) {
        this.resetAll();
      } else {
        const vm = this;
        let fileURLs = [];

        // First check if files to plot are in stored data
        let tempData = [];
        const temp = vm.getSavedFile(this.fileToPlot);

        if (temp === '999' || temp === undefined) {
          fileURLs = this.getURLs([this.fileToPlot]);
        } else {
          tempData = temp;
        }

        if (fileURLs.length > 0) {
          this.read2DData(fileURLs, tempData);
        } else {
          this.setCurrentData(tempData);
        }
      }
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
