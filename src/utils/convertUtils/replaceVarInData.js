const _ = require('lodash');
const addTabSpace = require('./addTabSpace');

function replaceVarInData({ data = '', varName, value = '' }) {
  return data.split('\n').map((line) => {
    if (line.indexOf(varName) !== -1) {
      const lineArray = line.split(varName);
      const spaces = lineArray[0].length;
      const newValue = addTabSpace({ data: value, spaces, skipFirstLine: true });
      return lineArray.join(newValue);
    }
    return line;
  }).join('\n');

  // I'm going to miss this nice regex :rip:
  // const regexVarName = new RegExp(_.escapeRegExp(varName), 'g');
  // return data.replace(regexVarName, value);
}

module.exports = replaceVarInData;
