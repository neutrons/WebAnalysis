export default function (chunk) {
  // Split the text into rows
  const rows = chunk.split(/\r\n|\r|\n/);
  const delimiterRegex = /([\s,]+)/g;

  // Find the delimiter on 3rd row
  const match = delimiterRegex.exec(rows[2]);
  const delimiter = match[1];
  let header = rows[0];

  if (header.startsWith('#')) {
    header = header.replace(/#\s*/, '');
    header = header.split(/[\s,]+/).join(delimiter);
  }

  // Rename error for common name scheme throughout
  header = header.replace(/E/, 'error');

  rows[0] = header.replace(/\./g, '').toLowerCase();

  // Remove the 2nd row if it's not data
  if (rows[1].length <= 2) {
    rows.splice(1, 1);
  }

  return rows.join('\r\n');
}
