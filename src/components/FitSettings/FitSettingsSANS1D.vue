<script>
import { mapMutations, mapState } from 'vuex';
import FitSettings from './FitSettings';

export default {
  name: 'FitSettingsSANS1D',
  extends: FitSettings,
  computed: {
    ...mapState('SANS1D', {
      defaultSettings: state => state.defaultFitSettings,
    }),
  },
  methods: {
    ...mapMutations('SANS1D', [
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