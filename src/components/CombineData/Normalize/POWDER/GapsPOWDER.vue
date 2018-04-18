<template>
  <v-switch
    label='Gaps'
    v-model='select'></v-switch>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'GapsCheckPOWDER',
  computed: {
    ...mapState('POWDER/Combine', {
      isNormalizeByGap: state => state.isNormalizeByGap,
    }),
    select: {
      get() {
        return this.isNormalizeByGap;
      },
      set(value) {
        this.setIsNormalizeByGap(value);
      },
    },
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'setIsNormalizeByGap',
    ]),
  },
};
</script>
