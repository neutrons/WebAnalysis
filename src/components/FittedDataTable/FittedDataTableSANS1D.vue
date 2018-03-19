<script>
import { mapState } from 'vuex';

import FittedDataTable from './FittedDataTable';

export default {
  name: 'FittedDataTableSANS1D',
  extends: FittedDataTable,
  computed: {
    ...mapState('SANS/Fit', {
      fields: state => state.field,
    }),
  },
};
</script>