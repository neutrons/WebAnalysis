<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Normalize from './Normalize';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'NormalizeTAS',
  extends: Normalize,
  computed: {
    ...mapState('TAS/Combine', {
      defaultSettings: state => state.defaultSettings,
      normalizeValue: state => state.normalizeValue,
      normalizeOptions: state => state.normalizeOptions,
      normalizeField: state => state.normalizeField,
      isNormalized: state => state.isNormalized,
    }),
    editNormalizeField: {
      get() {
        return this.normalizeField;
      },
      set(value) {
        this.setNormalizeField(value);
      },
    },
    editNormalizeValue: {
      get() {
        return this.normalizeValue;
      },
      set(value) {
        this.setNormalizeValue(value);
      },
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'setNormalizeValue',
      'setNormalizeField',
    ]),
    ...mapActions('TAS/Combine', [
      'normalizeData',
      'resetNormalizedData',
    ]),
    onNormalizeData() {
      this.normalizeData()
        .then(() => {
          eventBus.$emit('redraw-chart-tas-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    onResetNormalizedData() {
      this.resetNormalizedData()
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