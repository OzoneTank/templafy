const fs = require('fs');
const _ = require('lodash');
const readlineSync = require('readline-sync');

const convertPath = require('../utils/convertPath');
const findVarsInStr = require('../utils/findVarsInStr');

function buildFromTemplate({ template, path, info, options }) {
  if (template === undefined) {
    if (info === undefined) {
      return;
    }
    buildFromTemplate({
      template: info,
      path,
      info: {},
      options
    });
    return;
  }

  if (Array.isArray(template)) {
    arrayOfTemplates({ template, path, info, options });
    return;
  }

  template = convertPath({
    path: template,
    isTemplate: true
  });

  fs.readFile(template, 'utf8', (err, data) => {
    fs.readFile(path, 'utf8', (err2, oldData) => {

      const mode = info.mode || options.mode;
      console.log('mode', mode);
      console.log('oldData', oldData);
      console.log('data', data);

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
    });

  });
}

function arrayOfTemplates({ template, path, info, options }) {
  template.forEach((currTemplate, i) => {
    const newInfo = Object.assign({}, info);
    if (i > 0) {
      if (newInfo.mode === 'replace' || newInfo.mode === undefined) {
        newInfo.mode = 'append';
      }
    }

    buildFromTemplate({
      template: currTemplate,
      path,
      info: newInfo,
      options
    })
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

  fs.writeFile(path, data, (err) => {
    if (err) {
      throw err;
    }
    if (verbose) {
      console.log(`${path} saved`);
    }
  });
}

function replaceVar(string, orig, value) {
  while (string.indexOf(orig) !== -1) {
    string = string.replace(orig, value);
  }
  return string;
}

module.exports = buildFromTemplate;
