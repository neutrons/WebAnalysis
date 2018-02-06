<script>
import { mapState, mapMutations } from 'vuex';
import FitList from './FitList';

export default {
  name: 'FitListSANS1D',
  extends: FitList,
  computed: {
    ...mapState('SANS', {
      filesToFit: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
    selected: {
      get() {
        return this.fileToFit;
      },
      set(value) {
        this.updateFileToFit(value);
      },
    },
  },
  methods: {
    ...mapMutations('SANS', [
      'updateFileToFit',
    ]),
  },
};

</script>