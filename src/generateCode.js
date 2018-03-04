const buildFolderStructure = require('./constructor/buildFolderStructure');
const buildFromTemplate = require('./constructor/buildFromTemplate');
const isJSONFile = require('./utils/isJSONFile');

function generateCode(options) {
  const structure = options.args[0];
  const path = options.args[1] || '.';
  const {
    forceTemplate
  } = options;

  if (forceTemplate || !isJSONFile(structure)) {
    options.interactive = true;
    buildFromTemplate({
      options,
      path,
      structure: {
        template: structure,
        info: options.templateInfo
      }
    });
  } else {
    buildFolderStructure({
      options,
      path,
      structure
    });
  }
};

module.exports = generateCode;
