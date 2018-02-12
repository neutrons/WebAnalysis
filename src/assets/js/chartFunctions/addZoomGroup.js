export default {
  methods: {
    addZoomGroup() {
      this.g.append('g')
        .attr('class', 'zoom-group')
        .attr('id', `zoom-group-${this.ID}`)
        .append('g')
          .attr('id', `zoom--${this.ID}`)
          .append('rect')
          .attr('class', 'zoom')
          .attr('opacity', 0)
          .attr('cursor', 'move')
          .attr('pointer-events', 'none')
          .style('fill', 'none')
          .attr('width', this.width)
          .attr('height', this.height);
    },
  },
};
