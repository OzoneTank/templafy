const internalPath = 'internal/';
const templatePath = 'templates/';
const structurePath = 'structures/';

function convertPath({path, isTemplate}) {
  if (path.indexOf(':') === 0) {
    path = path.replace(':', internalPath + ((isTemplate) ? templatePath : structurePath));
  }

  return path;
}

module.exports = convertPath;
