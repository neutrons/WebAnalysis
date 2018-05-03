<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

import RunsTable from './RunsTable';

export default {
  name: 'RunsTablePOWDER',
  extends: RunsTable,
  computed: {
    ...mapState('POWDER/Runs', {
      isGettingRunsData: state => state.isGettingRunsData,
      runsData: state => state.runsData,
    }),
    ...mapGetters('POWDER', [
      'isFetchList',
      'isUploadList',
    ]),
  },
  methods: {
    ...mapActions('POWDER/Runs', [
      'getRunsData',
    ]),
    ...mapMutations('POWDER/Runs', [
      'setIsGettingRunsData',
    ]),
  },
};
</script>