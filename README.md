# templyte

[![Software License][ico-license]](LICENSE.md)
[![Build Status][ico-travis]][link-travis]
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3XKLA6VTYVSKW&source=url)


Simple and lightweight Javascript string template. Useful for simple string translations and text replacing.

## install
You can install it if your Node.JS version is >= 6.x. Then run the following command:
```bash
> npm install templyte --save
```

## usage

Templyte is quite simple and easy to use. Just one method for render a string.

```javascript
const templyte = require('templyte');

let myString = templyte.renderString('Hello {{who}}!', {who: 'world'});
console.log(myString);  // Hello world!
```

Also you can use a custom template tag like *"[[ variable ]]"* just adding third parameter to
renderString method.
```javascript
const templyte = require('templyte');
const delimiters = ['[[', ']]'];
let myString = templyte.renderString('Hello [[who]]!', {who: 'world'}, delimiters);
```
The renderString will escape the delimiters for regular expression security.

## Security

If you discover any security related issues, use the issue tracker.

## Credits

- [Siro Díaz Palazón][link-author]

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.


[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/SiroDiaz/templyte/master.svg?style=flat-square

[link-author]: https://github.com/SiroDiaz
[link-travis]: https://travis-ci.org/SiroDiaz/templyte
