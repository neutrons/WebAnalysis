<template>
<v-card flat>
  <v-card-title class='pb-0'>
    <div v-if='plottedData.length'>
      <v-btn outline flat small color='success' @click='downloadPlottedData'>
        <v-icon :left='!isBreakpointSmall'>file_download</v-icon>
        <span class='hidden-md-and-down'>Export CSV</span>
      </v-btn>
    </div>
  </v-card-title>
  <v-card-text class='pt-1'>
    <v-data-table :headers='headers' :items='plottedData' class='text-xs-center' :rows-per-page-items='[25, 50, 100, { text: "All", value: -1 }]'>
      <template slot='items' slot-scope='props'>
        <td class='text-xs-left' v-for='(item, index) in fieldnames' :key='index'>{{props.item[item]}}</td>
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
import downloadCSV from '../assets/js/downloadCSV';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'PlottedDataTable',
  data() {
    return {
      sheet: false,
    };
  },
  props: {
    plottedData: {
      type: Array,
      required: true,
    },
    files: {
      required: true,
    },
  },
  mixins: [
    downloadCSV,
    isBreakpointSmall,
  ],
  computed: {
    fieldnames() {
      if (this.plottedData.length === 0) return [];
      return Object.keys(this.plottedData[0]);
    },
    headers() {
      // eslint-disable-next-line
      return this.fieldnames.map((key) => {
        return {
          align: 'left',
          text: key,
          value: key,
        };
      });
    },
    filename() {
      if (Array.isArray(this.files)) {
        return `${this.files.join('_')}_plotted_data.csv`;
      } else if (typeof this.files === 'string') {
        return `${this.files}_plotted_data.csv`;
      }

      return 'plotted_data.csv';
    },
  },
  methods: {
    downloadPlottedData() {
      let headers = this.fieldnames.join(',');
      headers += '\n';

      // eslint-disable-next-line
      const arr = this.plottedData.map((d) => {
        return Object.values(d);
      });

      this.downloadCSV(arr, headers, this.filename);
    },
  },
};

</script>

<style lang='scss'>
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