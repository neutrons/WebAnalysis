import { eventBus } from '../../assets/js/eventBus';

// Fetch Mixin used for TAS and POWDER
export default function (data, silenceMessage = false) {
  let isNormalizedFiles = false;
  const dataFiles = {};
  const normalizeFiles = {
    vcorr: [],
    exclude_detectors: [],
    gaps: [],
  };

  // function to add normalized data files
  // this is for powder content
  function addNormalizedFiles(group, content) {
    isNormalizedFiles = true;
    normalizeFiles[group].push(content);
  }

  function addDataFiles(filename, content) {
    dataFiles[filename] = content;
  }

  // use regex to match for filename within url
  // throws an error if there are named groups
  // so access matched file name by second element in array
  // which is equivalent to the named group
  const regexData = /(exp\d+_scan\d+)\./;
  const regexDetectors = /exp\d+__(exclude_detectors)\./;
  const regexVcorr = /exp\d+__(\w+)_vcorr\./;
  const regexGaps = /exp\d+__(gaps)\./;

  const length = data.length;
  for (let i = 0; i < length; i += 1) {
    const file = data[i];
    const url = file.url;
    const content = {
      filename: '',
      url: file.url,
      scan: file.scan,
      scanTitle: file.scan_title,
      tags: ['fetched'],
      loadType: 'fetched',
    };

    const matchedData = url.match(regexData);
    const matchedDetectors = url.match(regexDetectors);
    const matchedVcorr = url.match(regexVcorr);
    const matchedGaps = url.match(regexGaps);

    if (matchedData !== null) { // check for data matched
      content.filename = matchedData[1];
      addDataFiles(content.filename, content);
    } else if (matchedDetectors !== null) { // check for exclude detectors file
      content.filename = matchedDetectors[1];
      addNormalizedFiles('exclude_detectors', content);
    } else if (matchedVcorr !== null) { // check for vcor file
      content.filename = matchedVcorr[1];
      addNormalizedFiles('vcorr', content);
    } else if (matchedGaps !== null) { // check for gaps file
      content.filename = matchedGaps[1];
      addNormalizedFiles('gaps', content);
    } else { // if filename is empty no files were matched emit warning and skip to next iteration
      eventBus.$emit('add-notification', `Could not match ${url} to filename`, 'error');
    }
  }

  let payload;
  if (isNormalizedFiles) {
    payload = { dataFiles, normalizeFiles };
  } else {
    payload = dataFiles;
  }

  if (isNormalizedFiles || Object.keys(payload).length > 0) {
    this.$store.dispatch(`${this.$route.meta.group}/addFetchFiles`, payload)
      .then(() => {
        // Notify that fetch was a success
        if (silenceMessage !== true) eventBus.$emit('add-notification', 'Data fetched.', 'success');
      });
  } else {
    eventBus.$emit('add-notification', 'No data to fetch', 'warning');
  }
}
