export default (result, filename) => {
  const data = encodeURI(result);
  const link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
};
