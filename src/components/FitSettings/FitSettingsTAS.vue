<script>
import { mapMutations, mapState } from 'vuex';
import FitSettings from './FitSettings';

export default {
  name: 'FitSettingsTAS',
  extends: FitSettings,
  computed: {
    ...mapState('TAS', {
      defaultSettings: state => state.defaultFitSettings,
    }),
  },
  methods: {
    ...mapMutations('TAS', [
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