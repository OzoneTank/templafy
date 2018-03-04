const buildFromTemplateArray = require('./buildFromTemplateArray');
const convertDataByMode = require('../utils/convertUtils/convertDataByMode');
const convertPath = require('../utils/convertUtils/convertPath');
const replaceVars = require('../utils/convertUtils/replaceVars');
const getFileData = require('../utils/fileUtils/getFileData');
const getOptions = require('../utils/getOptions');
const extractNameFromPath = require('../utils/extractNameFromPath');
const interactiveFileName = require('../utils/convertUtils/interactiveFileName');

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

  const {
    interactive,
    mode,
    verbose
  } = getOptions({ structure, options });

  if (interactive) {
    path = interactiveFileName({ path });
  }

  let data = getFileData({ path: template, verbose, oldPathName: structure.template });
  let oldData = getFileData({ path, verbose, oldPathName: path });

  data = convertDataByMode({ oldData, data, mode, structure, options });

  replaceVars({ path, structure, data, options });
}

module.exports = buildFromTemplate;
