<script>
import FileExplorer from './FileExplorer';
import FilterList from './FilterList/FilterListSANS1D';
import FilesList from './FilesList/FilesListSANS1D';
import FitList from './FitList/FitListSANS1D';

export default {
  name: 'FileExplorerSANS1D',
  extends: FileExplorer,
  components: {
    'v-filter-list': FilterList,
    'v-files-list': FilesList,
    'v-fit-list': FitList,
  },
};

</script>