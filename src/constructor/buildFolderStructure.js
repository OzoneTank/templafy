const fs = require('fs');
const _ = require('lodash');
const readlineSync = require('readline-sync');

const buildFromTemplate = require('./buildFromTemplate');
const convertPath = require('../utils/convertUtils/convertPath');
const writeToConsole = require('../utils/writeToConsole');
const getOptions = require('../utils/getOptions');

function buildFolderStructure({path, structure, options}) {
  const{
    interactive,
    verbose
  } = getOptions({ structure, options });

  if (typeof structure === 'string') {
    structure = convertPath({
      path: structure,
      isTemplate: false
    });
    structure = JSON.parse(fs.readFileSync(structure, 'utf8'));
  }

  try {
    fs.mkdirSync(path);
  } catch (err) {
    if (err && err.code === 'EEXIST') {
      if (verbose) {
        writeToConsole(`path already exists: ${path}`);
      }
    } else if (err) {
      throw err;
    }
  }

  _.map(structure, (data, name) => {
    if (name.indexOf('.') === -1) {
      if (interactive) {
        name = readlineSync.question(`${path}/(${name})`).trim() || name;
      }
      buildFolderStructure({
        options,
        path: `${path}/${name}`,
        structure: data
      });
    } else {
      buildFromTemplate({
        options,
        path: `${path}/${name}`,
        structure: data
      });
    }
  });
}

module.exports = buildFolderStructure;
