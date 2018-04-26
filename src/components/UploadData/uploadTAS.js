import { eventBus } from '../../assets/js/eventBus';

export default {
  data() {
    return {
      extensionsTAS: '.dat', // accepted file extension for TAS
    };
  },
  methods: {
    validateFilesTAS(files) {
      const result = {};

      for (let i = 0, len = files.length; i < len; i += 1) {
        const url = files[i].name;
        const blob = files[i];

        const re = new RegExp(this.extensionsTAS, 'g');
        const match = url.search(re);
        const filename = url.slice(0, match);

        if (match > 0) {
          result[filename] = {
            url,
            blob,
            filename,
            tags: ['uploaded'],
            loadType: 'uploaded',
          };
        } else {
          const errorMsg = `Error! ${url} is not a supported type. Make sure the file ends in ${this.fileExtension}.`;
          eventBus.$emit('add-notification', errorMsg, 'error');
        }
      }

      // only upload files if there are some
      if (Object.keys(result).length > 0) {
        this.uploadFiles(result);
      } else {
        eventBus.$emit('add-notification', 'No data to upload', 'warning');
      }
    },
  },
};
