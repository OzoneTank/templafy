const _ = require('lodash');

function replaceVarInData({ data = '', varName, value = '' }) {
  return data.replace(new RegExp(_.escapeRegExp(varName), 'g'), value);
}

module.exports = replaceVarInData;
