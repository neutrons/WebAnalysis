<template>
  <div class='btn btn--flat'>
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
      if (this.$route.meta.group === 'TAS' || this.$route.name === 'SANS2D') {
        return '.dat';
      }

      return '.txt';
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

      if (this.$route.meta.group === 'SANS') {
        if (this.$route.name === 'SANS2D') {
          this.$store.commit('SANS/SANS2D/addUploadFiles', temp);
          this.sendMessage(true);
        }
        this.$store.commit('SANS/addUploadFiles', temp);
      } else if (this.$route.meta.group === 'TAS') {
        this.$store.commit('TAS/addUploadFiles', temp);
        this.sendMessage(true);
      } else {
        this.sendMessage(false);
      }
    },
    sendMessage(value) {
      if (value) {
        eventBus.$emit('add-notification', 'Upload successful!', 'success');
      } else {
        eventBus.$emit('add-notification', 'Unsuccessful upload...', 'error');
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
  border-right: 1px solid gainsboro !important;
}
</style>
