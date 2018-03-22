<script>
import { mapState, mapActions } from 'vuex';
import Transformations from './Transformations';
import { eventBus } from '../../assets/js/eventBus';

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
    resetAllTransformations() {
      // trigger action to reset transformations
      // then transform data back to original
      // then update plot
      this.resetTransformations()
        .then(() => this.transformData())
        .then(() => {
          eventBus.$emit('redraw-chart-sans-fit');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    enterX() {
      if (this.canEnter) {
        // trigger action to set x transformation
        // then transform data
        // then update plot
        this.setXTransformation(this.xTransformation)
          .then(() => this.transformData())
          .then(() => {
            eventBus.$emit('redraw-chart-sans-fit');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      }
    },
    enterY() {
      if (this.canEnter) {
        // trigger action to set y transformation
        // then transform data
        // then update plot
        this.setYTransformation(this.yTransformation)
          .then(() => this.transformData())
          .then(() => {
            eventBus.$emit('redraw-chart-sans-fit');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      }
    },
    setAllTransformations() {
      if (this.canEnter) {
        // trigger action to set both transformations
        // then transform data
        // then update plot
        this.setXTransformation(this.xTransformation)
          .then(() => this.setYTransformation(this.yTransformation))
          .then(() => this.transformData())
          .then(() => {
            eventBus.$emit('redraw-chart-sans-fit');
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      }
    },
  },
};

</script>