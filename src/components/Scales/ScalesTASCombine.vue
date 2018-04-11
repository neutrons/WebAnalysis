<script>
import { mapState, mapActions } from 'vuex';
import Scales from './Scales';

export default {
  name: 'ScalesTASCombine',
  extends: Scales,
  computed: {
    ...mapState('TAS/Combine', {
      scales: state => state.scale,
      xScaleLabel: state => state.plotScale.x.label,
      yScaleLabel: state => state.plotScale.y.label,
    }),
  },
  methods: {
    ...mapActions('TAS/Combine', [
      'resetScales',
      'setYScale',
      'setXScale',
    ]),
  },
};

</script>