import renderString, {countTokens, getTokens} from '..';

type ParameterType = {
	name: string;
	location: string;
	birth: string;
};

describe('Testing the string template engine', () => {
	let parameters: Partial<ParameterType> = {
		name: 'Siro',
		location: 'Spain',
		birth: (new Date(1993, 5, 30)).toDateString(),
	};
	const expectedString1 = 'Siro from Spain';
	const expectedString2 = 'Siro from Spain born at ' + parameters.birth!;

	it('should return a list of variables name or identifiers in the string', () => {
		expect(getTokens('templyte is quite simple')).toHaveLength(0);
		expect(getTokens('templyte is quite simple')).toEqual([]);
		expect(getTokens('templyte is {{ mode }}')).toHaveLength(1);
		expect(getTokens('templyte is {{ mode }}')).toEqual(['mode']);
		expect(getTokens('templyte was designed by {{name}} from {{ country}}')).toHaveLength(2);
		expect(getTokens('templyte was designed by {{name}} from {{ country}}')).toEqual(['name', 'country']);
		expect(getTokens('templyte was designed by {{name}} from {{ country}}')).toEqual(['name', 'country']);
		expect(getTokens('templyte was designed by [[name]] from [[ country]]}}', ['[[', ']]'])).toEqual(['name', 'country']);
	});

	it('should return the number of variables inside the string', () => {
		expect(countTokens('templyte is quite simple')).toEqual(0);
		expect(countTokens('templyte is {{ mode }}')).toEqual(1);
		expect(countTokens('templyte was designed by {{name}} from {{ country}}')).toEqual(2);
	});

	it('should render an empty string', () => {
		expect(renderString('')).toBe('');
	});

	it('should return the same string passed successfully', () => {
		expect(renderString('templyte is quite simple')).toEqual('templyte is quite simple');
		expect(renderString('templyte is quite easy')).toEqual('templyte is quite easy');
	});

	it('should render a variable successfully', () => {
		const parameters_ = {name: 'Siro'};
		expect(renderString('{{name}}', parameters_)).toEqual(parameters_.name);
		expect(renderString('{{ name }}', parameters_)).toEqual(parameters_.name);
	});

	/**
   *
   */
	it('should render two or more parameters', () => {
		expect(renderString('{{ name }} from {{location}} born at {{ birth }}', parameters)).toEqual(expectedString2);
		expect(renderString('{{name}} from {{location}}', parameters)).toEqual(expectedString1);
	});

	/**
   *
   */
	it('should render a variable with custom tags successfully', () => {
		const object = {name: 'Siro'};
		const delimiters: [string, string] = ['{', '}'];
		expect(renderString('{name}', object, delimiters)).toEqual(object.name);
		expect(renderString('{ name }', object, delimiters)).toEqual(object.name);
	});

	/**
   *
   */
	it('should render a string with a custom template tags', () => {
		let delimiters: [string, string] = ['[[', ']]'];

		expect(
			renderString('[[ name ]] from [[location]] born at [[ birth ]]', parameters, delimiters),
		).toEqual(expectedString2);
		expect(
			renderString('[[name]] from [[location]]', parameters, delimiters),
		).toEqual(expectedString1);

		delimiters = ['<<', '>>'];

		expect(
			renderString('<< name >> from <<location>> born at << birth >>', parameters, delimiters),
		).toEqual(expectedString2);
		expect(
			renderString('<< name >> from << location >>', parameters, delimiters),
		).toEqual(expectedString1);
	});

	it('should render a string with the same tags of open and close', () => {
		parameters = {
			name: '{{Siro}}',
			location: 'Spain',
			birth: (new Date(1993, 5, 30)).toDateString(),
		};
		let expectedString = '{{Siro}} from Spain born at ' + parameters.birth!;

		expect(renderString('{{ name }} from {{location}} born at {{ birth }}', parameters)).toEqual(expectedString);
		expectedString = '{{Siro}} from Spain';
		expect(renderString('{{name}} from {{location}}', parameters)).toEqual(expectedString);
	});

	it('should render a url query string', () => {
		const parametersObject = {lang: 'es', q: 'google'};
		const output = renderString('https://encrypted.google.com/search?hl={{lang}}&q={{q}}', parametersObject);
		const expectedString = 'https://encrypted.google.com/search?hl=es&q=google';
		expect(output).toEqual(expectedString);
	});
});
