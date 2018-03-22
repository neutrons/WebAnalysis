<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import FitEquation from './FitEquation';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'FitEquationTAS',
  extends: FitEquation,
  created() {
    eventBus.$on('update-initial-value-pick-TAS', this.updateInitialValueWithPick);
  },
  destroyed() {
    eventBus.$off('update-initial-value-pick-TAS');
  },
  beforeDestroy() {
    this.setEquationEditSelect([]);
  },
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
    selected: {
      get() {
        return this.equationEditSelect;
      },
    },
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
    coefficientInput(payload) {
      // update initial values
      // then revise fit line
      this.updateInitialValue(payload)
        .then(() => {
          eventBus.$emit('revise-fit-line-TAS', this.fitInitialValues);
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    togglePick(value, index, ivIndex) {
      if (value) {
        eventBus.$emit('toggle-pick-area-TAS', true);
        this.pickIndex = index;
        this.pickIvIndex = ivIndex;
      } else {
        eventBus.$emit('toggle-pick-area-TAS', false);
        this.resetPickIndex();
      }
    },
    updateInitialValueWithPick(value) {
      // trigger update initial values
      // then resetPick index and revise fit line
      this.updateInitialValue({
        index: this.pickIndex,
        ivIndex: this.pickIvIndex,
        value: +value.toFixed(4),
      })
      .then(() => {
        this.resetPickIndex();
        eventBus.$emit('revise-fit-line-TAS', this.fitInitialValues);
      })
      .catch((error) => {
        eventBus.$emit('add-notification', error.message, 'error');
      });
    },
  },
};
</script>