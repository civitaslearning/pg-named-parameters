var _ = require('underscore');

var substitute = function (txt, ctx) {
	var map     = Object.create(null),
	    counter = 0,
	    bind    = []
	;

	var replacer = function (match, param) {
		// Ignore escaped parameters (using double-dollar.. $$foo)
		if (param.indexOf('$') === 0) {
			return param;
		}
		// Reuse placeholder if it was already referenced
		else if (_.has(map, param)) {
			return map[param];
		}
		// Create new placeholder
		var placeholder = "$" + (counter + 1);
		map[param] = placeholder;
		bind[counter++] = ctx[param];
		return placeholder;
	};
	return [txt.replace(/\$([$\w]+)/g, replacer), bind];
};

module.exports = (function () {
	var pg = require('pg');
	pg.Client.prototype.queryp = _.wrap(pg.Client.prototype.query, function (wrapped, config, values, callback) {
		var parsed = substitute(config, values);
		return wrapped.call(this, parsed[0], parsed[1], callback);
	});
	return pg;
})();
