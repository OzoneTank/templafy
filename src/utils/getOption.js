function getOption({ name, options, structure }) {
  return structure[name] !== undefined
    ? structure[name]
    : options[name];
}

module.exports = getOption;
