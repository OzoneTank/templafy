const fs = require('fs');
const _ = require('lodash');

const convertPath = require('../utils/convertPath');

function buildFromTemplate({ template, path, vars, options }) {
  template = convertPath({
    path: template,
    isTemplate: true
  });

  fs.readFile(template, 'utf8', (err, data) => {
    replaceVars({ path, vars, data, options });
  });
}

function replaceVars({ path, vars, data, options }) {
  const {
    varLeft,
    varRight,
    verbose
  } = options;
  _.map(vars, (value, key) => {
    if (key !== 'template') {
      data = replaceVar(data, `${varLeft}${key}${varRight}`, value);
    }
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
