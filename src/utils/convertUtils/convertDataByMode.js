const addDataAtLine = require('./addDataAtLine');
const replaceVarInData = require('./replaceVarInData');
const getOptions = require('../getOptions');

const lineRegex = /\[(\d+)(?::(\d+))?\]/;


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
      return data;

    case undefined:
    case 'noreplace':
      return (oldData) ? oldData : data

    default:
      //find the number in the value ex [123] is line 123
      let [, line, spaces] = (mode.match(lineRegex) || []);

      if (line !== undefined) {
        line = parseInt(line, 10);
        spaces = parseInt(spaces, 10) || 0;
        return addDataAtLine({ line, spaces, oldData, data })
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
  }

  return oldData;
}

module.exports = convertDataByMode;
