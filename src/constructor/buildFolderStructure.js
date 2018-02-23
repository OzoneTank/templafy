const fs = require('fs');
const _ = require('lodash');

const buildFromTemplate = require('./buildFromTemplate');
const convertPath = require('../utils/convertPath');

function buildFolderStructure({path, structure, options}) {
  const{
    verbose
  } = options;

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
          options,
          path: `${path}/${name}`,
          structure: data
        });
      } else {
        buildFromTemplate({
          options,
          path: `${path}/${name}`,
          template: data.template,
          vars: data
        });
      }
    });
  });
}

module.exports = buildFolderStructure;