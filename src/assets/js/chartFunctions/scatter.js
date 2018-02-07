// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  data() {
    return {
      xPoint: 0,
      yPoint: 0,
      errorPoint: 0,
      symbols: {
        circle: d3.symbol().type(d3.symbolCircle).size(45),
        triangle: d3.symbol().type(d3.symbolTriangle).size(45),
        cross: d3.symbol().type(d3.symbolCross).size(45),
        diamond: d3.symbol().type(d3.symbolDiamond).size(45),
        square: d3.symbol().type(d3.symbolSquare).size(45),
        wye: d3.symbol().type(d3.symbolWye).size(45),
      },
    };
  },
  methods: {
    updateScatter(selection, x, y, t, shape = 'circle') {
      const vm = this;

      // EXIT
      selection.exit().remove();

      // UPDATE
      selection.transition(t)
        .attr('transform', d => `translate( ${x(d.x)}, ${y(d.y)})`);

      selection.enter().append('path')
        .attr('class', 'point')
        .attr('d', this.symbols[shape])
        // eslint-disable-next-line
        .style('fill', (d) => {
          return typeof d.name === 'undefined' ? 'brown' : this.colorScale(d.name);
        })
        .style('stroke', 'whitesmoke')
        .attr('transform', d => `translate( ${x(d.x)}, ${y(d.y)})`)
        // eslint-disable-next-line
        .on('mouseover', function (d) {
          d3.select(this).transition()
            .attr('d', vm.symbols[shape].size(125));

          vm.tooltipEnter(d);
        })
        // eslint-disable-next-line
        .on('mouseout', function (d) {
          d3.select(this).transition()
            .attr('d', vm.symbols[shape].size(45));
        });
    },
    tooltipEnter(d) {
      [this.xPoint, this.yPoint, this.errorPoint] = [d.x, d.y, d.error];
    },
  },
};
