function isJSONFile(str) {
  return str.match(/(.json)$/) !== null;
}

module.exports = isJSONFile;
