<template>
  <div class='btn btn--flat' title='Click to upload data files'>
    <label id='file-load-btn' class='btn__content btn-upload'>
        <span class='hidden-md-and-down'>Upload file <i class='fa fa-upload fa-lg'></i></span>
        <span class='hidden-lg-and-up'><i class='fa fa-upload fa-lg'></i></span>
        <input id='file-upload-input' type='file' style='display: none;' @change='validateFiles($event.target.files)' multiple>
    </label>
    <v-dropzone @drag-files='validateFiles'></v-dropzone>
  </div>
</template>

<script>
import { eventBus } from '../../assets/js/eventBus';
import DropZone from './DropZone';

export default {
  name: 'UploadData',
  components: {
    'v-dropzone': DropZone,
  },
  computed: {
    fileExtension() {
      switch (this.$route.meta.group) {
        case 'TAS':
        case 'POWDER':
          return '.dat';
        case 'SANS':
          if (this.$route.name === 'SANS2D') {
            return '.dat';
          }

          return '.txt';
        default:
          return '.txt';
      }
    },
  },
  methods: {
    validateFiles(files) {
      const fileList = [];

      for (let i = 0, len = files.length; i < len; i += 1) {
        const url = files[i].name;
        const blob = files[i];

        const re = new RegExp(this.fileExtension, 'g');
        const match = url.search(re);
        const filename = url.slice(0, match);

        if (match > 0) {
          fileList.push({
            url,
            blob,
            filename,
          });
        } else {
          const errorMsg = `Error! ${url} is not a supported type. Make sure the file ends in ${this.fileExtension}.`;
          eventBus.$emit('add-notification', errorMsg, 'error');
        }
      }

      if (fileList.length > 0) {
        this.uploadFiles(fileList);
      }

      document.getElementById('file-upload-input').value = '';
    },
    uploadFiles(files) {
      const temp = {};

      files.forEach((el) => {
        const fname = el.filename;
        // eslint-disable-next-line
        el.tags = ['uploaded'];

        // eslint-disable-next-line
        el.loadType = 'uploaded';

        temp[fname] = el;
      });

      const namespace = this.$route.name === 'SANS2D' ? 'SANS/SANS2D' : this.$route.meta.group;

      this.$store.dispatch(`${namespace}/addUploadFiles`, temp)
        .then(() => {
          this.sendMessage(true);
        })
        .catch((error) => {
          this.sendMessage(error);
        });
    },
    sendMessage(value) {
      if (value === true) {
        eventBus.$emit('add-notification', 'Upload successful!', 'success');
      } else {
        eventBus.$emit('add-notification', value, 'error');
      }
    },
  },
};

</script>

<style lang='scss' scoped>
.fa-upload {
  color: white;
}

.btn-upload {
  cursor: pointer;
}

.btn--flat {
  border-left: 1px solid gainsboro !important;
  border-right: 1px solid gainsboro !important;
}
</style>
