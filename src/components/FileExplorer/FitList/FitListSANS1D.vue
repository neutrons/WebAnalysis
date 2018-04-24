<script>
import { mapState, mapActions } from 'vuex';
import FitList from './FitList';

export default {
  name: 'FitListSANS1D',
  extends: FitList,
  computed: {
    ...mapState('SANS/Fit', {
      filesToFit: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
  },
  methods: {
    ...mapActions('SANS/Fit', [
      'updateFileToFit',
    ]),
  },
};

</script>