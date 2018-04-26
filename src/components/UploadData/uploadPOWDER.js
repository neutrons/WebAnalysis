import { eventBus } from '../../assets/js/eventBus';

export default {
  data() {
    return {
      extensionsPOWDER: {
        data: '.dat', // accepted extension for data files
        normalize: '.txt', // accepted extension for normalize files
      },
    };
  },
  methods: {
    validateFilesPOWDER(files) {
      let isNormalizedFiles = false;
      const dataFiles = {};
      const normalizeFiles = {
        vcorr: [],
        exclude_detectors: [],
        gaps: [],
      };

      const regexNormalize = new RegExp(this.extensionsPOWDER.normalize, 'g');
      const regexData = new RegExp(this.extensionsPOWDER.data, 'g');
      const regexDetectors = /exp\d+__(exclude_detectors)\./;
      const regexVcorr = /exp\d+__(\w+)_vcorr\./;
      const regexGaps = /exp\d+__(gaps)\./;

      // function to add normalized data files
      // this is for powder content
      function addNormalizedFiles(group, content) {
        isNormalizedFiles = true;
        normalizeFiles[group].push(content);
      }

      function addDataFiles(filename, content) {
        dataFiles[filename] = content;
      }

      for (let i = 0, len = files.length; i < len; i += 1) {
        const url = files[i].name;
        const blob = files[i];
        const content = {
          url,
          blob,
          filename: '',
          tags: ['uploaded'],
          loadType: 'uploaded',
        };

        const matchData = url.search(regexData);

        // First match if normalize extension
        // if so then check if file is detector, vcorr, or gap
        // otherwise file shouldn't match for normalize files
        const matchNormalize = url.search(regexNormalize);
        let matchedDetectors = null;
        let matchedVcorr = null;
        let matchedGaps = null;

        if (matchNormalize > -1) {
          matchedDetectors = url.match(regexDetectors);
          matchedVcorr = url.match(regexVcorr);
          matchedGaps = url.match(regexGaps);
        }

        if (matchData > -1) {
          content.filename = url.slice(0, matchData);
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
        } else {
          // eslint-disable-next-line
          const errorMsg = `Error! ${url} is not a supported type. Make sure the file ends in ${this.extensionsPOWDER.data} or ${this.extensionsPOWDER.normalize}.`;
          eventBus.$emit('add-notification', errorMsg, 'error');
        }
      }

      const payload = {
        dataFiles,
      };

      if (isNormalizedFiles) {
        payload.normalizeFiles = normalizeFiles;
      }

      const isDataFiles = Object.keys(payload.dataFiles).length > 0;

      // if there are data files or normalize files upload
      if (isDataFiles || isNormalizedFiles) {
        this.uploadFiles(payload);
      } else {
        eventBus.$emit('add-notification', 'No data to upload', 'warning');
      }
    },
  },
};
