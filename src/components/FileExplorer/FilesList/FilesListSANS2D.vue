<script>
import { mapState, mapActions } from 'vuex';
import FilesList from './FilesList';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FilesListSANS2D',
  extends: FilesList,
  computed: {
    ...mapState('SANS/SANS2D', {
      filesSelected: state => state.filesSelected,
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
      filters: state => state.filters,
    }),
    selected: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        const tempSelect = value === null ? [] : [value];
        // Call action to add file return a promise and then emmit event to plot data
        this.updateFilesSelected(tempSelect)
          .then(() => {
            eventBus.$emit('redraw-chart-sans-2d');
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
    ...mapActions('SANS/SANS2D', [
      'updateFilesSelected',
    ]),
  },
};

</script>