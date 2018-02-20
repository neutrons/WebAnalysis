export default function (chunk) {
  // Split the text into rows
  let rows = chunk.split(/\r\n|\r|\n/);
  const delimiterRegex = /([\s,]+)/g;

  // Find the delimiter on 2nd row
  const match = delimiterRegex.exec(rows[1]);
  const delimiter = match[1];
  let header = rows[0];

  if (header.startsWith('#')) {
    header = header.replace(/#\s*/, '');
    header = header.split(/[\s,]+/).join(delimiter);
  }

  // Remove punctuations from header names for readability
  header = header.replace(/Pt./, 'pt');

  rows[0] = header.toLowerCase();

  rows = rows.map((el) => {
    const newString = el.replace(/\s+/g, ' ').trim();

    return newString;
  });

  return rows.join('\r\n');
}
