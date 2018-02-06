<script>
import { mapMutations, mapState } from 'vuex';
import FitSettings from './FitSettings';

export default {
  name: 'FitSettingsSANS1D',
  extends: FitSettings,
  computed: {
    ...mapState('SANS', {
      defaultSettings: state => state.defaultFitSettings,
    }),
  },
  methods: {
    ...mapMutations('SANS', [
      'setFitDamping',
      'setFitGradient',
      'setFitIterations',
      'setFitError',
      'resetFitSettings',
    ]),
    resetEditFitSettings() {
      this.initEditValues();
      this.resetFitSettings();
    },
  },
};

</script>