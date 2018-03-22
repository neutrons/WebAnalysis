<template>
<v-card flat>
  <v-card-title class='pb-0 pt-0' v-if='allowExport'>
    <v-tooltip top :close-delay='1'>
      <v-btn slot='activator' outline flat small color='success' @click='downloadFittedData'>
        <v-icon :left='!isBreakpointSmall'>file_download</v-icon>
        <span class='hidden-md-and-down'>Export CSV</span>
      </v-btn>
      <span>Click to export fitted data to .csv file</span>
    </v-tooltip>
  </v-card-title>
  <v-card-text class='pt-1'>
    <v-data-table :headers='fittedHeaders' :items='fittedData' class='text-xs-center' :rows-per-page-items='[25, 50, 100, { text: "All", value: -1 }]'>
      <template slot='items' slot-scope='props'>
        <td class='text-xs-left'>{{ props.item[fields.x] | formatValue }}</td>
        <td class='text-xs-left'>{{ props.item[fields.y] | formatValue }}</td>
      </template>
      <template slot='no-data'>
        <v-alert :value='true' color='error' icon='warning'>
          No data to display.
        </v-alert>
      </template>
    </v-data-table>
  </v-card-text>
</v-card>

</template>

<script>
import downloadCSV from '../../assets/js/downloadCSV';
import isBreakpointSmall from '../../assets/js/isBreakpointSmall';

export default {
  name: 'FittedDataTable',
  mixins: [
    downloadCSV,
    isBreakpointSmall,
  ],
  props: {
    fittedData: {
      type: Array,
      required: true,
    },
    fileToFit: {
      type: String,
      required: true,
    },
    allowExport: {
      type: Boolean,
      default: true,
    },
  },
  filters: {
    formatValue(value) {
      return typeof value === 'undefined' ? 'NaN' : value.toExponential(3);
    },
  },
  computed: {
    fittedHeaders() {
      return [
        { align: 'left', text: this.fields.x, value: this.fields.x },
        { align: 'left', text: this.fields.y, value: this.fields.y },
      ];
    },
  },
  methods: {
    downloadFittedData() {
      const headers = 'x,y\n';
      // eslint-disable-next-line
      const arr = this.fittedData.map((d) => {
        return [
          d[this.fields.x],
          d[this.fields.y],
        ];
      });
      const filename = `${this.fileToFit}_fitted_data.csv` || 'fitted_data.csv';

      this.downloadCSV(arr, headers, filename);
    },
  },
};
</script>

<style lang='scss' scoped>
table.table thead td:not(:nth-child(1)),
table.table tbody td:not(:nth-child(1)),
table.table thead th:not(:nth-child(1)),
table.table tbody th:not(:nth-child(1)),
table.table thead td:first-child,
table.table tbody td:first-child,
table.table thead th:first-child,
table.table tbody th:first-child {
  padding: 0 5px !important;
}
</style>