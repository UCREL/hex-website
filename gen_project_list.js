const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { parse } = require('csv-parse/sync');

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node gen_project_list.js <path-to-csv>');
  process.exit(1);
}

const content = fs.readFileSync(path.resolve(filePath), 'utf8');
const rows = parse( content, { skip_empty_lines: true, trim: true } );

let output = {};
for (const row of rows) {
    if( row[0] === 'Id' )
        continue;

    const date = new Date(row[2] || '').getFullYear().toString() || '';
    const title = row[7] || '';
    const description = row[8] || '';

    if( !date || !title || date === 'NaN' )
        continue;

    let list = output[date] || [];
    list.push({ 'title': title, 'description': description });
    output[date] = list;
}

console.log(  yaml.dump(output) );
