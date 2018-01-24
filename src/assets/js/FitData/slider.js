import * as d3 from 'd3';
import _ from 'lodash';
import { eventBus } from '../eventBus';
import getTitle from '../getTitle';
import fitFunction from './fitFunction';
import fitLine from './fitLine';

export default {
  mixins: [
    getTitle,
    fitFunction,
    fitLine,
  ],
  data() {
    return {
      brushTransformation: null,
      brushFit: null,
      prevFit: null,
      selLimits: null,
    };
  },
  computed: {
    sliderScale() {
      return this.plotScale.x.value
        .range([0, this.width])
        .domain(this.xExtent);
    },
    sliderXAxis() {
      return d3.axisBottom(this.sliderScale);
    },
    brush() {
      return d3.brushX()
        .extent([
          [0, 0],
          [this.width, this.sliderHeight],
        ]);
    },
    brushSelection() {
      return this.$store.state[this.title].brushSelection;
    },
    dataToFit() {
      return this.$store.getters[`${this.title}/dataToFit`];
    },
    transformations() {
      return this.$store.state[this.title].transformations;
    },
    fitType() {
      return this.$store.state[this.title].fitType;
    },
  },
  methods: {
    initSlider() {
      const slider = this.svg.append('g')
        .attr('class', 'slider')
        .attr('transform', `translate(${this.margin.left}, ${this.height + (this.margin.top * 1.75)})`);

      // append scatter plot to brush chart area
      slider.append('g')
        .attr('class', 'slider-lines');

      slider.append('g')
        .attr('class', 'brush');

      slider.append('g')
        .attr('class', 'slider-axis--x')
        .attr('transform', `translate(0, ${this.sliderHeight})`);

      // Add a fit line element since a slider is means data is fitted
      this.initFitLine();
    },
    updateSlider() {
      // visually reflect the newly updated x axis
      const tempData = this.dataToFit.filter(this.filterForLog);
      this.svg.select('.slider')
        .select('.slider-axis--x')
        .transition()
        .duration(750)
        .call(this.sliderXAxis);

      const newXScale2 = this.sliderScale.copy();

      const slider = this.svg.select('.slider-lines')
        .selectAll('line')
        .data(tempData);

      // EXIT old slider lines
      slider.exit().remove();

      // UPDATE slider lines
      slider.transition()
        .duration(750)
        .attr('x1', d => newXScale2(d.x))
        .attr('y1', this.sliderHeight)
        .attr('x2', d => newXScale2(d.x))
        .attr('y2', 0);

      // ENTER new brush lines
      slider.enter()
        .append('line')
        .attr('x1', d => newXScale2(d.x))
        .attr('y1', this.sliderHeight)
        .attr('x2', d => newXScale2(d.x))
        .attr('y2', 0)
        .style('stroke', 'slategray');

      // Call brush
      this.brush.on('brush', this.brushed);

      // set initial brushSelection
      const xExtent = d3.extent(tempData, d => d.x);

      if (this.brushSelection.length === 0 ||
        !_.isEqual(xExtent, this.prevExtent) ||
        (this.fileToFit !== this.previousFit) ||
        (this.brushTransformation !== this.transformations.x)) {
        this.$store.commit(`${this.ID}/setBrushLimits`, { limits: xExtent, scale: newXScale2 });

        this.prevExtent = xExtent;
        this.brushFit = this.fitType;
        this.brushTransformation = this.transformations.x;
      } else if (!(this.brushFit === this.fitType)) {
        // if same file to fit, but new fit transformation, change brush selections
        this.$store.commit(`${this.ID}/setBrushLimits`, { limits: xExtent, scale: newXScale2 });
        this.brushFit = this.fitType;
      } else {
        // if same file to fit after update and same fit transformation,
        // simply update brush selection to current selection
        this.$store.commit(`${this.ID}/setBrushLimits`, { limits: this.selLimits, scale: newXScale2 });
      }

      this.svg.select('.brush')
        .call(this.brush)
        .call(this.brush.move, this.brushSelection);
    },
    brushed() {
      this.$store.commit(`${this.ID}/setBrushSelection`, d3.event.selection);
      const tempData = this.dataToFit.filter(this.filterForLog);
      const e = d3.event.selection.map(this.sliderScale.invert, this.sliderScale);
      const selectedData = tempData.filter(d => e[0] <= d.x && d.x <= e[1]);

      // Update brush selections to the current selected data
      // This will be used to dynamically adjust brush location when new data is added
      const xExtent = d3.extent(selectedData, d => d.x);
      this.selLimits = [...xExtent];
      const newXScale2 = this.sliderScale.copy();
      this.$store.commit(`${this.ID}/setBrushLimits`, { limits: xExtent, scale: newXScale2 });

      if (this.brushSelection !== null && selectedData.length > 1) {
        this.svg.select('.slider-lines')
          .selectAll('line')
          .style('stroke', (d) => {
            if (e[0] <= d.x && d.x <= e[1]) {
              return this.colorScale(d.name);
            }

            return 'slategray';
          });

        this.fitFunction(selectedData);

        if (this.fittedData.length <= 0) {
          const errorMsg = '<strong>Error!</strong> Fitted y-values < 0, thus no fit-line to display.';
          eventBus.$emit('add-notification', errorMsg, 'error');
        } else {
          // update line plot
          this.updateFitLine();
        }
      } else {
        const errorMsg = 'Not enough data selected, please select 2 or more points. If plot is blank, no data is available for generating a fit line.';
        eventBus.$emit('add-notification', errorMsg, 'error');
      }
    },
  },
};
