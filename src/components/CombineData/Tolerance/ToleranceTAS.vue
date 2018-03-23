<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import Tolerance from './Tolerance';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'ToleranceTAS',
  extends: Tolerance,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Combine', {
      defaultSettings: state => state.defaultSettings,
      tolerance: state => state.tolerance,
      combData: state => state.combinedData,
      storedCombined: state => state.storedCombined,
    }),
    ...mapGetters('TAS/Combine', [
      'getPreparedData',
    ]),
    editTolerance: {
      get() {
        return this.tolerance;
      },
      set(value) {
        this.setTolerance(value);
      },
    },
    filenameList() {
      const k1 = Object.keys(this.fetched);
      const k2 = Object.keys(this.uploaded);
      const k3 = Object.keys(this.storedCombined);
      return [].concat.apply([], [k1, k2, k3]);
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'setTolerance',
    ]),
    ...mapActions('TAS/Combine', [
      'storeCombinedData',
      'combineData',
      'removeCombinedData',
    ]),
    onCombineData() {
      // trigger action to combine data then update chart
      this.combineData(this.getPreparedData)
        .then(() => {
          eventBus.$emit('redraw-chart-tas-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    onRemoveCombinedData() {
      this.removeCombinedData()
        .then(() => {
          eventBus.$emit('redraw-chart-tas-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error, 'error');
        });
    },
    storeCombine() {
      const group = this.$route.meta.group;
      this.storeCombinedData({ group, name: this.editCombineName })
        .then(() => {
          eventBus.$emit('redraw-chart-tas-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
  },
};

</script>