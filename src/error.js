/** @module error */

/**
 * A shortcut function that throws an error
 */
module.exports = function error(err) {
	throw new Error(err);
}