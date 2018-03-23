<script>
import { mapState, mapActions } from 'vuex';
import Scales from './Scales';

import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'ScalesTAS',
  extends: Scales,
  computed: {
    ...mapState('TAS/Fit', {
      scales: state => state.scale,
      xScaleLabel: state => state.plotScale.x.label,
      yScaleLabel: state => state.plotScale.y.label,
    }),
    xScales() {
      return Object.keys(this.scales.x);
    },
    selectX: {
      get() {
        return this.xScaleLabel;
      },
      set(value) {
        // trigger action and wait for a response once a response is returned update chart
        this.setXScale(value)
          .then(() => {
            eventBus.$emit('redraw-chart-tas-fit');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
    yScales() {
      return Object.keys(this.scales.y);
    },
    selectY: {
      get() {
        return this.yScaleLabel;
      },
      set(value) {
        // trigger action and wait for a response once a response is returned update chart
        this.setYScale(value)
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
      'resetScales',
      'setYScale',
      'setXScale',
    ]),
    resetPlotScales() {
      if (this.xScaleLabel !== 'x' || this.yScaleLabel !== 'y') {
        this.resetScales()
          .then(() => {
            eventBus.$emit('redraw-chart-tas-fit');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      }
    },
  },
};

</script>