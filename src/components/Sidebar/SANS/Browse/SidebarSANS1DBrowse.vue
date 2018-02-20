<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import read1DData from '../../../../assets/js/readFiles/default';
import parseData from '../../../../assets/js//readFiles/parse/SANS1D';
import SidebarBrowse from '../../SidebarBrowse';

export default {
  name: 'SidebarSANS1DBrowse',
  extends: SidebarBrowse,
  mixins: [
    read1DData,
    parseData,
  ],
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters('SANS', [
      'getURLs',
      'getSavedFile',
    ]),
    ...mapState('SANS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
  },
  methods: {
    ...mapMutations('SANS', [
      'storeData',
      'updateTags',
    ]),
    ...mapMutations('SANS/Browse', [
      'setBrowseData',
    ]),
  },
};
</script>

<style lang='scss'>
</style>
