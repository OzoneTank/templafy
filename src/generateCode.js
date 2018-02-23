const buildFolderStructure = require('./constructor/buildFolderStructure');
const buildFromTemplate = require('./constructor/buildFromTemplate');

const isJSONFile = require('./utils/isJSONFile');

function generateCode(commands) {
  const structure = commands.args[0];
  const path = commands.args[1] || '.';

  const {
    forceTemplate
  } = commands;

  if (forceTemplate || !isJSONFile(structure)) {
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
