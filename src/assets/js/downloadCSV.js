export default {
  methods: {
    convertArrayOfObjectsToCSV(arr = null, headers) {
      if (arr === null || !arr.length) return null;

      let result = headers;
      arr.forEach((el) => {
        result += `${el[0]},${el[1]}\n`;
      });

      return result;
    },
    downloadCSV(arr, headers, filename) {
      let csv = this.convertArrayOfObjectsToCSV(arr, headers);
      if (csv === null) return;

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

