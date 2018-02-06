<script>
import { mapState, mapMutations } from 'vuex';
import Transformations from './Transformations';

export default {
  name: 'TransformationsSANS1D',
  extends: Transformations,
  created() {
    this.xTransformation = this.transformations.x;
    this.yTransformation = this.transformations.y;
  },
  computed: {
    ...mapState('SANS', {
      transformations: state => state.transformations,
      xTrans: state => state.transformations.x,
      yTrans: state => state.transformations.y,
    }),
  },
  methods: {
    ...mapMutations('SANS', [
      'resetTransformations',
      'transformData',
      'setXTransformation',
      'setYTransformation',
      'setTransformations',
    ]),
    resetAllTransformations() {
      this.resetTransformations();
      this.transformData();
    },
    enterX() {
      if (this.canEnter) {
        this.setXTransformation(this.xTransformation);
        this.transformData();
      }
    },
    enterY() {
      if (this.canEnter) {
        this.setYTransformation(this.yTransformation);
        this.transformData();
      }
    },
    setAllTransformations() {
      if (this.canEnter) {
        this.setTransformations({
          x: this.xTransformation,
          y: this.yTransformation,
        });
        this.transformData();
      }
    },
  },
};

</script>