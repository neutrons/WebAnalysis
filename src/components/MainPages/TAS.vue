<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import parseData from '../../assets/js//readFiles/parse/TAS';
import Main from './MainPage';

export default {
  name: 'TAS',
  extends: Main,
  mixins: [
    parseData,
  ],
  computed: {
    ...mapState('TAS', {
      ID: state => state.ID,
      filesToPlot: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
    ...mapGetters('TAS', [
      'getURLs',
      'getSavedFile',
    ]),
  },
  methods: {
    ...mapMutations('TAS', [
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
      }
    },
  },
};
</script>