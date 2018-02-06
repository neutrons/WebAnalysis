<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListSANS1D',
  extends: FilterList,
  computed: {
    ...mapState('SANS', {
      selected: state => state.filters,
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
  },
  methods: {
    ...mapMutations('SANS', [
      'updateFilters',
    ]),
  },
};

</script>