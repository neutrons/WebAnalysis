<script>
import { mapMutations, mapState } from 'vuex';
import Tolerance from './Tolerance';

export default {
  name: 'ToleranceTAS',
  extends: Tolerance,
  computed: {
    ...mapState('TAS/Combine', {
      defaultSettings: state => state.defaultSettings,
      tolerance: state => state.tolerance,
    }),
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
    ]),
  },
};

</script>