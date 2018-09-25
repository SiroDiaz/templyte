'use strict';
var templyte = require('./../index');

describe('Testing the string template engine', function () {
  let params = {
    name: 'Siro',
    location: 'Spain',
    birth: (new Date(1993, 5, 30)).toDateString()
  };
  let expectedString1 = 'Siro from Spain',
    expectedString2 = 'Siro from Spain born at '+ params.birth;

  it('should render an empty string', function () {
    expect(templyte.renderString('')).toBe('');
  });

  it('should return the same string passed successfully', function () {
    expect(templyte.renderString('templyte is quite simple')).toEqual('templyte is quite simple');
    expect(templyte.renderString('templyte is quite easy')).toEqual('templyte is quite easy');
  });

  it('should render a variable successfully', function () {
    var params = { name: 'Siro' };
    expect(templyte.renderString('{{name}}', params)).toEqual(params.name);
    expect(templyte.renderString('{{ name }}', params)).toEqual(params.name);
  });

  /**
   *
   */
  it('should render two or more parameters', function () {
    expect(templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params)).toEqual(expectedString2);
    expect(templyte.renderString('{{name}} from {{location}}', params)).toEqual(expectedString1);
  });

  /**
   *
   */
  it('should render a variable with custom tags successfully', function () {
    const obj = { name: 'Siro' };
    const delimiters = ['{', '}'];
    expect(templyte.renderString('{name}', obj, delimiters)).toEqual(obj.name);
    expect(templyte.renderString('{ name }', obj, delimiters)).toEqual(obj.name);
  });

  /**
   *
   */
  it('should render a string with a custom template tags', function () {
    let delimiters = ['[[', ']]'];

    expect(
      templyte.renderString('[[ name ]] from [[location]] born at [[ birth ]]', params, delimiters)
    ).toEqual(expectedString2);
    expect(
      templyte.renderString('[[name]] from [[location]]', params, delimiters)
    ).toEqual(expectedString1);

    delimiters = ['<<', '>>'];

    expect(
      templyte.renderString('<< name >> from <<location>> born at << birth >>', params, delimiters)
    ).toEqual(expectedString2);
    expect(
      templyte.renderString('<< name >> from << location >>', params, delimiters)
    ).toEqual(expectedString1);
  });

  it('should render a string with the same tags of open and close', function () {
    params = {
      name: '{{Siro}}',
      location: 'Spain',
      birth: (new Date(1993, 5, 30)).toDateString()
    };
    let expectedString = '{{Siro}} from Spain born at '+ params.birth;

    expect(templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params)).toEqual(expectedString);
    expectedString = '{{Siro}} from Spain';
    expect(templyte.renderString('{{name}} from {{location}}', params)).toEqual(expectedString);
  });

  it('should throw an exception if delimiters are invalid', function () {
    let delimiters = [];
    expectedString1 = '{{Siro}} from Spain';
    expectedString2 = '{{Siro}} from Spain born at '+ params.birth;

    expect(() => (
      templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params, delimiters)
    )).toThrow();

    expect(() => (
      templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params, {})
    )).toThrow();

    expect(() => (
      templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params, null)
    )).toThrow();

    expect(() => (
      templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params, ['{{'])
    )).toThrow();

    expect(() => (
      templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params, ['{{', '}}', '{{'])
    )).toThrow();
  });

  it('should render a url query string', () => {
    params = {lang: 'es', q: 'google'};
    const output = templyte.renderString('https://encrypted.google.com/search?hl={{lang}}&q={{q}}', params);
    const expectedString = 'https://encrypted.google.com/search?hl=es&q=google';
    expect(output).toEqual(expectedString);
  });
});
