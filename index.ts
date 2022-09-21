import escapeStringRegexp from 'escape-string-regexp';

export type DelimiterType = [string, string];

/**
 * Get all tokens from the string. In this case, only identifiers between
 * delimiters. This function doesn't replace identifiers, just returns an
 * array with the identifiers name.
 *
 * @param {string} templateString
 * @param {[string,string]|undefined} delimiters
 * @returns {string[]}
 */
export const getTokens: (templateString: string, delimiters?: DelimiterType) => string[] = (
	templateString,
	delimiters = ['{{', '}}'],
) => {
	const d = delimiters.map(delimiter => escapeStringRegexp(delimiter));
	const extractVarPattern = new RegExp(d[0] + '\\s*([A-Za-z0-9]+)\\s*' + d[1], 'gm');

	const variables = templateString.match(extractVarPattern);

	if (!variables) {
		return [];
	}

	return variables.map(variable => extractVarPattern.exec(templateString)![1]);
};

/**
 * Count tokens is a function built on top getTokens. It is just a wrapper
 * that pretends to be more concise. Under the hood, this funtion executes
 * the parser only one time.
 *
 * @param {string} templateString
 * @param {[string,string]|undefined} delimiters
 * @returns {number}
 */
export const countTokens: (templateString: string, delimiters?: DelimiterType) => number = (
	templateString,
	delimiters = ['{{', '}}'],
) => getTokens(templateString, delimiters).length;

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

	for (const _ of variables) {
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
