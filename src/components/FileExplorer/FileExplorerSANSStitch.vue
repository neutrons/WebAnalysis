<script>
import FileExplorer from './FileExplorer';
import FilterList from './FilterList/FilterListSANSStitch';
import FilesList from './FilesList/FilesListSANSStitch';

export default {
  name: 'FileExplorerSANSStitch',
  extends: FileExplorer,
  components: {
    'v-filter-list': FilterList,
    'v-files-list': FilesList,
  },
};

</script>