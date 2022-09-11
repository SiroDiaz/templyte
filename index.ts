/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/prefer-for-of */
import escapeStringRegexp from 'escape-string-regexp';

/**
 * Renders a string template and returns it with all variables replaced
 * in the string.
 * - Examples of usage:
 * templyte.renderString('Hello {{who}}!', {who: 'world'});
 * templyte.renderString('Hello {{who}}!', {who: 'world'}, ['<%=', '%>'])
 *
 * @param string string_
 * @param {Record<string, unknown>|undefined} data object a key-value pair used to replace in the string.
 * @param {[string,string]|undefined} delimiters  contains the open and close token to replace in the string
 * @returns {string} string the rendered template string
 */
const renderString = (string_: string, data?: Record<string, unknown>, delimiters?: [string, string]) => {
	let renderedString = string_;

	if (delimiters === undefined) {
		delimiters = ['{{', '}}'];
	} else if (Array.isArray(delimiters) && delimiters.length !== 2) {
		throw new TypeError('Array should have an open and closing delimiter');
	}

	const d = delimiters.map(delimiter => escapeStringRegexp(delimiter));
	const extractVarPattern = new RegExp(d[0] + '\\s*([A-Za-z0-9]+)\\s*' + d[1], 'gm');
	let entries;

	const variables = renderedString.match(extractVarPattern);

	if (variables === null) {
		return string_;
	}

	for (let i = 0; i < variables.length; i++) {
		entries = extractVarPattern.exec(string_);
		const attr: string = entries![1];
		if (!(attr in data!)) {
			throw new Error(attr + ' is not defined');
		}

		const itemPattern = new RegExp(d[0] + '\\s*' + attr + '\\s*' + d[1], 'gm');
		renderedString = renderedString.replace(itemPattern, data![attr] as string);
	}

	return renderedString;
};

export default renderString;
