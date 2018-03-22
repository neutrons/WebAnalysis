<template>
<div>
  <keep-alive>
    <v-chart :ID='ID'></v-chart>
  </keep-alive>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SANS2D',
  components: {
    'v-chart': () => import('../Chart2D/ChartSANS2D'),
  },
  computed: {
    ...mapState('SANS/SANS2D', {
      ID: state => state.ID,
    }),
  },
};

</script>
