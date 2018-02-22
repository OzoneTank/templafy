var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
const helpText = require('./help.txt');

const printHelp = () => {
  console.log(helpText);
};

module.exports = printHelp;
