function convertDataByMode({ oldData, data, mode }) {
  switch (mode) {
    case 'prepend':
      return data + '\n' + (oldData || '');

    case 'append':
      return (oldData || '') + '\n' + data;

    case 'replace':
      break;

    case undefined:
    case 'noreplace':
      return (oldData) ? oldData : data

    default:
      //find the number in the value ex [123] is line 123
      const line = (mode.match(/\[(\d+)\]/) || [])[1];

      if (line === undefined) {
        return oldData;
      }

      let index = 0;
      oldData = oldData || '';

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

  return data;
}

module.exports = convertDataByMode;
