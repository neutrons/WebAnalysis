<script>
import { mapState, mapActions } from 'vuex';
import Scales from './Scales';

export default {
  name: 'ScalesPOWDER',
  extends: Scales,
  computed: {
    ...mapState('POWDER/Fit', {
      scales: state => state.scale,
      xScaleLabel: state => state.plotScale.x.label,
      yScaleLabel: state => state.plotScale.y.label,
    }),
  },
  methods: {
    ...mapActions('POWDER/Fit', [
      'resetScales',
      'setYScale',
      'setXScale',
    ]),
  },
};

</script>