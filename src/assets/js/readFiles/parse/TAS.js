/* Function to Parse 1D Data Files */
import pp from 'papaparse';
import config from '../configs/TAS';

function cleanDataTable(table) {
  let temp = table.split(/\r\n|\r|\n/);

  temp = temp.filter((el, index) => {
    if (/^#/.exec(el)) {
      if (index === 0) return true;
    } else {
      return true;
    }

    return false;
  });

  // console.log('Returning temp:', temp.join('\r\n'));
  return temp.join('\r\n');
}

function extractMetadata(data) {
  const m1 = data.match('# col_headers = ');
  const m2 = data.match('# Sum of Counts');

  let dataTable = data.slice(m1.index + 18, m2.index);
  dataTable = cleanDataTable(dataTable);

  let metadata = data.slice(0, m1.index).concat(data.slice(m2.index));

  // Remove pounds '#'
  metadata = metadata.replace(/#\s/g, '');
  metadata = metadata.split(/\r\n|\r|\n/);
  metadata = metadata.filter(d => d !== '');

  const temp = {};
  metadata.forEach((d) => {
    const match = /scan completed./.exec(d);
    if (match === null) {
      const key = d.split(' = ');
      temp[key[0]] = key[1].trim();
    } else {
      temp.completed = d.substr(0, match.index).trim();
    }
  });

  return {
    metadata: temp,
    data: dataTable,
  };
}

export default {
  methods: {
    parseData(data, filename) {
      // First - extract metadata from data table
      const extractedData = extractMetadata(data);

      // Second - parse data
      extractedData.data = pp.parse(extractedData.data, config).data;

      // eslint-disable-next-line
      extractedData.data.forEach(row => row.name = filename);
      extractedData.filename = filename;

      return extractedData;
    },
  },
};
