<template>
    <v-btn small flat @click='onFetchFiles' class='fetch-btn'>
      <span class='hidden-md-and-down'>Fetch Data</span>
      <v-icon small :right='!isBreakpointSmall' color='white'>fa-cloud-download</v-icon>
    </v-btn>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../assets/js/eventBus';
import isBreakpointSmall from '../../assets/js/isBreakpointSmall';
import fetchSANS from './fetchSANS';
import fetchTAS from './fetchTAS';
import fetchPOWDER from './fetchPOWDER';

export default {
  name: 'FetchDataButton',
  mixins: [
    isBreakpointSmall,
    fetchSANS,
    fetchTAS,
    fetchPOWDER,
  ],
  data() {
    return {
      savedFetchURL: undefined,
    };
  },
  mounted() {
    // Event listener for when stitch lines are saved
    eventBus.$on('fetch-files', this.onFetchFiles);
  },
  destroyed() {
    eventBus.$off('fetch-files');
  },
  computed: {
    isFetchURL() {
      return typeof process.env[`FETCH_${this.$route.meta.group}_URL`] !== 'undefined';
    },
    fetchURL() {
      if (typeof this.savedFetchURL !== 'undefined') {
        return this.savedFetchURL;
      } else if (this.isFetchURL) {
        return process.env[`FETCH_${this.$route.meta.group}_URL`];
      }

      return undefined;
    },
  },
  methods: {
    onFetchFiles(silenceMessage) {
      const vm = this;
      if (typeof this.fetchURL === 'undefined') {
        eventBus.$emit('add-notification', 'Unable to fetch.', 'error');
        return;
      }

      axios.get(this.fetchURL).then((response) => {
        const data = response.data;
        vm[`fetch${vm.$route.meta.group}`](data, silenceMessage);
      }).catch((err) => {
        eventBus.$emit('add-notification', err.message, 'error');
      });
    },
  },
  watch: {
    $route() {
      if (typeof this.$route.query.fetch !== 'undefined') {
        if (this.savedFetchURL !== this.$route.query.fetch) {
          this.savedFetchURL = this.$route.query.fetch;
          this.onFetchFiles();
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.fetch-btn {
  border-left: 1px solid gainsboro !important;
  border-right: 1px solid gainsboro !important;
}
</style>