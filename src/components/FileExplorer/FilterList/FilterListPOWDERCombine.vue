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
    ...mapState('POWDER/Combine', {
      selected: state => state.filters,
    }),
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'updateFilters',
    ]),
  },
};

</script>