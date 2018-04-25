import { eventBus } from '../../assets/js/eventBus';

// Fetch Mixin used for TAS and POWDER
export default function (data, silenceMessage = false) {
  const temp = {};

  data.forEach((file) => {
    // use regex to match for filename within url
    const matchName = file.url.match(/(exp\d+_scan\d+)\./);
    const filename = matchName[0].replace(/\.+$/, '');

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
      if (silenceMessage !== true) eventBus.$emit('add-notification', 'Data fetched!', 'success');
    });
}
