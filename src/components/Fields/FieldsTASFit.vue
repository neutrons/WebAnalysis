<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Fields from './Fields';

export default {
  name: 'FieldsTASFit',
  extends: Fields,
  computed: {
    ...mapGetters('TAS/Fit', [
      'getFields',
    ]),
    ...mapState('TAS/Fit', {
      field: state => state.field,
    }),
  },
  methods: {
    ...mapMutations('TAS/Fit', [
      'setXField',
      'setYField',
      'changeFields',
    ]),
  },
};
</script>