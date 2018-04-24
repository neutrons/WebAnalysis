export default (result, filename) => {
  // function to generate a link and auto-download data as a file
  // type of file (.txt, .csv, .gsa, .dat) is suffixed in filename
  const data = encodeURI(result);
  const link = document.createElement('a');

  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
};
