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
import uploadSANS from './uploadSANS';
import uploadTAS from './uploadTAS';
import uploadPOWDER from './uploadPOWDER';

export default {
  name: 'UploadData',
  components: {
    'v-dropzone': DropZone,
  },
  mixins: [
    uploadSANS,
    uploadTAS,
    uploadPOWDER,
  ],
  methods: {
    validateFiles(files) {
      const group = this.$route.meta.group;

      // validate files depending on group type
      this[`validateFiles${group}`](files);

      document.getElementById('file-upload-input').value = '';
    },
    uploadFiles(files) {
      const namespace = this.$route.name === 'SANS2D' ? 'SANS/SANS2D' : this.$route.meta.group;

      this.$store.dispatch(`${namespace}/addUploadFiles`, files)
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
