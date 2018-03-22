<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SidebarBrowse from '../../SidebarBrowse';
import { eventBus } from '../../../../assets/js/eventBus';

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

            eventBus.$emit('redraw-chart-tas-browse');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      },
    },
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

