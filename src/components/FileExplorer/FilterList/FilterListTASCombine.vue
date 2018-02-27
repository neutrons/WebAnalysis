<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListTASCombine',
  extends: FilterList,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Combine', {
      selected: state => state.filters,
    }),
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'updateFilters',
    ]),
  },
};

</script>