const fs = require('fs');
const writeToConsole = require('../writeToConsole');

function getFileData({ path, verbose, oldPathName }) {
  let data = '';

  if (verbose && fs.existsSync(path)) {
    writeToConsole(`path exists: ${oldPathName}`.yellow);
  }

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
