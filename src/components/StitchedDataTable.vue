<template>
<v-card flat>
  <v-card-title class='pb-0'>
    <div>
      <v-btn outline flat small @click='downloadStitchedData' color='success'>
        <v-icon :left='!isBreakpointSmall'>file_download</v-icon>
        <span class='hidden-md-and-down'>Export CSV</span>
      </v-btn>
    </div>
  </v-card-title>
  <v-card-text class='pt-1'>
    <v-data-table :headers='stitchedHeaders' :items='stitchedData' class='text-xs-center'>
      <template slot='items' slot-scope='props'>
        <td class='text-xs-left'>{{props.item.x}}</td>
        <td class='text-xs-left'>{{props.item.y}}</td>
        <td class='text-xs-left'>{{props.item.error}}</td>
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
import { mapState } from 'vuex';

import downloadCSV from '../assets/js/downloadCSV';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'StitchedDataTable',
  data() {
    return {
      sheet: false,
      stitchedHeaders: [
        { align: 'left', text: 'x', value: 'x' },
        { align: 'left', text: 'y', value: 'y' },
        { align: 'left', text: 'error', value: 'error' },
      ],
    };
  },
  mixins: [
    downloadCSV,
    isBreakpointSmall,
  ],
  props: {
    stitchedData: {
      type: Array,
      required: true,
    },
    filesStitched: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState('SANS/Stitch', {
      fields: state => state.field,
    }),
    filename() {
      return this.filesStitched.join('_');
    },
  },
  methods: {
    downloadStitchedData() {
      const headers = ['x', 'y', 'error'];
      // eslint-disable-next-line
      const arr = this.stitchedData.map((d) => {
        return [
          d[this.fields.x],
          d[this.fields.y],
          d.error,
        ];
      });
      const filename = `${this.filename}_stitched.csv` || 'stitched.csv';

      this.downloadCSV(arr, headers, filename);
    },
  },
};
</script>

<style lang='scss' scoped>
@import url('../assets/css/dataTableStyles.scss');
</style>