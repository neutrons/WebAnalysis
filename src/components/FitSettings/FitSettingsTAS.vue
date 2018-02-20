<script>
import { mapMutations, mapState } from 'vuex';
import FitSettings from './FitSettings';

export default {
  name: 'FitSettingsTAS',
  extends: FitSettings,
  computed: {
    ...mapState('TAS/Fit', {
      defaultSettings: state => state.defaultFitSettings,
    }),
  },
  methods: {
    ...mapMutations('TAS/Fit', [
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