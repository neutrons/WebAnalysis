<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Fields from './Fields';

export default {
  name: 'FieldsPOWDERFit',
  extends: Fields,
  computed: {
    ...mapGetters('POWDER/Fit', [
      'getFields',
    ]),
    ...mapState('POWDER/Fit', {
      field: state => state.field,
    }),
  },
  methods: {
    ...mapActions('POWDER/Fit', [
      'setXField',
      'setYField',
    ]),
  },
};
</script>