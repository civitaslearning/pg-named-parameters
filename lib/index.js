/*
 * pg-named-parameters
 * Copyright (c) 2013 Civitas Learning Inc
 * MIT Licensed
 */

var _     = require('underscore'),
    utils = require('./utils')
;

module.exports = (function () {
	var pg = require('pg');
	pg.Client.prototype.queryp = _.wrap(pg.Client.prototype.query, function (wrapped, config, values, callback) {
		var parsed = utils.substitute(config, values);
		return wrapped.call(this, parsed[0], parsed[1], callback);
	});
	return pg;
})();
