const readlineSync = require('readline-sync');
const extractNameFromPath = require('../extractNameFromPath');

function interactiveFileName({ path }) {
  const result = extractNameFromPath(path);
  let name = result.name;
  let newPath = result.path || '.';
  const question = `${newPath}/(${name.blue}): `;

  name = readlineSync.question(question).trim() || name;
  path = `${newPath}/${name}`;

  return path;
}

module.exports = interactiveFileName;
