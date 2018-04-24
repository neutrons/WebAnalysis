<script>
import { mapState, mapActions } from 'vuex';
import FitList from './FitList';

export default {
  name: 'FitListTAS',
  extends: FitList,
  computed: {
    ...mapState('TAS/Fit', {
      filesToFit: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
  },
  methods: {
    ...mapActions('TAS/Fit', [
      'updateFileToFit',
    ]),
  },
};

</script>