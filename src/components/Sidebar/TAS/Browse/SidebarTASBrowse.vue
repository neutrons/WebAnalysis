<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import read1DData from '../../../../assets/js/readFiles/default';
import parseData from '../../../../assets/js//readFiles/parse/TAS';
import SidebarBrowse from '../../SidebarBrowse';

export default {
  name: 'SidebarTASBrowse',
  extends: SidebarBrowse,
  mixins: [
    read1DData,
    parseData,
  ],
  computed: {
    ...mapGetters('TAS', [
      'getURLs',
      'getSavedFile',
    ]),
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
  },
  methods: {
    ...mapMutations('TAS', [
      'storeData',
      'setBrowseData',
      'updateTags',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>

