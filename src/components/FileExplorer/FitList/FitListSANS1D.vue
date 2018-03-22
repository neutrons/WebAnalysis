<script>
import { mapState, mapActions } from 'vuex';
import FitList from './FitList';

import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FitListSANS1D',
  extends: FitList,
  computed: {
    ...mapState('SANS/Fit', {
      filesToFit: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
    selected: {
      get() {
        return this.fileToFit;
      },
      set(value) {
        // trigger action to update file to fit
        // wait for response before updating chart
        this.updateFileToFit(value)
          .then(() => {
            eventBus.$emit('redraw-chart-sans-fit');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
  },
  methods: {
    ...mapActions('SANS/Fit', [
      'updateFileToFit',
    ]),
  },
};

</script>