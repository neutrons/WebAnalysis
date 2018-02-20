<script>
import { mapState, mapMutations } from 'vuex';
import SaveStitchButton from './SaveStitchButton';

export default {
  name: 'SaveStitchButtonSANS',
  extends: SaveStitchButton,
  computed: {
    ...mapState('SANS/Stitch', {
      stitchedData: state => state.stitchedData,
    }),
  },
  methods: {
    ...mapMutations('SANS/Stitch', [
      'saveBrushes',
      'saveBrushSelections',
    ]),
  },
};
</script>

<style lang='scss' scoped>
</style>