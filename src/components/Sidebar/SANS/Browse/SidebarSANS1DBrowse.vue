<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SidebarBrowse from '../../SidebarBrowse';

export default {
  name: 'SidebarSANS1DBrowse',
  extends: SidebarBrowse,
  computed: {
    ...mapState('SANS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('SANS/Browse', {
      filesSelected: state => state.filesSelected,
    }),
  },
  methods: {
    ...mapMutations('SANS', [
      'updateTags',
    ]),
    ...mapActions('SANS/Browse', [
      'updateFilesSelected',
    ]),
  },
};
</script>

<style lang='scss'>
</style>
