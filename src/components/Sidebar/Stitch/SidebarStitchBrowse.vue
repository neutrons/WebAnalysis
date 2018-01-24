<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import read1DData from '../../../assets/js/readFiles/default';
import parseData from '../../../assets/js//readFiles/parse/SANS1D';
import SidebarBrowse from '../SidebarBrowse';

export default {
  name: 'SidebarStitchBrowse',
  extends: SidebarBrowse,
  mixins: [
    read1DData,
    parseData,
  ],
  computed: {
    ...mapGetters('Stitch', [
      'getURLs',
      'getSavedFile',
    ]),
    ...mapState('Stitch', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
  },
  methods: {
    ...mapMutations('Stitch', [
      'storeData',
      'setBrowseData',
      'updateTags',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>
