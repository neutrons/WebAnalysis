import * as d3 from 'd3';

// mixin to add tooltip to plot
// moveX and moveY give coordinate location of tooltip
// content is what will be printed inside the tooltip
export default (moveX, moveY, content) => {
  d3.select('body')
    .append('div')
    .attr('class', 'plot-tooltip')
    .style('position', 'absolute')
    .style('padding', '10px')
    .style('height', 'auto')
    .style('width', 'auto')
    .style('background', 'white')
    .style('border', '1px solid black')
    .style('z-index', '9999')
    .style('display', 'inline')
    .style('left', `${moveX}px`)
    .style('top', `${moveY - 50}px`)
    .html(content);
};
