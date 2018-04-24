<script>
import { mapState, mapActions } from 'vuex';
import Scales from './Scales';

export default {
  name: 'ScalesSANS1D',
  extends: Scales,
  computed: {
    ...mapState('SANS/Fit', {
      scales: state => state.scale,
      xScaleLabel: state => state.plotScale.x.label,
      yScaleLabel: state => state.plotScale.y.label,
    }),
  },
  methods: {
    ...mapActions('SANS/Fit', [
      'resetScales',
      'setYScale',
      'setXScale',
    ]),
  },
};

</script>