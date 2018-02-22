#!/usr/bin/env node

const fs = require('fs');
const _ = require('lodash');

function buildFromTemplate({ template, path, vars, commands }) {
  const {
    varLeft,
    varRight,
    verbose
  } = commands;
  fs.readFile(template, 'utf8', (err, data) => {
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
  });
}

function replaceVar(string, orig, value) {
  while (string.indexOf(orig) !== -1) {
    string = string.replace(orig, value);
  }
  return string;
}

module.exports = buildFromTemplate;
