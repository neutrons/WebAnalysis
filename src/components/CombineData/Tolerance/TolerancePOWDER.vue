<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import Tolerance from './Tolerance';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'TolerancePOWDER',
  extends: Tolerance,
  computed: {
    ...mapState('POWDER', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('POWDER/Combine', {
      defaultSettings: state => state.defaultSettings,
      tolerance: state => state.tolerance,
      combData: state => state.combinedData,
      storedCombined: state => state.storedCombined,
    }),
    ...mapGetters('POWDER/Combine', [
      'getPreparedData',
    ]),
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'setTolerance',
    ]),
    ...mapActions('POWDER/Combine', [
      'storeCombinedData',
      'combineData',
      'removeCombinedData',
    ]),
    onCombineData() {
      // trigger action to combine data then update chart
      this.combineData(this.getPreparedData)
        .then(() => {
          eventBus.$emit('redraw-chart-powder-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    onRemoveCombinedData() {
      this.removeCombinedData()
        .then(() => {
          eventBus.$emit('redraw-chart-powder-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error, 'error');
        });
    },
    storeCombine() {
      const group = this.$route.meta.group;
      this.storeCombinedData({ group, name: this.editCombineName })
        .then(() => {
          eventBus.$emit('redraw-chart-powder-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
  },
};

</script>