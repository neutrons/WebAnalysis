import beforeFirstChunk from '../chunks/SANS1D';

export default {
  header: true,
  dynamicTyping: true, // parse string to int
  delimiter: '', // auto-detect
  newline: '', // auto-detect
  quoteChar: '"',
  skipEmptyLines: true,
  beforeFirstChunk,
};
