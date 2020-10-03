/** @module mobile/Streak */

const Base = require("../Base");

/**
 * Information about a user's daily login streak
 */
class Streak extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The user's current streak
		 * @type {number}
		 */
		this.streak = data.streak;

		/**
		 * The user's highest streak
		 * @type {number}
		 */
		this.streakMax = data.streakMax;

		/**
		 * Unknown value - always same as streak?
		 * @type {number}
		 */
		this.totalStreak = data.totalStreak;

	}


}

module.exports = Streak;