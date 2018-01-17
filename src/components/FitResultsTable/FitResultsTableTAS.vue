<script>
import { mapState } from 'vuex';
import * as d3 from 'd3';
import FitResultsTable from './FitResultsTable';

export default {
  name: 'FitResultsTAS',
  extends: FitResultsTable,
  computed: {
    ...mapState('TAS', {
      fileToFit: state => state.fileToFit,
      fitType: state => state.fitType,
      fittedData: state => state.fittedData,
      fitError: state => state.fitError,
      fitSettings: state => state.fitSettings,
      initialValues: state => state.fitInitialValues,
      fitNote: state => state.fitNote,
      xBrushSelection: state => state.brushSelection[1],
      fitEquation: state => state.fitEquation,
    }),
    fitCount() {
      return this.fittedData.length;
    },
    fitRange() {
      if (this.fitCount === 0) return [0, 0];
      return d3.extent(this.fittedData, d => d.x).map(d => d.toExponential(2));
    },
    formattedFitError() {
      return this.fitError ? 'Not Available' : this.fitError.toExponential(2);
    },
    damping() {
      return this.fitSettings.damping;
    },
    maxIterations() {
      return this.fitSettings.maxIterations;
    },
    errorTolerance() {
      return this.fitSettings.errorTolerance;
    },
    gradientDifference() {
      return this.fitSettings.gradientDifference;
    },
  },
};

</script>