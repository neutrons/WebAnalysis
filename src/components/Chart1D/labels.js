/* eslint-disable */
import * as d3 from 'd3';

export default {
  methods: {
    addLabels() {
      const L = this.svg.append('g')
        .attr('class', `labels labels-${this.ID}`);

      const yTranslate = [
        `translate(10, ${(this.height + this.margin.top + this.margin.bottom) / 2}) rotate(-90)`,
        `translate(25, ${(this.height + this.margin.top) / 2}) rotate(-90)`,
      ];
      const xTranslate = [
        `translate(${this.width / 2}, ${this.height + (this.margin.top * 2.75)})`,
        `translate(${((this.width + this.margin.left + this.margin.right) / 2)}, ${this.height + (this.margin.top * 3.25)})`,
      ];

      L.call((selection) => {
        for (let i = 0; i < 2; i += 1) {
          const temp = selection.append(this.isMathJax ? 'foreignObject' : 'text')
            .attr('height', 100)
            .attr('width', 200)
            .attr('id', i % 2 ? `yLabel-${this.ID}` : `xLabel-${this.ID}`)
            .attr('transform', () => {
              if (this.isMathJax) {
                return i % 2 ? yTranslate[0] : xTranslate[0];
              }

              return i % 2 ? yTranslate[1] : xTranslate[1];
            });

          if (this.isMathJax) {
            temp.html(i % 2 ? `\`${this.label.y}\`` : `\`${this.label.x}\``);

            // Call MathJax to make plot axis labels look pretty
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, [`xLabel-${this.ID}`, `yLabel-${this.ID}`]]);
          } else {
            temp.text(i % 2 ? this.label.y : this.label.x);
          }
        }
      });
    },
    updateLabels() {
      // Updated axis according to any new transformations or field changes
      const xLabel = this.svg.select(`#xLabel-${this.ID}`);
      const yLabel = this.svg.select(`#yLabel-${this.ID}`);
      if (this.isMathJax) {
        xLabel.html(`\`${this.label.x}\``);
        yLabel.html(`\`${this.label.y}\``);

        // Call MathJax to make plot axis labels look pretty
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, [`xLabel-${this.ID}`, `yLabel-${this.ID}`]]);
      } else {
        xLabel.text(this.label.x);
        yLabel.text(this.label.y);
      }
    },
  },
};
/* eslint-enable */
