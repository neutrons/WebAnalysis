<script>
import { mapState, mapMutations } from 'vuex';
import Subtract from './Subtract';

export default {
  name: 'SubtractTAS',
  extends: Subtract,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Combine', {
      filesToSubtract: state => state.filesToSubtract,
      filesToAdd: state => state.filesToAdd,
      filters: state => state.filters,
    }),
    selected: {
      get() {
        return this.filesToSubtract;
      },
      set(value) {
        this.updateFilesToSubtract(value);
      },
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'updateFilesToSubtract',
    ]),
  },
};

</script>