export default state => (files) => {
  const fetchList = [];
  const uploadList = [];

  for (let i = 0, len = files.length; i < len; i += 1) {
    const fname = files[i];

    if (typeof state.fetched[fname] !== 'undefined') {
      fetchList.push(state.fetched[fname]);
    }

    if (typeof state.uploaded[fname] !== 'undefined') {
      uploadList.push(state.uploaded[fname]);
    }
  }

  return [fetchList, uploadList];
};
