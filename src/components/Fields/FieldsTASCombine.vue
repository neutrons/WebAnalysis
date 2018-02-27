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
      isNormalized: state => state.isNormalized,
    }),
    selectX: {
      get() {
        return this.field.x;
      },
      set(value) {
        if (this.isNormalized) this.resetNormalizeData();
        this.setXField(value);
        this.changeFields();
      },
    },
    selectY: {
      get() {
        return this.field.y;
      },
      set(value) {
        if (this.isNormalized) this.resetNormalizeData();
        this.setYField(value);
        this.changeFields();
      },
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'setXField',
      'setYField',
      'changeFields',
      'resetNormalizeData',
    ]),
  },
};
</script>