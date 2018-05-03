<template>
<div>
  <v-divider class='mb-3 mt-3'></v-divider>
  <v-form v-model='formValid' ref="form">
    <v-select
      :items='["Fullprof", "GSAS"]'
      label='Select file format'
      v-model='fileFormat'
    ></v-select>

    <v-text-field
      type='text'
      label='Enter a File Name'
      v-model='combineFilename'
      required
      hint='Type name of combined data curve'
      :rules='[validateFileName, checkName]'
      :suffix='fileType'
    ></v-text-field>

    <v-btn @click='onStoreCombinedData' :disabled='!formValid' block outline flat color='success'>Store Combined</v-btn>
    <v-btn @click='onSaveCombinedData' :disabled='!formValid' block outline flat color='success'>Download Combined</v-btn>
  </v-form>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import validateFileName from '../../../assets/js/validateFilename';
import downloadCSV from '../../../assets/js/downloadCSV';
import downloadFile from '../../../assets/js/downloadFile';
import checkName from './checkName';

import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'SaveCombinedDataPOWDER',
  mixins: [
    validateFileName,
    checkName,
    downloadCSV,
  ],
  data() {
    return {
      formValid: true,
      validName: true,
      fileFormat: 'Fullprof',
      combineFilename: 'combined_data',
    };
  },
  computed: {
    ...mapState('POWDER', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('POWDER/Combine', {
      combinedData: state => state.combinedData,
      binTolerance: state => state.tolerance,
      storedCombined: state => state.storedCombined,
    }),
    fileType() {
      return this.fileFormat === 'Fullprof' ? '.dat' : '.gsa';
    },
    filename() {
      return this.combineFilename + this.fileType;
    },
    filenameList() {
      const k1 = Object.keys(this.fetched);
      const k2 = Object.keys(this.uploaded);
      const k3 = Object.keys(this.storedCombined);
      return [].concat.apply([], [k1, k2, k3]);
    },
  },
  methods: {
    ...mapActions('POWDER/Combine', [
      'storeCombinedData',
    ]),
    onStoreCombinedData() {
      // always store combined data
      const group = this.$route.meta.group;
      this.storeCombinedData({ group, name: this.combineFilename })
        .then(() => {
          eventBus.$emit('redraw-chart-powder-combine');
          eventBus.$emit('add-notification', 'Combined data stored. To view it go to Graph tab.', 'success');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    onSaveCombinedData() {
      if (this.$refs.form.validate()) {
        if (this.fileFormat === 'Fullprof') {
          this.downloadAsFullprof();
        } else {
          this.downloadAsGSAS();
        }
      }
    },
    downloadAsFullprof() {
      const headers = []; // fullprof won't have any header values
      const fileData = this.combinedData.map(point => ([
        point['2theta'],
        point.anode,
        point.error,
      ]));
      const filename = this.filename;

      this.downloadCSV(fileData, headers, filename, '\t');
    },
    downloadAsGSAS() {
      /*
        Function to export to gsas format

        The file header format is 'BANK 1 {0} {1} CONST {2,8:0.000} {3,8:0.000} 0 0 ESD'
          0 = length of Combined
          1 = Math.ceil(length of combined / 5)
          2 = first 2theta
          3 = bin tolerance

        Simply do a for loop that creates 5 points per line
        with each value being set to 8 characters long.

        If the last row is short it will have to be .padEnd() with
        the remaining spaces generateed to 80 character length
      */
      const combinedLength = this.combinedData.length;
      const numberOfLines = Math.ceil(combinedLength / 5);
      const firstTheta = this.combinedData[0]['2theta'];
      const binTolerance = this.binTolerance;
      const filename = this.filename;

      // eslint-disable-next-line
      let result = '\n';
      result += `BANK 1 ${combinedLength} ${numberOfLines} CONST ${firstTheta} ${binTolerance} 0 0 ESD`;
      result = result.padEnd(80);
      result += '\n';

      // generate each row
      this.combinedData.forEach((point, index) => {
        const intensity = point.anode.toFixed(2).padStart(8);
        const error = point.error.toFixed(2).padStart(8);
        let row = `${intensity}${error}`;

        // If last row pad end to 80
        if (index === combinedLength - 1) row = row.padEnd(80);

        result += `${row}`;

        // if row has 5 points create new line, ignore for last row
        if ((index + 1) % 5 === 0 && index !== combinedLength) result += '\n';
      });

      // give the data a type
      result = `data:text/plain;charset=utf-8,${result}`;

      downloadFile(result, filename);
    },
  },
};
</script>