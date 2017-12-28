export default function (chunk) {
  // Split the text into rows
  const rows = chunk.split(/\r\n|\r|\n/);
  let header = rows[0];
  header = header.replace(/,/, '');

  if (header.startsWith('Data columns')) {
    header = header.replace(/Data columns\s*/, '');
    header = header.split(/[\s,-]+/).join('  ');
  }

  // Rename headings for readability
  header = header.replace(/I\(QxQy\)/, 'intensity');
  header = header.replace(/err\(I\)/, 'error');

  rows[0] = header.toLowerCase();

  // Remove the 2nd row if it's not data
  if (rows[1].split(/[\s,-]+/).length <= 2) {
    rows.splice(1, 1);
  }

  return rows.join('\r\n');
}
