import * as d3 from 'd3';

export default {
  methods: {
    setChartElements() {
      // Add a line path function
      this.updateLineGenerator(this.xScale, this.yScale);

      // Add tool tip and hide it until invoked
      this.tooltip = d3.select('#app-container').append('div')
        .attr('id', `tooltip-${this.ID}`)
        .attr('class', 'tooltip')
        .style('opacity', 0);

      // Add main chart area
      this.svg = this.addSVG();

      // Add clip path so points/line do not exceed chart boundaries
      this.addClipPath();

      // Add chart area
      this.g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      this.g.append('rect')
        .attr('class', 'chartbg')
        .attr('width', this.width)
        .attr('height', this.height);

      // Add Grid Group
      this.g.append('g').attr('id', `grid-${this.ID}`);

      // X Grid
      this.g.select(`#grid-${this.ID}`)
        .append('g')
        .attr('transform', `translate(0, ${this.height}`)
        .attr('class', 'grid grid--x');

      // Y Grid
      this.g.select(`#grid-${this.ID}`)
        .append('g')
        .attr('class', 'grid grid--y');

      // Add Axis group
      this.g.append('g').attr('id', `axis-${this.ID}`);

      // Add X Axis
      this.g.select(`#axis-${this.ID}`)
        .append('g')
        .attr('transform', `translate(0, ${this.height})`)
        .attr('class', 'axis axis--x');

      // Add Y Axis
      this.g.select(`#axis-${this.ID}`)
        .append('g')
        .attr('class', 'axis axis--y');

      // Add Legend Group
      this.g.append('g').attr('id', `legend-${this.ID}`);

      // Add Zoom Group
      this.g.append('g')
        .attr('id', `zoom-group-${this.ID}`)
        .append('g')
        .attr('id', `zoom-${this.ID}`)
        .append('rect')
        .attr('class', 'zoom')
        .attr('width', this.width)
        .attr('height', this.height);

      // Add Chart Element Group
      const chartElms = this.g.append('g')
        .attr('clip-path', `url(#clip-${this.ID})`)
        .attr('class', 'chart-elements');

      chartElms.append('g')
        .attr('id', `line-${this.ID}`);

      // Add Scatter Group
      chartElms.append('g')
        .attr('id', `scatter-${this.ID}`);
    },
  },
};
