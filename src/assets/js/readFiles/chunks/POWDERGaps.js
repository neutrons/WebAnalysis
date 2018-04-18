export default function (chunk) {
  // Split the text into rows
  let rows = chunk.split(/\r\n|\r|\n/);
  // Remove "redo" or date timestamp from metadata on first and second row
  const reg = /(\d+)\/(\d+)|redo/g;
  rows[0] = rows[0].replace(reg, '');
  rows[1] = rows[1].replace(reg, '');

  // Rebind everything back as a single string with additional spaces removed
  rows = rows.map(el => el.replace(/\s\s+/g, ' ').trim()).join('\r\n');

  return rows;
}
