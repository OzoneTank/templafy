const readlineSync = require('readline-sync');

const buildFromTemplateArray = require('./buildFromTemplateArray');
const convertDataByMode = require('../utils/convertUtils/convertDataByMode');
const convertPath = require('../utils/convertUtils/convertPath');
const replaceVars = require('../utils/convertUtils/replaceVars');
const getFileData = require('../utils/fileUtils/getFileData');
const getOptions = require('../utils/getOptions');
const extractNameFromPath = require('../utils/extractNameFromPath');

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
    mode
  } = getOptions({ structure, options });

  if (interactive) {
    const result = extractNameFromPath(path);
    let name = result.name;
    let newPath = result.path || '.';
    const question = `${newPath}/(${name}): `;
    name = readlineSync.question(question).trim() || name;
    path = `${newPath}/${name}`;
  }

  let data = getFileData({ path: template });
  let oldData = getFileData({ path });

  data = convertDataByMode({ oldData, data, mode });

  replaceVars({ path, structure, data, options });
}

module.exports = buildFromTemplate;
