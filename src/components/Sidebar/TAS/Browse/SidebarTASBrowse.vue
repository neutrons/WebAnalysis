<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SidebarBrowse from '../../SidebarBrowse';

export default {
  name: 'SidebarTASBrowse',
  extends: SidebarBrowse,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Browse', {
      filesSelected: state => state.filesSelected,
    }),
  },
  methods: {
    ...mapMutations('TAS', [
      'updateTags',
    ]),
    ...mapActions('TAS/Browse', [
      'updateFilesSelected',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>

