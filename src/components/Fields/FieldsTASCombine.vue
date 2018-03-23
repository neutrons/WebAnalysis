<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Fields from './Fields';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'FieldsTASCombine',
  extends: Fields,
  computed: {
    ...mapGetters('TAS/Combine', [
      'getFields',
    ]),
    ...mapState('TAS/Combine', {
      field: state => state.field,
      isNormalized: state => state.isNormalized,
    }),
    selectX: {
      get() {
        return this.field.x;
      },
      set(value) {
        // check if data is normalized if so trigger reset
        // then trigger change field then update chart
        if (this.isNormalized) this.resetNormalizedData();

        this.setXField(value)
        .then(() => {
          eventBus.$emit('redraw-chart-tas-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
      },
    },
    selectY: {
      get() {
        return this.field.y;
      },
      set(value) {
        // check if data is normalized if so trigger reset
        // then trigger change field then update chart
        if (this.isNormalized) this.resetNormalizedData();

        this.setYField(value)
        .then(() => {
          eventBus.$emit('redraw-chart-tas-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
      },
    },
  },
  methods: {
    ...mapActions('TAS/Combine', [
      'setXField',
      'setYField',
      'resetNormalizedData',
    ]),
  },
};
</script>