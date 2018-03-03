const fs = require('fs');
const _ = require('lodash');
const readlineSync = require('readline-sync');

const convertPath = require('../utils/convertPath');
const findVarsInStr = require('../utils/findVarsInStr');
const writeToConsole = require('../utils/writeToConsole');

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
  let data;
  let oldData;

  try {
    data = fs.readFileSync(template, 'utf8');
  } catch (err) {
    throw err;
  }

  try {
    oldData = fs.readFileSync(path, 'utf8');
  } catch (err) {
    if (err && err.code !== 'ENOENT') {
      throw err;
    }
  }

  const mode = structure.mode || options.mode;

  switch (mode) {
    case 'prepend':
      data = data + '\n' + (oldData || '');
      break;

    case 'append':
      data = (oldData || '') + '\n' + data;
      break;

    case 'replace':
      break;

    case undefined:
    case 'noreplace':
      if (oldData) {
        data = oldData;
      }
      break;

    default:
      //find the number in the value ex [123] is line 123
      const line = (mode.match(/\[(\d+)\]/) || [])[1];

      if (line === undefined) {
        data = oldData;
      } else {
        let index = 0;
        oldData = oldData || '';

        for (let i = 0; i < (line - 1) && index >= 0; i++) {
          index = oldData.indexOf('\n', index + 1);
        }

        if (index < 0) {
          index = oldData.length;
        }

        data = oldData.substr(0, index) +
          (index ? '\n' : '') +
          data +
          (index ? '' : '\n') +
          oldData.substr(index);
      }
      break;
  }

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

    data = replaceVar(data, `${leftVar}${key}${rightVar}`, value);
  });

  try{
    fs.writeFileSync(path, data);
  } catch(err) {
    if (err) {
      throw err;
    }
    if (verbose) {
      writeToConsole(`${path} saved`);
    }
  }
}

function replaceVar(string, orig, value) {
  while (string.indexOf(orig) !== -1) {
    string = string.replace(orig, value);
  }
  return string;
}

module.exports = buildFromTemplate;
