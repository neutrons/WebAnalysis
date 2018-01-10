// import * as d3 from 'd3';
export default {
  methods: {
    addClipPath() {
      const CP = this.svg.append('defs').append('clipPath');
      CP.attr('id', `clip-${this.ID}`)
        .append('rect')
        .attr('width', this.width)
        .attr('height', this.height);
    },
  },
};
