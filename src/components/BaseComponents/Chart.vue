<template>
  <div :class='`chart-${$parent.$data.ID}`'>
    <svg :id='`chart-${$parent.$data.ID}`'>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Chart',
  data() {
    return {
      margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
      dimensions: {
        w: undefined,
        h: undefined,
        viewbox: undefined,
        aspectW: 16,
        aspectH: 9,
      },
      svg: undefined,
      g: undefined,
      scale: {
        x: d3.scaleLinear(),
        y: d3.scaleLinear(),
      },
      axis: {
        x: undefined,
        y: undefined,
      },
      grid: {
        x: undefined,
        y: undefined,
      },
    };
  },
  mounted() {
    this.dimensions = this.getContainerWidth();

    this.svg = d3.select(`#chart-${this.$parent.$data.ID}`)

        .attr('viewBox', this.dimensions.viewbox)
        .attr('perserveAspectRatio', 'xMidYMid meet')
        .attr('height', this.dimensions.h + this.margin.top + this.margin.bottom)
        .attr('width', this.dimensions.w + this.margin.left + this.margin.right);

    this.g = this.svg.append('g')
      .attr('class', 'chart-group')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.drawChart();
  },
  methods: {
    drawChart() {
      this.g.selectAll('*').remove();

      this.scale = {
        x: d3.scaleLinear().range([0, this.dimensions.w]),
        y: d3.scaleLinear().range([this.dimensions.h, 0]),
      };

      this.axis = {
        x: d3.axisBottom(this.scale.x),
        y: d3.axisLeft(this.scale.y),
      };

      this.grid = {
        x: d3.axisBottom(this.scale.x).ticks(10).tickSize(-this.dimensions.h).tickFormat(''),
        y: d3.axisLeft(this.scale.y).ticks(10).tickSize(-this.dimensions.w).tickFormat(''),
      };

      this.g.append('rect').attr('class', 'chart-bg')
        .attr('height', this.dimensions.h)
        .attr('width', this.dimensions.w);

      const grid = this.g.append('g').attr('class', 'grid');

      grid.append('g').attr('class', 'grid--x')
        .attr('transform', `translate(0, ${this.dimensions.h})`)
        .call(this.grid.x);

      grid.append('g').attr('class', 'grid--y')
        .call(this.grid.y);

      const axis = this.g.append('g').attr('class', 'axis');

      axis.append('g').attr('class', 'axis--x')
        .attr('transform', `translate(0, ${this.dimensions.h})`)
        .call(this.axis.x);

      axis.append('g').attr('class', 'axis--y')
        .call(this.axis.y);
    },
    getContainerWidth() {
      const temp = {
        w: undefined,
        h: undefined,
        viewbox: undefined,
        aspectW: 16,
        aspectH: 9,
      };

      // Pull plot's parent container width, this will be used to scale the plot responsively
      // var containerWidth = document.getElementById("plot-" + vm.ID).offsetWidth;
      // let viewHeight = containerWidth / (vm.dimensions.aspectW/vm.dimensions.aspectH);
      const containerWidth = document.querySelector(`.chart-${this.$parent.$data.ID}`).offsetWidth;

      // View Height is calculated on a 16:9 aspect ratio
      // This is to properly adjust the plot to the container width
      // This is mostly used when the user adjusts the browser
      // from small (mobile) to large (desktop) window sizes.
      const viewHeight = containerWidth / (this.dimensions.aspectW / this.dimensions.aspectH);

      temp.w = containerWidth - this.margin.left - this.margin.right;
      temp.h = viewHeight - this.margin.top - this.margin.bottom;
      // Set viewbox for to enable responsive scaling for svg upon window resize
      temp.viewbox = `0 0 ${containerWidth} ${viewHeight}`;

      return temp;
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.chart-bg {
  fill: white;
  opacity: 1;
}

.axis .tick line {
  stroke: black;
}

.grid .tick line {
  shape-rendering: crispEdges;
  stroke: gainsboro;
}
</style>
