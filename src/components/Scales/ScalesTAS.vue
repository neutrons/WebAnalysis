<script>
import { mapState, mapActions } from 'vuex';
import Scales from './Scales';

export default {
  name: 'ScalesTAS',
  extends: Scales,
  computed: {
    ...mapState('TAS/Fit', {
      scales: state => state.scale,
      xScaleLabel: state => state.plotScale.x.label,
      yScaleLabel: state => state.plotScale.y.label,
    }),
  },
  methods: {
    ...mapActions('TAS/Fit', [
      'resetScales',
      'setYScale',
      'setXScale',
    ]),
  },
};

</script>