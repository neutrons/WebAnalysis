<script>
import { mapState, mapGetters, mapActions } from 'vuex';
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
    ...mapActions('TAS/Fit', [
      'setXField',
      'setYField',
    ]),
  },
};
</script>