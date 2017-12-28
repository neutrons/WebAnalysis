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
            const data = vm.parseData(response.data, url.filename);

            vm.$store.commit(`${vm.title}/storeData`, {
              filename: url.filename,
              data: data.data,
            });

            return data;
          });
        }
          // Turn file reader into a promise in order to
          // wait on the async reading of files with Promise.all below
        return new Promise((resolve) => {
          const reader = new FileReader();

          // eslint-disable-next-line
          reader.onload = function (e) {
            // Get file content
            const content = e.target.result;

            // Code to read Upload 2D file
            const data = vm.parseData(content, url.filename);

            vm.$store.commit(`${vm.title}/storeData`, {
              filename: url.filename,
              data: data.data,
            });

            resolve(data);
          };

          reader.readAsText(url.url, 'UTF-8');
        });
      });

      if (promises.length > 0) {
        Promise.all(promises).then((results) => {
          const plotData = _.concat(tempData, results);

          vm.$store.commit(`${vm.title}/setCurrentData`, plotData);
        }).catch((reason) => {
          const errorMsg = `Error! ${reason}`;

          eventBus.$emit('add-notification', errorMsg, 'error');
        });
      }
    },
  },
};
