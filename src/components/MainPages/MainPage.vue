<template>
    <div>
      <keep-alive>
        <component :is='`Chart${ID}`' :ID='ID'></component>
      </keep-alive>
    </div>
</template>

<script>
import _ from 'lodash';

// Import Mixins
import read1DData from '../../assets/js/readFiles/default';

export default {
  name: 'MainPage',
  mixins: [
    read1DData,
  ],
  components: {
    ChartSANS1D: () => import('../Chart1D/ChartSANS1D'),
    ChartStitch: () => import('../Chart1D/ChartStitch'),
    ChartTAS: () => import('../Chart1D/ChartTAS'),
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

<style lang='scss'>
</style>
