'use strict';

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
module.exports.renderString = function renderString(str, data, delimiters) {
  let renderedStr = str;

  if(delimiters === undefined) {
    delimiters = ['{{', '}}'];
  } else if(Array.isArray(delimiters) && delimiters.length !== 2) {
    throw new TypeError('Array should have an open and closing delimiter');
  }

  const d = delimiters.map((delimiter) => escapeStringRegexp(delimiter));
  const extractVarPattern = new RegExp(d[0] + '\\s*([A-Za-z0-9]+)\\s*' + d[1], 'gm');
  let entries;

  const variables = renderedStr.match(extractVarPattern);
  if (variables === null) {
    return str;
  }
  for(let i = 0; i < variables.length; i++) {
    entries = extractVarPattern.exec(str);
    const attr = entries[1];
    if(!data.hasOwnProperty(attr)) {
      throw attr +' is not defined';
    }

    const itemPattern = new RegExp(d[0] + '\\s*' + attr + '\\s*' + d[1], 'gm');
    renderedStr = renderedStr.replace(itemPattern, data[attr]);
  }

  return renderedStr;
};
