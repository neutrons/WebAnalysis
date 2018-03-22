<script>
import { mapState, mapActions } from 'vuex';
import FitList from './FitList';

import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'FitListTAS',
  extends: FitList,
  computed: {
    ...mapState('TAS/Fit', {
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
            eventBus.$emit('redraw-chart-tas-fit');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
  },
  methods: {
    ...mapActions('TAS/Fit', [
      'updateFileToFit',
    ]),
  },
};

</script>