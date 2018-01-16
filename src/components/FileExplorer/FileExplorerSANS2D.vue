<script>
import FileExplorer from './FileExplorer';
import FilterList from './FilterList/FilterListSANS2D';
import FilesList from './FilesList/FilesListSANS2D';

export default {
  name: 'FileExplorerSANS2D',
  extends: FileExplorer,
  components: {
    'v-filter-list': FilterList,
    'v-files-list': FilesList,
  },
};

</script>