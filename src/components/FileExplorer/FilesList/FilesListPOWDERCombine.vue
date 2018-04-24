<script>
import { mapState, mapActions } from 'vuex';
import FilesList from './FilesList';

import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FilesListPOWDERCombine',
  extends: FilesList,
  computed: {
    ...mapState('POWDER', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('POWDER/Combine', {
      filesSelected: state => state.filesSelected,
      filters: state => state.filters,
    }),
    selected: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        // Call action to add file return a promise and then emmit event to plot data
        const payload = { filelist: value, group: 'POWDER' };

        this.updateFilesSelected(payload)
          .then(() => {
            eventBus.$emit('redraw-chart-powder-combine');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
  },
  methods: {
    ...mapActions('POWDER/Combine', [
      'updateFilesSelected',
    ]),
  },
};

</script>