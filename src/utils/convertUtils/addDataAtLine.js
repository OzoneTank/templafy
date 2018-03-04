const addTabSpace = require('./addTabSpace');

function addDataAtLine({ line, spaces = 0, data = '', oldData = '' }) {
  if (data === '') {
    return oldData;
  }

  if (oldData === '') {
    return data;
  }

  data = addTabSpace({ data, spaces });

  let index = 0;

  for (let i = 0; i < (line - 1) && index >= 0; i++) {
    index = oldData.indexOf('\n', index + 1);
  }

  if (index < 0) {
    index = oldData.length;
  }

  return oldData.substr(0, index) +
    (index ? '\n' : '') +
    data +
    (index ? '' : '\n') +
    oldData.substr(index);
}

module.exports = addDataAtLine;
