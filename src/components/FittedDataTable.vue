<template>
<v-card flat>
  <v-card-title class='pb-0'>
    <v-spacer></v-spacer>
    <div>
      <v-btn outline flat small color='green' @click='downloadCSV'>
        <v-icon :left='isBreakpointSmall'>file_download</v-icon>
        <span class='hidden-sm-and-down'>Export CSV</span>
      </v-btn>
    </div>
  </v-card-title>
  <v-card-text class='pt-1'>
    <v-data-table :headers='fittedHeaders' :items='fittedData' class='text-xs-center'>
      <template slot='items' slot-scope='props'>
        <td class='text-xs-left'>{{props.item.x}}</td>
        <td class='text-xs-left'>{{props.item.y}}</td>
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
export default {
  name: 'FittedDataTable',
  data() {
    return {
      sheet: false,
      fittedHeaders: [
        { align: 'left', text: 'x', value: 'x' },
        { align: 'left', text: 'y', value: 'y' },
      ],
    };
  },
  props: {
    fittedData: {
      type: Array,
      required: true,
    },
    fileToFit: {
      type: String,
      required: true,
    },
  },
  computed: {
    isBreakpointSmall() {
      return this.$vuetify.breakpoint.name !== 'xs' && this.$vuetify.breakpoint.name !== 'sm';
    },
  },
  methods: {
    convertArrayOfObjectsToCSV() {
      const data = this.fittedData || null;
      if (data === null || !data.length) return null;

      let result = 'x,y\n';
      data.forEach((el) => {
        result += `${el.x},${el.y}\n`;
      });

      return result;
    },
    downloadCSV() {
      let csv = this.convertArrayOfObjectsToCSV();
      if (csv === null) return;

      const filename = `${this.fileToFit}_fitted_data.csv` || 'fitted_data.csv';

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }

      const data = encodeURI(csv);

      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
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