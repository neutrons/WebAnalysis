<script>
import { mapState, mapActions } from 'vuex';
import Add from './Add';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FilesListTAS',
  extends: Add,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Combine', {
      filesToAdd: state => state.filesToAdd,
      filesToSubtract: state => state.filesToSubtract,
      filters: state => state.filters,
      storedCombined: state => state.storedCombined,
    }),
    selected: {
      get() {
        return this.filesToAdd;
      },
      set(value) {
        const payload = { type: 'add', files: value };
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