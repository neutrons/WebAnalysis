export default function (chunk) {
  // Split the text into rows
  let rows = chunk.split(/\r\n|\r|\n/);

  // Remove "cycle" metadata on first row
  rows[0] = rows[0].split('cycle')[0];

  // Rebind everything back as a single string
  rows = rows.map((el) => {
    const newString = el.trim();

    return newString;
  }).join(' ');

  return rows;
}
