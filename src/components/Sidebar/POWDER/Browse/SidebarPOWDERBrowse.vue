<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SidebarBrowse from '../../SidebarBrowse';

export default {
  name: 'SidebarPOWDERBrowse',
  extends: SidebarBrowse,
  computed: {
    ...mapState('POWDER', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('POWDER/Browse', {
      filesSelected: state => state.filesSelected,
    }),
  },
  methods: {
    ...mapMutations('POWDER', [
      'updateTags',
    ]),
    ...mapActions('POWDER/Browse', [
      'updateFilesSelected',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>

