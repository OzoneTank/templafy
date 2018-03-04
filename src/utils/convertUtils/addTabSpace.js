function addTabSpace({ data = '', spaces = 0, skipFirstLine = false }) {
  if (data === '') {
    return data;
  }
  return data.split('\n').map((line, i) => {
    if (skipFirstLine && i === 0) {
      return line;
    }
    return ' '.repeat(spaces) + line;
  }).join('\n');
}

module.exports = addTabSpace;
