<script>
import FileExplorer from './FileExplorer';
import FilterList from './FilterList/FilterListStitch';
import FilesList from './FilesList/FilesListStitch';

export default {
  name: 'FileExplorerStitch',
  extends: FileExplorer,
  components: {
    'v-filter-list': FilterList,
    'v-files-list': FilesList,
  },
};

</script>