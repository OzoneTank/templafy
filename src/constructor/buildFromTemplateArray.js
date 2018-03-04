function buildFromTemplateArray({ options, path, structure }) {
  //defined here to fix cyclic require error
  const buildFromTemplate = require('./buildFromTemplate');

  structure.forEach((currStructure, i) => {
    let newStructure;
    if (typeof currStructure === 'string') {
      newStructure = {
        template: currStructure
      }
    } else {
      newStructure = Object.assign({}, currStructure);
    }

    if ((i > 0 && newStructure.mode === 'replace') || newStructure.mode === undefined) {
      newStructure.mode = 'append';
    }

    buildFromTemplate({ options, path, structure: newStructure })
  });
}

module.exports = buildFromTemplateArray;
