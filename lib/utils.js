/*
 * pg-named-parameters
 * Copyright (c) 2013 Civitas Learning Inc
 * MIT Licensed
 */

/** @module pg-named-parameters/utils */

var _ = require('underscore');

/**
 * Substitute named bind parameters with positional bind parameters.
 * @example
 * // returns ['SELECT * FROM customers WHERE name=$1', ['John Smith']]
 * var results = substitute('SELECT * FROM customers WHERE name=$name', { name: 'John Smith' });
 *
 * @param {String} txt The SQL string for substitution
 * @param {Object} ctx A mapping of variable names to values for bind values
 * @returns {Array} An array with the new SQL string as the first element, and an array of bind values as the second element
 */
exports.substitute = function (txt, ctx) {
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


