# templyte

[![Software License][ico-license]](LICENSE.md)
[![Build Status][ico-travis]][link-travis]

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

[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/SiroDiaz/templyte/master.svg?style=flat-square

[link-travis]: https://travis-ci.org/SiroDiaz/RandImgProvider