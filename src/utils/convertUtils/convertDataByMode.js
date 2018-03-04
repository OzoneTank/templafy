const addDataAtLine = require('./addDataAtLine');
const replaceVarInData = require('./replaceVarInData');

function convertDataByMode({ oldData, data, mode, structure, options }) {
  const {
    leftVar,
    rightVar
  } = getOptions({ structure, options });

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
      const line = parseInt((mode.match(/\[(\d+)\]/) || [])[1], 10);

      if (line !== NaN) {
        return addDataAtLine({ line, oldData, data })
      }

      //find the var name in the value ex {abc} is /*{abc}*/
      const varName = (mode.match(/\{(.+)\}/) || [])[1];

      if (varName !== undefined) {
        return replaceVarInData({
          data: oldData,
          varName: `${leftVar}${varName}${rightVar}`,
          value: data
        });
      }

      return oldData;
  }

  return data;
}

module.exports = convertDataByMode;
