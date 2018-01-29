<template>
<v-expansion-panel expand>
  <v-expansion-panel-content :value='true'>
    <div slot='header' class='title'>Browse Files</div>
    
    <v-card>
      <v-card-text>
      <v-select
        prepend-icon='keyboard_arrow_left'
        :prepend-icon-cb='() => move("left")'
        append-icon='keyboard_arrow_right'
        :append-icon-cb='() => move("right")'
        :items='fileList'
        v-model='selectedFile'
        single-line
        chips
        deletable-chips
        bottom
        hide-details
      ></v-select>
      </v-card-text>
      </v-card>
  </v-expansion-panel-content>

  <v-expansion-panel-content :value='true'>
    <div slot='header' class='title'>Tags</div>
    <v-card>
      <v-card-text>
      <v-select
        :prepend-icon='edit ? "cancel" : "edit"'
        :prepend-icon-cb='toggleEdit'
        v-model='selectedTags'
        multiple
        chips
        deletable-chips
        tags
        :items='allTags'
        :readonly='!edit'
      ></v-select>
      <div class='text-xs-right'>
        <v-btn small outline flat v-if='edit' @click='cancelEdit' color='error'>
          <v-icon left>cancel</v-icon>
          <span>Cancel</span>
        </v-btn>
        <v-btn small outline flat v-if='edit' @click='saveEdit' color='success'>
          <v-icon left>check_circle</v-icon>
          <span>Save Tags</span>
        </v-btn>
      </div>
      </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'SidebarBrowse',
  data() {
    return {
      edit: false,
      selectedFile: null,
      tempSelectedTags: [],
      selectedTags: [],
      tags: [],
    };
  },
  computed: {
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
    fileList() {
      return _.uniq(Object.keys(this.allFiles));
    },
    uKeys() {
      return Object.keys(this.uploaded);
    },
    uTags() {
      if (!this.uKeys.length) return [];
      return this.uKeys.map(el => this.uploaded[el].tags)
        .reduce((a, b) => a.concat(b));
    },
    fKeys() {
      return Object.keys(this.fetched);
    },
    fTags() {
      if (!this.fKeys.length) return [];
      return this.fKeys.map(el => this.fetched[el].tags)
        .reduce((a, b) => a.concat(b));
    },
    allTags() {
      if (!this.fTags.length && !this.uTags.length) return [];

      return this.fTags.concat(this.uTags);
    },
  },
  methods: {
    move(direction) {
      if (!this.fileList.length) return;
      const index = this.fileList.indexOf(this.selectedFile);
      const end = this.fileList.length - 1;

      if (direction === 'right') {
        this.selectedFile = this.fileList[index === end ? 0 : index + 1];
      } else {
        this.selectedFile = this.fileList[index === 0 ? end : index - 1];
      }
    },
    toggleEdit() {
      if (!this.fileList.length || this.selectedFile === null) return;

      if (!this.edit) {
        this.tempSelectedTags = this.selectedTags;
        this.edit = !this.edit;
      } else {
        this.selectedTags = this.tempSelectedTags;
        this.edit = !this.edit;
      }
    },
    cancelEdit() {
      this.selectedTags = this.tempSelectedTags;
      this.edit = !this.edit;
    },
    saveEdit() {
      this.edit = !this.edit;
      // below updates selected file's tag list
      const loadType = this.allFiles[this.selectedFile].loadType;
      const payload = {
        loadType,
        filename: this.selectedFile,
        tags: this.selectedTags,
      };

      this.updateTags(payload);
    },
  },
  watch: {
    selectedFile() {
      if (this.selectedFile === null) {
        this.xPoint = null;
        this.yPoint = null;
        this.errorPoint = null;
        this.tempSelectedTags = [];
        this.selectedTags = [];
        this.setBrowseData([]);
      } else {
        const vm = this;
        // Update tags to current file selected
        this.selectedTags = this.allFiles[this.selectedFile].tags;

        const tempData = vm.getSavedFile(this.selectedFile);

        if (tempData === '999') {
          this.read1DData(this.getURLs([this.selectedFile]), [], 'QuickPlot');
        } else {
          this.setBrowseData(tempData);
        }
      }
    },
  },
};
</script>

<style lang='scss'>
.input-group__details::before {
  width: 85%;
}

.input-group__details::after {
  visibility: hidden;
}

.input-group__prepend-icon {
  padding-left: 5px !important;
}

.input-group__append-icon {
  padding: 0px 25px !important;
}

.input-group__append-icon:focus {
  outline: none !important;
}
</style>
