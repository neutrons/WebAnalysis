<template>
<v-container>
  <v-layout row>
    <div style='position: absolute; left: 50px; top: 50px; bottom: 50px; right: 50px;'>
      <v-card raised height='100%'>
        <v-card-title class='title secondary white--text'>Edit chart</v-card-title>
        <v-card-text>
          <div id='plotly-chart' style='width: 100%;'></div>
        </v-card-text>
      </v-card>
    </div>
  </v-layout>
</v-container>
</template>

<script>
import Plotly from 'plotly.js';

const d3 = Plotly.d3;

export default {
  name: 'EditChart',
  data: () => ({
    widthInPercentOfParent: 100,
    heightInPercentOfParent: 50,
    axis: null,
    labels: null,
  }),
  mounted() {
    let editData = this.$route.query.editChartData;
    editData = JSON.parse(editData);

    this.labels = editData.labels;
    this.axis = editData.axis;

    if (editData.type === '2D') {
      this.create2D(editData);
    } else {
      this.create1D(editData);
    }
  },
  computed: {
    style() {
      return {
        width: `${this.widthInPercentOfParent}%`,
        'margin-left': `${(100 - this.widthInPercentOfParent) / 2} %`,

        height: `${this.heightInPercentOfParent}vh`,
        'margin-top': 0,
      };
    },
    layout() {
      return {
        title: 'Click Here<br>to Edit Chart Title',
        xaxis: {
          title: this.labels.x,
          type: this.axis.x,
        },
        yaxis: {
          title: this.labels.y,
          type: this.axis.y,
        },
      };
    },
  },
  methods: {
    create1D(editData) {
      // Set up Plot and make the plot responsive
      const gd3 = d3.select('#plotly-chart')
        .style(this.style);

      const gd = gd3.node();

      // CREATE PLOT DATA
      const data = this.packData(editData.data);

      Plotly.plot(gd, data, this.layout, { editable: true, showLink: true, linkText: 'Edit chart in Plotly' });

      window.onresize = () => {
        Plotly.Plots.resize(gd);
      };
    },
    create2D(editData) {
      // Set up plotly and make the plot responsive
      const gd3 = d3.select('#plotly-chart')
        .style(this.style);

      const gd = gd3.node();

      // CREATE PLOT DATA
      const data = [{
        x: editData.x,
        y: editData.y,
        type: 'scatter',
        mode: 'markers',
        marker: {
          symbol: 'square',
          size: 15,
          color: editData.z,
          colorscale: 'Viridis',
          opacity: 0.8,
        },
      }];

      Plotly.plot(gd, data, this.layout, { editable: true, showLink: true, linkText: 'Edit chart in Plotly' });

      window.onresize = () => {
        Plotly.Plots.resize(gd);
      };
    },
    packData(data) {
      const temp = [];

      data.forEach((d) => {
        temp.push({
          ...d,
          mode: 'lines+markers',
          type: 'scatter',
        });
      });

      return temp;
    },
  },
  beforeDestroy() {
    window.onresize = null;
  },
};
</script>