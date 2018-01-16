<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListTAS',
  extends: FilterList,
  computed: {
    ...mapState('TAS', {
      selected: state => state.filters,
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
  },
  methods: {
    ...mapMutations('TAS', [
      'updateFilters',
    ]),
  },
};

</script>