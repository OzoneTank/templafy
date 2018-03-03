const fs = require('fs');
const _ = require('lodash');
const readlineSync = require('readline-sync');

const convertPath = require('../utils/convertPath');
const findVarsInStr = require('../utils/findVarsInStr');
const writeToConsole = require('../utils/writeToConsole');

function buildFromTemplate({ options, path, structure }) {
  // if (template === undefined) {
  //   if (info === undefined) {
  //     return;
  //   }
  //   buildFromTemplate({
  //     template: info,
  //     path,
  //     info: {},
  //     options
  //   });
  //   return;
  // }

  if (Array.isArray(structure)) {
    arrayOfTemplates({ options, path, structure });
    return;
  }

  // if (template.template) {
  //   buildFromTemplate({
  //     template: template.template,
  //     path,
  //     info: template,
  //     options
  //   });
  //   return;
  // }

  const template = convertPath({
    path: structure.template || structure,
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

  const { info } = structure;
  const mode = info.mode || options.mode;

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

  replaceVars({ path, info, data, options });
}

function arrayOfTemplates({ options, path, structure }) {
  structure.forEach((currStructure, i) => {
    const info = Object.assign({}, currStructure.info);
    if (i > 0) {
      if (info.mode === 'replace' || info.mode === undefined) {
        info.mode = 'append';
      }
    }
    if (typeof currStructure === 'string') {
      currStructure = {
        template: currStructure,
        info
      }
    }

    buildFromTemplate({ options, path, structure })
  });
}

function replaceVars({ path, info, data, options }) {
  const {
    interactive,
    leftVar,
    rightVar,
    verbose
  } = options;

  foundVars = findVarsInStr(data, options.leftVar, options.rightVar);

  foundVars.forEach((key) => {
    let value = info[key] || '';
    if (interactive) {
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
