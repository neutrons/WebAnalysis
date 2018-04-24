<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import Tolerance from './Tolerance';

export default {
  name: 'ToleranceTAS',
  extends: Tolerance,
  components: {
    'v-save-combined': () => import('../SaveCombinedData/SaveCombinedDataTAS.vue'),
  },
  computed: {
    ...mapState('TAS/Combine', {
      defaultSettings: state => state.defaultSettings,
      tolerance: state => state.tolerance,
      combData: state => state.combinedData,
    }),
    ...mapGetters('TAS/Combine', [
      'getPreparedData',
    ]),
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'setTolerance',
    ]),
    ...mapActions('TAS/Combine', [
      'combineData',
      'removeCombinedData',
    ]),
  },
};

</script>