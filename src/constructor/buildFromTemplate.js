const fs = require('fs');
const readlineSync = require('readline-sync');
const buildFromTemplateArray = require('./buildFromTemplateArray');
const convertDataByMode = require('../utils/convertUtils/convertDataByMode');
const convertPath = require('../utils/convertUtils/convertPath');
const replaceVars = require('../utils/convertUtils/replaceVars');
const getFileData = require('../utils/fileUtils/getFileData');
const getOptions = require('../utils/getOptions');
const extractNameFromPath = require('../utils/extractNameFromPath');
const interactiveFileName = require('../utils/convertUtils/interactiveFileName');
const writeToConsole = require('../utils/writeToConsole');

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

  let templatePath = structure.template;
  const {
    interactive,
    mode,
    verbose
  } = getOptions({ structure, options });

  if (interactive) {
    path = interactiveFileName({ path });
    templatePath = readlineSync.question('template'.magenta + `: (${templatePath.blue}): `).trim() || templatePath;
  }

  const template = convertPath({
    path: templatePath,
    isTemplate: true
  });

  if (!fs.existsSync(template)) {
    writeToConsole(`${templatePath} does not exist, skipping`.yellow.bgRed);
    return;
  }

  let data = getFileData({ path: template });
  let oldData = getFileData({ path, verbose, oldPathName: path, mode });

  data = convertDataByMode({ oldData, data, mode, structure, options });

  replaceVars({ path, structure, data, options });
}

module.exports = buildFromTemplate;
