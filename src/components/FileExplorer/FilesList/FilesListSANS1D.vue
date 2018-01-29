<script>
import { mapState, mapMutations } from 'vuex';
import FilesList from './FilesList';

export default {
  name: 'FilesListSANS1D',
  extends: FilesList,
  computed: {
    ...mapState('SANS1D', {
      filesSelected: state => state.filesSelected,
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
      filters: state => state.filters,
      fileToFit: state => state.fileToFit,
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
    ...mapMutations('SANS1D', [
      'updateFilesSelected',
      'updateFileToFit',
    ]),
  },
};

</script>