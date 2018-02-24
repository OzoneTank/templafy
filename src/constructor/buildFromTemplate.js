const fs = require('fs');
const _ = require('lodash');
const readlineSync = require('readline-sync');

const convertPath = require('../utils/convertPath');
const findVarsInStr = require('../utils/findVarsInStr');

function buildFromTemplate({ template, path, info, options }) {
  template = convertPath({
    path: template,
    isTemplate: true
  });

  fs.readFile(template, 'utf8', (err, data) => {
    replaceVars({ path, info, data, options });
  });
}

function replaceVars({ path, info, data, options }) {
  const {
    interactive,
    varLeft,
    varRight,
    verbose
  } = options;

  foundVars = findVarsInStr(data, options.varLeft, options.varRight);

  foundVars.forEach((key) => {
    let value = info[key] || '';
    if (interactive) {
      const question = `${path} ${key}:` + ((value) ? ` (${value})` : '');
      value = readlineSync.question(question) || value;
    }

    data = replaceVar(data, `${varLeft}${key}${varRight}`, value);
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
