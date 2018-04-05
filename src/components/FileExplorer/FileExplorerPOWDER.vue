<script>
import { mapGetters } from 'vuex';
import FileExplorer from './FileExplorer';
import FilterList from './FilterList/FilterListPOWDER';
import FilesList from './FilesList/FilesListPOWDER';

export default {
  name: 'FileExplorerPOWDER',
  extends: FileExplorer,
  components: {
    'v-filter-list': FilterList,
    'v-files-list': FilesList,
  },
  computed: {
    ...mapGetters('POWDER/Fit', [
      'isDefaultFieldsDifferent',
    ]),
  },
};

</script>