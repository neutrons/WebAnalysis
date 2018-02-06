<template>
    <v-btn small flat @click='fetchFiles' class='fetch-btn'>
      <span class='hidden-md-and-down'>Fetch Data</span>
      <v-icon small :right='!isBreakpointSmall' color='white'>fa-cloud-download</v-icon>
    </v-btn>
</template>

<script>
import axios from 'axios';
import pathParse from 'path-parse';
import { eventBus } from '../assets/js/eventBus';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'FetchDataButton',
  mixins: [
    isBreakpointSmall,
  ],
  mounted() {
    // Event listener for when stitch lines are saved
    eventBus.$on('fetch-files', this.fetchFiles);
  },
  computed: {
    fetchURL() {
      return this.$route.meta.group === 'TAS' ? process.env.FETCH_TAS_URL : process.env.FETCH_SANS_URL;
    },
  },
  methods: {
    fetchFiles(e, URL = this.fetchURL) {
      const vm = this;

      axios.get(URL).then((response) => {
        const data = response.data;

        switch (vm.$route.meta.group) {
          case 'TAS':
            vm.fetchTAS(data);
            break;
          case 'SANS':
          default:
            vm.fetchSANS(data);
        }

        // Notify that fetch was a success
        eventBus.$emit('add-notification', 'Data fetched!', 'success');
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

      this.$store.commit('TAS/addFetchFiles', temp);
    },
    fetchSANS(data) {
      const temp = {};

      data.forEach((el) => {
        const jobTitle = el.job_title;
        const jobModified = el.date_modified;

        el.results.forEach((r) => {
          const key = r.type;

          if (key === this.$route.meta.subgroup) {
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

      const namespace = this.$route.name !== 'SANS2D' ? 'SANS' : 'SANS/SANS2D';
      this.$store.commit(`${namespace}/addFetchFiles`, temp);
    },
  },
  watch: {
    $route() {
      if (this.$route.query.fetch) this.fetchFiles(this.$route.query.fetch);
    },
  },
};
</script>

<style lang='scss' scoped>
.fetch-btn {
  border-left: 1px solid gainsboro !important;
}
</style>