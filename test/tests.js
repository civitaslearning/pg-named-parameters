/* use nodeunit: nodeunit test */
var utils = require('../lib/utils.js');

module.exports = {
	"simple replacement": function (test) {
		test.expect(2);

		var txt = '$test1';
		var results = utils.substitute(txt, { test1: 'works' });

		test.strictEqual(results[0], '$1');
		test.deepEqual(results[1], ['works']);

		test.done();
	},
	"repeated replacement": function (test) {
		test.expect(2);

		var txt = '$test1 $test1';
		var results = utils.substitute(txt, { test1: 'works' });

		test.strictEqual(results[0], '$1 $1');
		test.deepEqual(results[1], ['works']);

		test.done();
	},
	"multi replacement": function (test) {
		test.expect(2);

		var txt = '$test1 $test2';
		var results = utils.substitute(txt, { test1: 'works', test2: 'also' });

		test.strictEqual(results[0], '$1 $2');
		test.deepEqual(results[1], ['works', 'also']);

		test.done();
	},
	"escaping": function (test) {
		test.expect(2);

		var txt = '$$test1';
		var results = utils.substitute(txt, { test1: 'works' });

		test.strictEqual(results[0], '$test1');
		test.deepEqual(results[1], []);

		test.done();
	}
};
