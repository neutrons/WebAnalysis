import { eventBus } from '../../assets/js/eventBus';

export default {
  data() {
    return {
      extensionsSANS: {
        SANS2D: '.dat', // accepted file extension for sans2d
        SANS: '.txt',
      },
    };
  },
  methods: {
    validateFilesSANS(files) {
      const result = {};
      const extension = this.$route.name === 'SANS2D' ? this.extensionsSANS.SANS2D : this.extensionsSANS.SANS;
      const regex = new RegExp(extension, 'g');

      for (let i = 0, len = files.length; i < len; i += 1) {
        const url = files[i].name;
        const blob = files[i];

        const match = url.search(regex);
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
          const errorMsg = `Error! ${url} is not a supported type. Make sure the file ends in ${extension}.`;
          eventBus.$emit('add-notification', errorMsg, 'error');
        }
      }

      // only upload files if there files to upload
      if (Object.keys(result).length > 0) {
        this.uploadFiles(result);
      } else {
        eventBus.$emit('add-notification', 'No data to upload', 'warning');
      }
    },
  },
};
