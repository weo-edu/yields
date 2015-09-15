
# yields

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Yield values without es6 generator syntax. `yields` returns an iterator that iterates over the given functions, yielding the results of executing the functions. It is designed to parallel generators as closely as possible.

## Installation

    $ npm install @weo-edu/yields

## Example

```js
var yields = require('yields')

var it = yields(function () {
  return 1
}).yields(function () {
  return 2
}).yields(function () {
  return 3
})()

// output:
// 1
// 2
// 3
var ret
while (!(ret = it.next()).done) {
  console.log(ret.value)
}

```

## Error handling

### simple

with yields:
```js
var it = yields(function () {
  return 1
}, function (err) {
  console.log('caught error')
})
```

with generators:
```js
function *() {
  try {
    yield 1
  } catch (err) {
    console.log('caught error')
  }
}
```

### catch multiple

with yields:
```js
var it = yields(function () {
  return 1
}).yields(function () {
  return 2
}, function (err) {
  console.log('caught error 2')
})
```

with generators:
```js
function *() {
  try {
    yield 1
    yield 2
  } catch (err) {
    console.log('caught error 2')
  }
}
```

## nested

with yields:
```js
var it = yields(function () {
  return 1
}, function (err) {
  console.log('caught error')
}).yields(function () {
  return 2
}, function (err) {
  console.log('caught error 2')
})
```

with generators:
```js
function *() {
  try {
    try {
      yield 1
    } catch (err) {
      console.log('caught error 2')
    }
    yield 2
  } catch (err) {
    console.log('caught error 2')
  }

}
```

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
