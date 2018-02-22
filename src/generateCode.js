const buildFolderStructure = require('./buildFolderStructure');
const buildFromTemplate = require('./buildFromTemplate');

function isJSON(str) {
  return str.match(/(.json)$/) !== null;
}

function generateCode(commands) {
  const structure = commands.args[0];
  const path = commands.args[1] || '.';

  const {
    forceTemplate
  } = commands;

  if (forceTemplate || !isJSON(structure)) {
    buildFromTemplate({
      commands,
      path,
      template: structure,
      vars: commands.templateVars
    });
  } else {
    buildFolderStructure({
      commands,
      path,
      structure
    });
  }
};

module.exports = generateCode;
