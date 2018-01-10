<template>
    <div>
      <v-chart></v-chart>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import _ from 'lodash';
import Chart from './Chart';

// Import Mixins
import read1DData from '../../assets/js/readFiles/default';
import parseData from '../../assets/js//readFiles/parse/SANS1D';

export default {
  name: 'SANS1D',
  mixins: [
    read1DData,
    parseData,
  ],
  components: {
    'v-chart': Chart,
  },
  data() {
    return {
      drawerRight: null,
    };
  },
  computed: {
    ...mapState('SANS1D', {
      filesToPlot: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
    ...mapGetters('SANS1D', [
      'getURLs',
      'getSavedFile',
    ]),
  },
  methods: {
    ...mapMutations('SANS1D', [
      'setCurrentData',
      'resetFitConfiguration',
      'storeData',
      'resetAll',
      'transformData',
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
        this.transformData();
      }
    },
  },
};
</script>

<style lang='scss'>
</style>
