<script>
import { mapState } from 'vuex';

import FittedDataTable from './FittedDataTable';

export default {
  name: 'FittedDataTableTAS',
  extends: FittedDataTable,
  computed: {
    ...mapState('TAS/Fit', {
      fields: state => state.field,
    }),
  },
};
</script>