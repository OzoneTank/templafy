var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
const helpText = require('./help.txt');
const writeToConsole = require('./utils/writeToConsole');

const printHelp = () => {
  writeToConsole(helpText);
};

module.exports = printHelp;
