<template>
  <div>
    <label id='file-load-btn' class='btn btn--flat success--text btn-upload'>
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
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'UploadData',
  components: {
    'v-dropzone': DropZone,
  },
  mixins: [
    getTitle,
  ],
  data() {
    return {
      extensionMatch: [
        'TAS',
        'SANS2D',
      ],
    };
  },
  methods: {
    validateFiles(files) {
      const fileList = [];

      for (let i = 0, len = files.length; i < len; i += 1) {
        const url = files[i].name;
        const blob = files[i];

        const re = this.extensionMatch.indexOf(this.title) > -1 ? /.dat/g : /.txt/g;
        const match = url.search(re);
        const filename = url.slice(0, match);

        if (match > 0) {
          fileList.push({
            url,
            blob,
            filename,
          });
        } else {
          const errorMsg = `Error! ${url} is not a supported type. Make sure the file ends in ${this.extensionMatch.indexOf(this.title) > -1 ? '.dat' : '.txt'}.`;
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

      this.$store.commit(`${this.title}/addUploadFiles`, temp);
    },
  },
};

</script>

<style lang='scss' scoped>
.btn-upload {
  cursor: pointer;

  span {
    padding: 5px 5px;
  }

  :hover {
    background-color: rgba(76, 175, 80,0.15);
    transition: all 0.5s ease;
  }
}
</style>
