<script>
import { mapState, mapActions } from 'vuex';
import Transformations from './Transformations';

export default {
  name: 'TransformationsSANS1D',
  extends: Transformations,
  created() {
    this.xTransformation = this.transformations.x;
    this.yTransformation = this.transformations.y;
  },
  computed: {
    ...mapState('SANS/Fit', {
      transformations: state => state.transformations,
      xTrans: state => state.transformations.x,
      yTrans: state => state.transformations.y,
    }),
  },
  methods: {
    ...mapActions('SANS/Fit', [
      'resetTransformations',
      'transformData',
      'setXTransformation',
      'setYTransformation',
    ]),
  },
};

</script>