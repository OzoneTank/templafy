function addTabSpace({ data = '', spaces = 0 }) {
  if (data === '') {
    return data;
  }
  return data.split('\n').map((line) => {
    return ' '.repeat(spaces) + line;
  }).join('\n');
}

module.exports = addTabSpace;
