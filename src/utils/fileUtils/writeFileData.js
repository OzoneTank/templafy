const fs = require('fs');
const writeToConsole = require('../writeToConsole');

function writeFileData({ path, data, verbose }) {
  try {
    fs.writeFileSync(path, data);
    if (verbose) {
      writeToConsole(`${path} saved`.green);
    }
  } catch (err) {
    if (err) {
      throw err;
    }
  }
}

module.exports = writeFileData;
