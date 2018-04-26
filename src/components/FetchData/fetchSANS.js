import { eventBus } from '../../assets/js/eventBus';

export default {
  methods: {
    fetchSANS(data, silenceMessage = false) {
      const temp = {};

      data.forEach((el) => {
        const jobTitle = el.job_title;
        const jobModified = el.date_modified;

        el.results.forEach((r) => {
          const key = r.type;
          // use regex to match filename from url
          const matchFilename = r.url.match(/([^\/]+)\./); // eslint-disable-line
          const filename = matchFilename[0].replace(/\.+$/, '');

          if (key === this.$route.meta.subgroup) {
            temp[filename] = {
              filename,
              id: r.id,
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
      if (Object.keys(temp).length > 0) {
        this.$store.dispatch(`${namespace}/addFetchFiles`, temp)
          .then(() => {
            // Notify that fetch was a success
            if (silenceMessage !== true) eventBus.$emit('add-notification', 'Data fetched.', 'success');
          });
      } else {
        eventBus.$emit('add-notification', 'No data to fetch.', 'warning');
      }
    },
  },
};
