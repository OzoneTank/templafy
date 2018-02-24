const _ = require('lodash');

function findVarsInStr(data, left = '/*{', right = '}*/') {
  const leftRx = _.escapeRegExp(left);
  const rightRx = _.escapeRegExp(right);
  const findVarsExp = new RegExp(`${leftRx}(((?!${leftRx})(?!${rightRx}).)*)${rightRx}`, 'g');

  let foundVars = data.match(findVarsExp);

  foundVars = _.uniq(foundVars.map((str) => {
    return str.replace(findVarsExp, '$1');
  }));

  return foundVars;
}

module.exports = findVarsInStr;
