import renderString from '..';

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
