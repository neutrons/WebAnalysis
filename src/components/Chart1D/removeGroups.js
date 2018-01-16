// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    removeGroups() {
      // Remove any lines not in the dataNest
      this.deleteKeys.forEach(key => this.g.select(`.group-${key}`).remove());
    },
  },
};
