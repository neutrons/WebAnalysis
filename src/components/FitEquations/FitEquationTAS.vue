<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import FitEquation from './FitEquation';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'FitEquationTAS',
  extends: FitEquation,
  computed: {
    ...mapState('TAS/Fit', {
      fits: state => state.fits,
    }),
    ...mapGetters('TAS/Fit', [
      'splitFitData',
      'fitInitialValues',
      'finalEquation',
    ]),
    ...mapState('TAS/Fit', {
      fits: state => state.fits,
      fileToFit: state => state.fileToFit,
      selectedData: state => state.selectedData,
      isFitting: state => state.isFitting,
      equationEditSelect: state => state.equationEditSelect,
    }),
  },
  methods: {
    ...mapActions('TAS/Fit', [
      'addToSelect',
      'updateSelectAtIndex',
      'removeSelectAtIndex',
      'updateInitialValue',
      'removeInitialValues',
      'addInitialValues',
      'setSelectValid',
      'setSelectEquation',
      'setCoefficientConstant',
      'setFitType',
      'setEquationEditSelect',
      'transformData',
    ]),
    fitData() {
      // first set fit type
      eventBus.$emit('redraw-chart-tas-fit');
    },
  },
};
</script>