import { eventBus } from '../../assets/js/eventBus';

// Fetch Mixin used for TAS and POWDER
export default function (data) {
  const temp = {};

  data.forEach((file) => {
    const re = /exp(\d+)_scan(\d+)/;
    const found = re.exec(file.url);
    const filename = found[0];

    temp[filename] = {
      filename,
      url: file.url,
      scan: file.scan,
      scanTitle: file.scan_title,
      tags: ['fetched'],
      loadType: 'fetched',
    };
  });

  this.$store.dispatch(`${this.$route.meta.group}/addFetchFiles`, temp)
    .then(() => {
      // Notify that fetch was a success
      eventBus.$emit('add-notification', 'Data fetched!', 'success');
    });
}
