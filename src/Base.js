/**
 * Represents any class returned by a response
 * @private
 */

class Base {

	#client;

	constructor(client, data) {

		this.#client = client;

	}

	// Act as a protected property
	get client() {
		return this.#client;
	}

}

module.exports = Base;