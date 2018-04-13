<script>
import { mapState, mapActions } from 'vuex';
import Scales from './Scales';

export default {
  name: 'ScalesPOWDER',
  extends: Scales,
  computed: {
    ...mapState('POWDER/Combine', {
      scales: state => state.scale,
      xScaleLabel: state => state.plotScale.x.label,
      yScaleLabel: state => state.plotScale.y.label,
    }),
  },
  methods: {
    ...mapActions('POWDER/Combine', [
      'resetScales',
      'setYScale',
      'setXScale',
    ]),
  },
};

</script>