<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListPOWDER',
  extends: FilterList,
  computed: {
    ...mapState('POWDER', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('POWDER/Fit', {
      selected: state => state.filters,
    }),
    ...mapState('POWDER/Combine', {
      storedCombined: state => state.storedCombined,
    }),
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded, this.storedCombined);
    },
  },
  methods: {
    ...mapMutations('POWDER/Fit', [
      'updateFilters',
    ]),
  },
};

</script>