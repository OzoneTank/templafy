const readlineSync = require('readline-sync');

const findVarsInStr = require('../findVarsInStr');
const replaceVarInData = require('./replaceVarInData');
const writeFileData = require('../fileUtils/writeFileData');
const getOptions = require('../getOptions');

function replaceVars({ path, structure, data, options }) {
  const {
    leftVar,
    rightVar,
    verbose,
    interactive
  } = getOptions({ structure, options});

  foundVars = findVarsInStr(data, options.leftVar, options.rightVar);

  foundVars.forEach((key) => {
    let value = structure[key] || '';
    if (interactive || value === '') {
      const question = `${path} ${key}: ` + ((value) ? ` (${value})` : '');
      value = readlineSync.question(question) || value;
    }

    const oldVar = `${leftVar}${key}${rightVar}`
    data = replaceVarInData({ data, oldVar, value });
  });

  writeFileData({ path, data, verbose });
}

module.exports = replaceVars;
