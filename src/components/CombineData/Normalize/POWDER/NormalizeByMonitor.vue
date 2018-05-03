<template>
<v-text-field
    label='Monitor Scale Factor'
    v-model.number='value'
    type='number'
  >
  </v-text-field>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'NormalizeByMonitor',
  created() {
    this.setDefaultNormMonitor();
  },
  computed: {
    ...mapState('POWDER/Combine', {
      normalizeByMonitor: state => state.normalizeByMonitor,
    }),
    value: {
      get() {
        return this.normalizeByMonitor;
      },
      set(value) {
        this.setNormalizeByMonitor(value);
      },
    },
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'setNormalizeByMonitor',
    ]),
    setDefaultNormMonitor() {
      this.value = 20000;
    },
  },
};
</script>