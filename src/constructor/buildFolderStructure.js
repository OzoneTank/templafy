const fs = require('fs');
const _ = require('lodash');
const readlineSync = require('readline-sync');

const buildFromTemplate = require('./buildFromTemplate');
const convertPath = require('../utils/convertUtils/convertPath');
const writeToConsole = require('../utils/writeToConsole');
const getOptions = require('../utils/getOptions');
const interactiveFileName = require('../utils/convertUtils/interactiveFileName');

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

  const fileExists = fs.existsSync(path);

  if (verbose && fileExists) {
    writeToConsole(`path exists: ${path}`.yellow);
  }

  if (interactive) {
    path = interactiveFileName({ path });
  }

  try {
    fs.mkdirSync(path);
    if (verbose && !fileExists) {
      writeToConsole(`path created: ${path}`.green);
    }
  } catch (err) {
    if (err && err.code !== 'EEXIST') {
      throw err;
    }
  }

  _.map(structure, (data, name) => {
    if (name.indexOf('.') === -1) {
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
