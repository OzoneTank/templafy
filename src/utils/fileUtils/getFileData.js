const fs = require('fs');

function getFileData({ path }) {
  let data = '';
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (err) {
    if (err && err.code !== 'ENOENT') {
      throw err;
    }
  }

  return data;
}

module.exports = getFileData;
