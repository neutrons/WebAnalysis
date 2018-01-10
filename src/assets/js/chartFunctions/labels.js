/* eslint-disable */
export default {
  methods: {
    addLabels() {
      const L = this.svg.append('g');

      L.call((selection) => {
        for (let i = 0; i < 2; i += 1) {
          const temp = selection.append(this.isMathJax ? 'foreignObject' : 'text')
            .attr('height', 100)
            .attr('width', 200)
            .attr('id', i % 2 ? `yLabel-${this.ID}` : `xLabel-${this.ID}`)
            .attr('transform', () => {
              if (this.isMathJax) {
                return i % 2 ? `translate(0, ${this.height / 2}) rotate(-90)` : `translate( ${((this.width + this.margin.left + this.margin.right) / 2)}, ${(this.height + this.margin.bottom - 15)})`;
              } else {
                return i % 2 ? `translate(20, ${this.height / 2}) rotate(-90)` : `translate(${((this.dimensions.w + this.margin.left + this.margin.right) / 2)}, ${(this.height + this.margin.bottom + 10)})`;
              }
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
      if (this.isMathJax) {
        this.chart.svg.select(`#xLabel-${this.ID}`).html('`' + this.label.x + '`');
        this.chart.svg.select(`#yLabel-${this.ID}`).html('`' + this.label.y + '`');

        // Call MathJax to make plot axis labels look pretty
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, [`xLabel-${this.ID}`, `yLabel-${this.ID}`]]);
      } else {
        this.chart.svg.select(`#xLabel-${this.ID}`).text(this.label.x);
        this.chart.svg.select(`#yLabel-${this.ID}`).text(this.label.y);
      }
    },
  },
};
/* eslint-enable */
