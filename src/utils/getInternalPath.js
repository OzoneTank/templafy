function getInternalPath() {
  return process.argv[1].replace(/index$/, 'internal/');
}

module.exports = getInternalPath;
