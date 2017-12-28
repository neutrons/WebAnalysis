import beforeFirstChunk from '../chunks/TAS';

export default {
  header: true,
  dynamicTyping: true, // parse string to int
  delimiter: ' ',
  newline: '', // auto-detect
  quoteChar: '"',
  skipEmptyLines: true,
  beforeFirstChunk,
};
