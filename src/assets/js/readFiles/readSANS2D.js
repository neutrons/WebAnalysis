import axios from 'axios';
import _ from 'lodash';
import { eventBus } from '../eventBus';

/* Functions to Read and Parse 2D Files */
export default {
  methods: {
    read2DData(fileURLs, tempData) {
      const vm = this;
      const promises = fileURLs.map((url) => {
        if (url.type === 'fetched') {
          return axios.get(url.url).then((response) => {
            let data;
            try {
              data = vm.parseData(response.data, url.filename);
              vm.storeData({
                filename: url.filename,
                data: data.data,
              });

              return { data: data.data, filename: url.filename };
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
                data: data.data,
              });

              resolve({ data: data.data, filename: url.filename });
            } catch (reason) {
              eventBus.$emit('add-notification', `File cannot be read. ${url.filename}`, 'error');
              resolve({});
            }
          };

          reader.readAsText(url.url, 'UTF-8');
        });
      });

      if (promises.length > 0) {
        Promise.all(promises).then((results) => {
          const data = _.concat(tempData, results[0].data);
          const filename = results[0].filename;

          if (data.length) vm.setCurrentData({ data, filename });
        }).catch((reason) => {
          const errorMsg = `Error! ${reason}`;

          eventBus.$emit('add-notification', errorMsg, 'error');
        });
      }
    },
  },
};
