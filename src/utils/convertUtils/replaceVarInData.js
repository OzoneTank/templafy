const _ = require('lodash');

function replaceVarInData({ data, oldVar, value }) {
  return data.replace(new RegExp(_.escapeRegExp(oldVar), 'g'), value);
}

module.exports = replaceVarInData;
