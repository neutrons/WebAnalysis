<script>
import { mapState, mapMutations } from 'vuex';
import Scales from './Scales';

export default {
  name: 'ScalesSANS1D',
  extends: Scales,
  computed: {
    ...mapState('SANS', {
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
        this.setXScale(value);
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
        this.setYScale(value);
      },
    },
  },
  methods: {
    ...mapMutations('SANS', [
      'resetScales',
      'setYScale',
      'setXScale',
    ]),
    resetPlotScales() {
      if (this.xScaleLabel !== 'x' || this.yScaleLabel !== 'y') {
        this.resetScales();
      }
    },
  },
};

</script>