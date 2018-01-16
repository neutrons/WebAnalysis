<script>
import { mapState, mapMutations } from 'vuex';
import FilesList from './FilesList';

export default {
  name: 'FilesListSANS2D',
  extends: FilesList,
  computed: {
    ...mapState('SANS2D', {
      filesSelected: state => state.filesSelected,
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
      filters: state => state.filters,
    }),
    selected: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        this.updateFilesSelected(value);
      },
    },
  },
  methods: {
    ...mapMutations('SANS2D', [
      'updateFilesSelected',
    ]),
  },
};

</script>