import pp from 'papaparse';
import config from '../../../assets/js/readFiles/configs/TAS';

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

  // turn metadata into an object
  const obj = {};
  const tempMD = metadata.map(d => d.split(/\s*=\s*/));

  tempMD.forEach((d) => {
    if (d.length > 1) obj[d[0]] = d[1];
  });

  metadata = obj;

  const defaultFields = {
    x: metadata.def_x.toLowerCase(),
    y: metadata.def_y.toLowerCase(),
  };

  return {
    metadata,
    data: dataTable,
    defaultFields,
  };
}

export default async ({ state }, payload) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    try {
      const result = payload.map((item) => {
        const data = item.data;
        const filename = item.filename;

        // First - extract metadata from data table
        const extractedData = extractMetadata(data);

        // Second - parse data
        extractedData.data = pp.parse(extractedData.data, config).data;

        // eslint-disable-next-line
        extractedData.data.forEach(row => row.name = filename);
        extractedData.filename = filename;

        return extractedData;
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
