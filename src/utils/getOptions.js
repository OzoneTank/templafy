const getOption = require('./getOption');
const _ = require('lodash');

function getOptions({ options, structure }) {
  const obj = {};

  _.map(
    _.union(
      _.keys(structure), _.keys(options)
    ), (name) => {
      obj[name] = getOption({ name, structure, options });
    }
  );

  return obj;
}

module.exports = getOptions;
