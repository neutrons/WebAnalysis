<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import Tolerance from './Tolerance';

export default {
  name: 'ToleranceTAS',
  extends: Tolerance,
  computed: {
    ...mapState('TAS/Combine', {
      defaultSettings: state => state.defaultSettings,
      tolerance: state => state.tolerance,
      combData: state => state.combinedData,
    }),
    ...mapGetters('TAS/Combine', [
      'getPreparedData',
    ]),
    editTolerance: {
      get() {
        return this.tolerance;
      },
      set(value) {
        this.setTolerance(value);
      },
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'setTolerance',
      'combineData',
      'removeCombineData',
    ]),
    initCombineData() {
      this.combineData(this.getPreparedData);
    },
  },
};

</script>