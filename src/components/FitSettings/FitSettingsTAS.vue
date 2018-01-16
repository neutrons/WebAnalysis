<script>
import { mapMutations } from 'vuex';
import FitSettings from './FitSettings';

export default {
  name: 'FitSettingsTAS',
  extends: FitSettings,
  methods: {
    ...mapMutations('TAS', [
      'setFitDamping',
      'setFitGradient',
      'setFitIterations',
      'setFitError',
      'resetFitSettings',
    ]),
    resetEditFitSettings() {
      this.editDamping = 0.1;
      this.editGradient = 0.1;
      this.editIterations = 100;
      this.editError = 0.1;
      this.resetFitSettings();
    },
  },
};

</script>