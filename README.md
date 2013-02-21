# pg-named-parameters

node-pg plugin to add named parameter support.

## Installation

	npm install pg-named-parameters

## Examples

```javascript
var pg = require('pg-named-parameters');

var conString = "tcp://postgres:1234@localhost/postgres";

var client = new pg.Client(conString);
client.connect(function (err) {
	client.queryp('SELECT * FROM foo WHERE bar=$thing', { thing: "hello world" }, function (err, result) {
		console.log(result.rows);
	});
});
```

## Notes

This module adds the method `queryp` to the node-pg Client object. This method
works exactly like the native `query` method, but accepts a sql string with
named variables as its first parameter and an object of key-value pairs
representing the bind variables.

The syntax of the named variables is the name preceded by a dollar-sign (ex.
$var). To use a literal `$`, escape it by using a double dollar ($$).

## License

Copyright (c) 2013 Civitas Learning Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
