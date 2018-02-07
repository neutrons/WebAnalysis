<script>
import { mapState, mapMutations } from 'vuex';
import FitList from './FitList';

export default {
  name: 'FitListTAS',
  extends: FitList,
  computed: {
    ...mapState('TAS/Fit', {
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
    ...mapMutations('TAS/Fit', [
      'updateFileToFit',
    ]),
  },
};

</script>