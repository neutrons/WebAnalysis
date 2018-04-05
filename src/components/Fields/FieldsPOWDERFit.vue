<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Fields from './Fields';

import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'FieldsPOWDERFit',
  extends: Fields,
  computed: {
    ...mapGetters('POWDER/Fit', [
      'getFields',
    ]),
    ...mapState('POWDER/Fit', {
      field: state => state.field,
    }),
    selectX: {
      get() {
        return this.field.x;
      },
      set(value) {
        this.setXField(value)
          .then(() => {
            eventBus.$emit('redraw-chart-powder-fit');
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
        this.setYField(value)
          .then(() => {
            eventBus.$emit('redraw-chart-powder-fit');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
  },
  methods: {
    ...mapActions('POWDER/Fit', [
      'setXField',
      'setYField',
    ]),
  },
};
</script>