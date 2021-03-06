import axios from 'axios';
import _ from 'lodash';
import { eventBus } from '../eventBus';

export default {
  methods: {
    read1DData(fileURLs, tempData, plotType = 'default') {
      /*
       When a user selects data to be plotted,
      it first must be fetched, either from
      an HTTP request or FileReader. In order
      to handle reading multiple files
      asynchronously, JavaScript promises are used.
      That way we can "wait" for all data
      to be loaded asynchronously before moving on
      to plotting the data.
      */
      const vm = this;
      const promises = fileURLs.map((url) => {
        if (url.type === 'fetched') {
          return axios.get(url.url).then((response) => {
            let data;
            try {
              data = vm.parseData(response.data, url.filename);
              vm.storeData({
                filename: url.filename,
                data,
              });

              return data;
            } catch (reason) {
              eventBus.$emit('add-notification', `File cannot be read. ${url.filename}`, 'error');
              return [];
            }
          });
        }
          // Turn file reader into a promise in order to
          // wait on the async reading of files with Promise.all below
        return new Promise((resolve) => {
          const reader = new FileReader();

          // eslint-disable-next-line
          reader.onload = function (e) {
            try {
              // Get file content
              const content = e.target.result;
              // Code to read Upload 2D file
              const data = vm.parseData(content, url.filename);

              vm.storeData({
                filename: url.filename,
                data,
              });

              resolve(data);
            } catch (reason) {
              eventBus.$emit('add-notification', `File cannot be read. ${url.filename}`, 'error');
              resolve([]);
            }
          };

          reader.readAsText(url.url, 'UTF-8');
        });
      });

      if (promises.length > 0) {
        Promise.all(promises).then((results) => {
          const plotData = _.concat(tempData, results);
          if (plotData.length) {
            if (plotType === 'default') {
              vm.setCurrentData(plotData);
            } else {
              vm.setBrowseData(plotData[0]);
            }
          }
        }).catch((reason) => {
          const errorMsg = `Error! ${reason}`;

          eventBus.$emit('add-notification', errorMsg, 'error');
        });
      }
    },
  },
};
