const fs = require('fs');
const _ = require('lodash');

const buildFromTemplate = require('./buildFromTemplate');
const convertPath = require('../utils/convertPath');

function buildFolderStructure({path, structure, commands}) {
  const {
    verbose
  } = commands;

  if (typeof structure === 'string') {
    structure = convertPath({
      path: structure,
      isTemplate: false
    });
    structure = JSON.parse(fs.readFileSync(structure, 'utf8'));
  }

  fs.mkdir(path, function (err) {
    if (err && err.code === 'EEXIST') {
      if (verbose) {
        console.log(`path already exists: ${path}`);
      }
    } else if (err) {
      throw err;
    }

    _.map(structure, (data, name) => {
      if (name.indexOf('.') === -1) {
        buildFolderStructure({
          path: `${path}/${name}`,
          structure: data,
          commands
        });
      } else {
        buildFromTemplate({
          template: data.template,
          vars: data,
          path: `${path}/${name}`,
          commands
        });
      }
    });
  });
}

module.exports = buildFolderStructure;
