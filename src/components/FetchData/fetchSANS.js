import { eventBus } from '../../assets/js/eventBus';

export default {
  methods: {
    fetchSANS(data, silenceMessage = false) {
      const vm = this;
      const fetchFiles = {
        SANS1D: {},
        SANS2D: {},
      };

      function addDataFile(group, content) {
        const filename = content.filename;
        fetchFiles[group][filename] = content;
      }

      function sendData(namespace, payload, message) {
        vm.$store.dispatch(`${namespace}/addFetchFiles`, payload)
          .then(() => {
            // Notify that fetch was a success
            if (silenceMessage !== true) eventBus.$emit('add-notification', `SANS ${message} data fetched.`, 'success');
          });
      }

      data.forEach((el) => {
        const jobTitle = el.job_title;
        const jobModified = el.date_modified;

        el.results.forEach((r) => {
          const key = r.type;

          // use regex to match filename from url
          const matchFilename = r.url.match(/([^\/]+)\./); // eslint-disable-line
          const filename = matchFilename[0].replace(/\.+$/, '');

          // check if key matches 1D or 2D and add file content
          if (['SANS1D', 'SANS2D'].indexOf(key) > -1) {
            const content = {
              filename,
              jobTitle,
              id: r.id,
              url: r.url,
              dateModified: jobModified,
              tags: [jobTitle, 'fetched'],
              loadType: 'fetched',
            };

            addDataFile(key, content);
          }
        });
      });

      const isSANS1D = Object.keys(fetchFiles.SANS1D).length > 0;
      const isSANS2D = Object.keys(fetchFiles.SANS2D).length > 0;

      // if there is sans1d data trigger action to add it
      if (isSANS1D) {
        sendData('SANS', fetchFiles.SANS1D, '1D');
      }

      // if there is sans2d data trigger action to add it
      if (isSANS2D) {
        sendData('SANS/SANS2D', fetchFiles.SANS2D, '2D');
      }

      // If both are empty emit message
      if (!isSANS1D && !isSANS2D) {
        eventBus.$emit('add-notification', 'No data to fetch.', 'warning');
      }
    },
  },
};
