import * as d3 from 'd3';

export default {
  methods: {
    addSVG() {
      return d3.select(`#chart-${this.ID}`).append('svg')
        .attr('viewBox', this.viewBox)
        .attr('perserveAspectRatio', 'xMidYMid meet')
        .attr('class', `chart chart-${this.ID}`)
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom);
    },
  },
};
