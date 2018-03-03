const setOptions = require('./setOptions');
// const listInternal = require('./src/listInternal');
const printHelp = require('./printHelp');
const generateCode = require('./generateCode');
const writeToConsole = require('./utils/writeToConsole');

function runFromCommandLine(args) {
  const options = setOptions(args);
  const {
    badOptions,
    help,
    listTemplates,
    listStructures
  } = options;

  if (help) {
    printHelp();
    return;
  }

  if (badOptions.length) {
    badOptions.forEach((option) => {
      writeToConsole(`bad option: ${option}`);
    });
    return;
  }

  generateCode(options);
}

module.exports = runFromCommandLine;
