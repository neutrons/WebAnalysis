<script>
import { mapState, mapActions } from 'vuex';
import Scales from './Scales';

export default {
  name: 'ScalesSANSStitch',
  extends: Scales,
  computed: {
    ...mapState('SANS/Stitch', {
      scales: state => state.scale,
      xScaleLabel: state => state.plotScale.x.label,
      yScaleLabel: state => state.plotScale.y.label,
    }),
  },
  methods: {
    ...mapActions('SANS/Stitch', [
      'resetScales',
      'setYScale',
      'setXScale',
    ]),
  },
};

</script>