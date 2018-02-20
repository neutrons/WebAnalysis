export default {
  methods: {
    addClipPath() {
      this.svg.append('defs').append('clipPath')
        .attr('id', `clip-${this.ID}`)
        .append('rect')
        .style('fill', 'none')
        .attr('width', this.width)
        .attr('height', this.height);
    },
  },
};
