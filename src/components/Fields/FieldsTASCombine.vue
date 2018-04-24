<script>
import { mapState, mapGetters, mapActions } from 'vuex';
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
    ...mapActions('TAS/Combine', [
      'setXField',
      'setYField',
      'resetNormalizedData',
    ]),
  },
};
</script>