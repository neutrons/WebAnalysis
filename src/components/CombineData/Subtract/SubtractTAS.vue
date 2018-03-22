<script>
import { mapState, mapActions } from 'vuex';
import Subtract from './Subtract';
import { eventBus } from '../../../assets/js/eventBus';

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
      storedCombined: state => state.storedCombined,
    }),
    selected: {
      get() {
        return this.filesToSubtract;
      },
      set(value) {
        const payload = { type: 'substract', files: value };

        this.updateFilesSelected(payload)
          .then(() => {
            eventBus.$emit('redraw-chart-tas-combine');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded, this.storedCombined);
    },
  },
  methods: {
    ...mapActions('TAS/Combine', [
      'updateFilesSelected',
    ]),
  },
};

</script>