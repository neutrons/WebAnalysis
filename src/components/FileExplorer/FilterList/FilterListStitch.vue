<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListStitch',
  extends: FilterList,
  computed: {
    ...mapState('Stitch', {
      selected: state => state.filters,
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
  },
  methods: {
    ...mapMutations('Stitch', [
      'updateFilters',
    ]),
  },
};

</script>