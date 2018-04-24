import { eventBus } from './eventBus';
import downloadFile from './downloadFile';

export default {
  methods: {
    convertArrayOfObjectsToCSV(arr = null, headers, delimiter) {
      if (arr === null || !arr.length) return null;

      let result = headers.join(delimiter);
      result += '\n';

      arr.forEach((el) => {
        result += `${el.join(delimiter)}\n`;
      });

      return result;
    },
    downloadCSV(arr, headers, filename, delimiter = ',') {
      let csv = this.convertArrayOfObjectsToCSV(arr, headers, delimiter);

      if (csv === null) {
        eventBus.$emit('add-notification', 'No data to save', 'error');
        return;
      }

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }

      downloadFile(csv, filename);
    },
  },
};

