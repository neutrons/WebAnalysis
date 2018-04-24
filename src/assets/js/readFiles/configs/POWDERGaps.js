import beforeFirstChunk from '../chunks/POWDERGaps';

export default {
  header: false,
  dynamicTyping: true, // parse string to int
  delimiter: ' ',
  newline: '', // auto-detect
  quoteChar: '"',
  skipEmptyLines: true,
  beforeFirstChunk,
};
