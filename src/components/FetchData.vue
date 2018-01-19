<template>
    <v-btn small flat color='success' @click='fetchFiles'>
      <span class='hidden-md-and-down'>Fetch Data</span>
      <v-icon small :right='!isBreakpointSmall'>fa-cloud-download</v-icon>
    </v-btn>
</template>

<script>
import axios from 'axios';
import pathParse from 'path-parse';
import getTitle from '../assets/js/getTitle';
import { eventBus } from '../assets/js/eventBus';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'FetchDataButton',
  mixins: [
    getTitle,
    isBreakpointSmall,
  ],
  mounted() {
    // Event listener for when stitch lines are saved
    eventBus.$on('fetch-files', this.fetchFiles);
  },
  computed: {
    fetchURL() {
      return this.title === 'TAS' ? process.env.FETCH_TAS_URL : process.env.FETCH_SANS_URL;
    },
  },
  methods: {
    fetchFiles() {
      const vm = this;

      axios.get(this.fetchURL).then((response) => {
        const data = response.data;

        if (vm.title === 'TAS') {
          vm.fetchTAS(data);
        } else {
          vm.fetchSANS(data);
        }
      }).catch((err) => {
        eventBus.$emit('add-notification', err.message, 'error');
      });
    },
    fetchTAS(data) {
      const temp = {};

      data.forEach((file) => {
        const filename = pathParse(file.url).name;

        temp[filename] = {
          filename,
          url: file.url,
          scan: file.scan,
          scanTitle: file.scan_title,
          tags: ['fetched'],
          loadType: 'fetched',
        };
      });

      this.$store.commit(`${this.title}/addFetchFiles`, temp);
    },
    fetchSANS(data) {
      const temp = {};

      data.forEach((el) => {
        const jobTitle = el.job_title;
        const jobModified = el.date_modified;

        el.results.forEach((r) => {
          const key = r.type.split('-');

          if (key.indexOf(this.title) > -1) {
            temp[r.filename] = {
              id: r.id,
              filename: r.filename,
              url: r.url,
              jobTitle,
              dateModified: jobModified,
              tags: [jobTitle, 'fetched'],
              loadType: 'fetched',
            };
          }
        });
      });

      this.$store.commit(`${this.title}/addFetchFiles`, temp);
    },
  },
};
</script>