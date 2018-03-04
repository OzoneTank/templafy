const fs = require('fs');
const writeToConsole = require('../writeToConsole');

function writeFileData({ path, data, verbose }) {
  try {
    fs.writeFileSync(path, data);
  } catch (err) {
    if (err) {
      throw err;
    }
    if (verbose) {
      writeToConsole(`${path} saved`);
    }
  }
}

module.exports = writeFileData;
