<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import parseData from '../../assets/js//readFiles/parse/SANS1D';
import Main from './MainPage';

export default {
  name: 'SANS1D',
  extends: Main,
  mixins: [
    parseData,
  ],
  computed: {
    ...mapState('SANS1D', {
      ID: state => state.ID,
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
    fileToFit() {
      if (this.fileToFit === null) {
        this.resetFitConfiguration();
        if (this.ID === 'SANS1D') this.transformData();
      }
    },
  },
};
</script>