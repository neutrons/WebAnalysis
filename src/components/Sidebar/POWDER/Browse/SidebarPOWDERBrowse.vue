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
        const temp = value !== null ? [value] : [];
        this.updateFilesSelected(temp)
          .then(() => {
            if (temp.length === 0) {
              this.selectedTags = [];
            } else {
              this.selectedTags = this.allFiles[temp[0]].tags;
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

