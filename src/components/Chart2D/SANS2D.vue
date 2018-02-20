<template>
<div>
  <keep-alive>
    <v-chart :ID='ID'></v-chart>
  </keep-alive>
</div>
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
  components: {
    'v-chart': () => import('../Chart2D/ChartSANS2D'),
  },
  computed: {
    ...mapState('SANS/SANS2D', {
      ID: state => state.ID,
      fileToPlot: state => state.filesSelected,
      hexBinSize: state => state.hexBinSize,
      hexScale: state => state.hexScale,
    }),
    ...mapGetters('SANS/SANS2D', [
      'getSavedFile',
      'getURLs',
      'getPreparedData',
    ]),
  },
  methods: {
    ...mapMutations('SANS/SANS2D', [
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
