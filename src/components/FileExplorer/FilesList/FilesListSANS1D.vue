<script>
import { mapState, mapActions } from 'vuex';
import FilesList from './FilesList';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FilesListSANS1D',
  extends: FilesList,
  computed: {
    ...mapState('SANS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('SANS/Fit', {
      filesSelected: state => state.filesSelected,
      filters: state => state.filters,
      fileToFit: state => state.fileToFit,
    }),
    selected: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        // Remove file to fit if file no longer is in file list
        const currentListLength = this.filesSelected.length;
        const inNewList = value.indexOf(this.fileToFit);

        if (currentListLength !== 0 && inNewList === -1) this.updateFileToFit(null);

        // Call action to add file return a promise and then emmit event to plot data
        this.updateFilesSelected(value)
          .then(() => {
            eventBus.$emit('redraw-chart-sans-fit');
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
    ...mapActions('SANS/Fit', [
      'updateFileToFit',
      'updateFilesSelected',
    ]),
  },
};

</script>