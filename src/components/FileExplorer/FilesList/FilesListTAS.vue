<script>
import { mapState, mapMutations } from 'vuex';
import FilesList from './FilesList';

export default {
  name: 'FilesListTAS',
  extends: FilesList,
  computed: {
    ...mapState('TAS', {
      filesSelected: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
      filters: state => state.filters,
    }),
    selected: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        if (value.indexOf(this.fileToFit) === -1) this.updateFileToFit(null);
        this.updateFilesSelected(value);
      },
    },
  },
  methods: {
    ...mapMutations('TAS', [
      'updateFilesSelected',
      'updateFileToFit',
    ]),
  },
};

</script>