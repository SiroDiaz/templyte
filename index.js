const escapeStringRegexp = require('escape-string-regexp');

/**
 * Renders a string template and returns it with all variables replaced
 * in the string.
 * - Examples of usage:
 * templyte.renderString('Hello {{who}}!', {who: 'world'});
 * templyte.renderString('Hello {{who}}!', {who: 'world'}, ['<%=', '%>'])
 *
 * @param str string
 * @param data object a key-value pair used to replace in the string.
 * @param delimiters undefined|array contains the open and close token to replace in the string
 * @returns string the rendered template string
 */
module.exports.renderString = function(str, data, delimiters) {
  let renderedStr = str;

  if(delimiters === undefined) {
    delimiters = ['{{', '}}'];
  } else if(Array.isArray(delimiters) && delimiters.length !== 2) {
    throw new TypeError('Array should have an open and closing delimiter');
  }

  const d = delimiters.map((delimiter) => escapeStringRegexp(delimiter));
  const extractVarPattern = new RegExp(d[0] + '\\s*([A-Za-z0-9]+)\\s*' + d[1], 'gm');
  let entries;

  while((entries = extractVarPattern.exec(renderedStr)) !== null) {
    if(!data.hasOwnProperty(entries[1])) {
      throw entries[1] +' is not defined';
    }

    const itemPattern = new RegExp(d[0] + '\\s*' + entries[1] + '\\s*' + d[1], 'gm');
    renderedStr = renderedStr.replace(itemPattern, data[entries[1]]);
  }

  return renderedStr;
};