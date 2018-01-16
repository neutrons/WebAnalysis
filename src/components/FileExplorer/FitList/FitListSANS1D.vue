<script>
import { mapState, mapMutations } from 'vuex';
import FitList from './FitList';

export default {
  name: 'FitListSANS1D',
  extends: FitList,
  computed: {
    ...mapState('SANS1D', {
      filesToFit: state => state.filesSelected,
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
    ...mapMutations('SANS1D', [
      'updateFileToFit',
    ]),
  },
};

</script>