<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

import RunsTable from './RunsTable';

export default {
  name: 'RunsTableTAS',
  extends: RunsTable,
  computed: {
    ...mapState('TAS/Runs', {
      isGettingRunsData: state => state.isGettingRunsData,
      runsData: state => state.runsData,
    }),
    ...mapGetters('TAS', [
      'isFetchList',
      'isUploadList',
    ]),
  },
  methods: {
    ...mapActions('TAS/Runs', [
      'getRunsData',
    ]),
    ...mapMutations('TAS/Runs', [
      'setIsGettingRunsData',
    ]),
  },
};
</script>