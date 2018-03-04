const _ = require('lodash');
const readlineSync = require('readline-sync');

const convertPath = require('../utils/convertUtils/convertPath');
const findVarsInStr = require('../utils/findVarsInStr');
const getFileData = require('../utils/fileUtils/getFileData');
const writeFileData = require('../utils/fileUtils/writeFileData');
const convertDataByMode = require('../utils/convertUtils/convertDataByMode');
const replaceVarInData = require('../utils/convertUtils/replaceVarInData');

function buildFromTemplate({ options, path, structure }) {
  if (Array.isArray(structure)) {
    arrayOfTemplates({ options, path, structure });
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

  const mode = structure.mode || options.mode;

  data = convertDataByMode({ oldData, data, mode });

  replaceVars({ path, structure, data, options });
}

function arrayOfTemplates({ options, path, structure }) {
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

function replaceVars({ path, structure, data, options }) {
  const {
    leftVar,
    rightVar,
    verbose
  } = options;
  const interactive = structure.interactive !== undefined
    ? structure.interactive
    : options.interactive;

  foundVars = findVarsInStr(data, options.leftVar, options.rightVar);

  foundVars.forEach((key) => {
    let value = structure[key] || '';
    if (interactive || value === '') {
      const question = `${path} ${key}: ` + ((value) ? ` (${value})` : '');
      value = readlineSync.question(question) || value;
    }

    const oldVar = `${leftVar}${key}${rightVar}`
    data = replaceVarInData({ data,oldVar,value });
  });

  writeFileData({ path, data, verbose });
}

module.exports = buildFromTemplate;
