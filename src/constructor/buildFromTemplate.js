const buildFromTemplateArray = require('./buildFromTemplateArray');
const convertDataByMode = require('../utils/convertUtils/convertDataByMode');
const convertPath = require('../utils/convertUtils/convertPath');
const replaceVars = require('../utils/convertUtils/replaceVars');
const getFileData = require('../utils/fileUtils/getFileData');
const getOption = require('../utils/getOption');

function buildFromTemplate({ options, path, structure }) {
  if (Array.isArray(structure)) {
    buildFromTemplateArray({ options, path, structure });
    return;
  }

  if (typeof structure === 'string') {
    buildFromTemplate({
      options,
      path,
      structure: {
        template: structure
      }
    });
    return;
  }

  const template = convertPath({
    path: structure.template,
    isTemplate: true
  });
  let data = getFileData({ path: template });
  let oldData = getFileData({ path });

  const mode = getOption({ name: 'mode', structure, options });

  data = convertDataByMode({ oldData, data, mode });

  replaceVars({ path, structure, data, options });
}

module.exports = buildFromTemplate;
