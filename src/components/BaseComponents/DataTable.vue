<template>
<div class='text-cs-center'>
  <v-bottom-sheet v-model='sheet'>
    <v-btn slot='activator' flat small :disabled='!isFileFit'>
        <span>Fit Table</span>
        <v-icon right>fa-table</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h3 class='headline'>Fitted Data</h3>
        <v-spacer></v-spacer>
        <div>
        <v-btn outline flat small color='green' @click='downloadCSV'>
          <v-icon left>file_download</v-icon> Export CSV
        </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
    <v-data-table
      :headers='fittedHeaders'
      :items='fittedData'
      class='text-xs-center'
      :rows-per-page-items='[5, 15, 25]'>
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
  </v-bottom-sheet>
</div>
</template>

<script>
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'DataTable',
  mixins: [
    getTitle,
  ],
  data() {
    return {
      sheet: false,
      fittedHeaders: [
        { align: 'left', text: 'x', value: 'x' },
        { align: 'left', text: 'y', value: 'y' },
      ],
    };
  },
  computed: {
    isFileFit() {
      return this.fileToFit !== null;
    },
    fileToFit() {
      return this.$store.state[this.title].fileToFit;
    },
    fittedData() {
      return this.$store.state[this.title].fittedData;
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
</style>