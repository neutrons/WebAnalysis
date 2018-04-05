<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SidebarBrowse from '../../SidebarBrowse';
import { eventBus } from '../../../../assets/js/eventBus';

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
    selectedFile: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        const filelist = value !== null ? [value] : [];
        const payload = { filelist, group: 'SANS' };

        this.updateFilesSelected(payload)
          .then(() => {
            if (filelist.length === 0) {
              this.selectedTags = [];
            } else {
              this.selectedTags = this.allFiles[filelist[0]].tags;
            }

            eventBus.$emit('redraw-chart-sans-browse');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
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
