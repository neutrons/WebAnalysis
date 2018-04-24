<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import Tolerance from './Tolerance';

export default {
  name: 'TolerancePOWDER',
  extends: Tolerance,
  components: {
    'v-save-combined': () => import('../SaveCombinedData/SaveCombinedDataPOWDER.vue'),
  },
  computed: {
    ...mapState('POWDER', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('POWDER/Combine', {
      defaultSettings: state => state.defaultSettings,
      tolerance: state => state.tolerance,
      combData: state => state.combinedData,
    }),
    ...mapGetters('POWDER/Combine', [
      'getPreparedData',
    ]),
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'setTolerance',
    ]),
    ...mapActions('POWDER/Combine', [
      'combineData',
      'removeCombinedData',
    ]),
  },
};

</script>