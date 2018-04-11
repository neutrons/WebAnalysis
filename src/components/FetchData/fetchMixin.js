import pathParse from 'path-parse';

import { eventBus } from '../../assets/js/eventBus';

// Fetch Mixin used for TAS and POWDER
export default function (data, silenceMessage = false) {
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

  this.$store.dispatch(`${this.$route.meta.group}/addFetchFiles`, temp)
    .then(() => {
      // Notify that fetch was a success
      if (silenceMessage !== true) eventBus.$emit('add-notification', 'Data fetched!', 'success');
    });
}
