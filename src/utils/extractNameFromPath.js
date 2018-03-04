function extractNameFromPath(path) {
  const index = path.lastIndexOf('/');
  return {
    path: path.substr(0, index),
    name: path.substr(index + 1)
  };
}

module.exports = extractNameFromPath;
