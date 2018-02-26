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
    selectX: {
      get() {
        return this.field.x;
      },
      set(value) {
        this.setXField(value);
        this.changeFields();
      },
    },
    selectY: {
      get() {
        return this.field.y;
      },
      set(value) {
        this.setYField(value);
        this.changeFields();
      },
    },
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