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
      this.$store.dispatch(`${namespace}/addFetchFiles`, temp)
        .then(() => {
          // Notify that fetch was a success
          if (silenceMessage !== true) eventBus.$emit('add-notification', 'Data fetched!', 'success');
        });
    },
  },
};
