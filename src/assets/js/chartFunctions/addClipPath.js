export default {
  methods: {
    addClipPath() {
      // clip path is to hide plot elements that pan beyond the dimensions specified.
      // This is used for panning and zooomin plot.
      this.svg.append('defs').append('clipPath')
        .attr('id', `clip-${this.ID}`)
        .append('rect')
        .style('fill', 'none')
        .attr('width', this.width)
        .attr('height', this.height);
    },
  },
};
