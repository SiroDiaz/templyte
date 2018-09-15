'use strict';
var templyte = require('./../index');

describe('Testing the string template engine', function () {
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

  it('should render two or more parameters', function () {
    var params = {
      name: 'Siro',
      location: 'Spain',
      birth: (new Date(1993, 5, 30)).toDateString()
    };
    var expectedString1 = 'Siro from Spain',
      expectedString2 = 'Siro from Spain born at '+ params.birth;
    expect(templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params)).toEqual(expectedString2);
    expect(templyte.renderString('{{name}} from {{location}}', params)).toEqual(expectedString1);
  });

  it('should render two or more parameters', function () {
    var params = {
      name: 'Siro',
      location: 'Spain',
      birth: (new Date(1993, 5, 30)).toDateString()
    };
    var expectedString1 = 'Siro from Spain',
      expectedString2 = 'Siro from Spain born at '+ params.birth;
    expect(templyte.renderString('{{ name }} from {{location}} born at {{ birth }}', params)).toEqual(expectedString2);
    expect(templyte.renderString('{{name}} from {{location}}', params)).toEqual(expectedString1);
  });
});
