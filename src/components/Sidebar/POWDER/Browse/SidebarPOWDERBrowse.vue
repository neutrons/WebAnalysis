<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SidebarBrowse from '../../SidebarBrowse';
import { eventBus } from '../../../../assets/js/eventBus';

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
    selectedFile: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        const filelist = value !== null ? [value] : [];
        const payload = { filelist, group: 'POWDER' };

        this.updateFilesSelected(payload)
          .then(() => {
            if (filelist.length === 0) {
              this.selectedTags = [];
            } else {
              this.selectedTags = this.allFiles[filelist[0]].tags;
            }

            eventBus.$emit('redraw-chart-powder-browse');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
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

