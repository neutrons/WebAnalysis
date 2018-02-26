<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Fields from './Fields';

export default {
  name: 'FieldsTASCombine',
  extends: Fields,
  computed: {
    ...mapGetters('TAS/Combine', [
      'getFields',
    ]),
    ...mapState('TAS/Combine', {
      field: state => state.field,
    }),
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'setXField',
      'setYField',
      'changeFields',
    ]),
  },
};
</script>