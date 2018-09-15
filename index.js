const escapeStringRegexp = require('escape-string-regexp');

module.exports.renderString = function(str, data, delimiters) {
  let renderedStr = str;

  if(delimiters === undefined) {
    delimiters = ['{{', '}}'];
  } else if(_.isArray(delimiters) && delimiters.length !== 2) {
    throw 'Array should have an open and closing delimiter';
  }

  const d = delimiters.map((delimiter) => escapeStringRegexp(delimiter));
  const extractVarPattern = new RegExp(d[0] + '\\s*([A-Za-z0-9]+)\\s*' + d[1], 'g');
  let entries;

  while((entries = extractVarPattern.exec(renderedStr)) !== null) {
    if(!data.hasOwnProperty(entries[1])) {
      throw entries[1] +' is not defined';
    }

    const itemPattern = new RegExp(d[0] + '\\s*' + entries[1] + '\\s*' + d[1], 'g');
    renderedStr = renderedStr.replace(itemPattern, data[entries[1]]);
  }

  return renderedStr;
};