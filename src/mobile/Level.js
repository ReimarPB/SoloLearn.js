/** @module mobile/Level */

const Base = require("../Base");

/**
 * Represents a SoloLearn level
 */
class Level extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The amount of XP required to level up
		 * @type {number}
		 */
		this.maxXp = data.maxXp;

		/**
		 * The level number
		 * @type {number}
		 */
		this.number = data.number;

		/**
		 * The badge you get for achieving this level or (null | Badge.NONE) if you don't get anything
		 * @type {?Badge}
		 */
		this.status = data.status;

	}

}

module.exports = Level;