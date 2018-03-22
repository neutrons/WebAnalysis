<script>
import { mapState, mapActions } from 'vuex';
import FilesList from './FilesList';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FilesListSANSStitch',
  extends: FilesList,
  computed: {
    ...mapState('SANS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('SANS/Stitch', {
      filesSelected: state => state.filesSelected,
      filters: state => state.filters,
    }),
    selected: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        // Call action to add file
        // return a promise and then emmit
        // event to plot data
        this.updateFilesSelected(value)
          .then(() => {
            eventBus.$emit('redraw-chart-sans-stitch');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
  },
  methods: {
    ...mapActions('SANS/Stitch', [
      'updateFilesSelected',
    ]),
  },
};

</script>