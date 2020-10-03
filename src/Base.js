/** @module Base */

/**
 * Represents any class returned by a response
 * @private
 */

module.exports = class Base {

	#client;
		
	constructor(client, data) {

		this.#client = client;

	}

	// Act as a protected property
	get client() {
		return this.#client;
	}

}