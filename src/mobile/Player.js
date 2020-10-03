/** @module mobile/Player */

const User = require("./User");

/**
 * Represents a user participating in a contest
 */
class Player extends User {

	constructor(client, data) {
		super(...arguments);

		/**
		 * Unknown value - always null?
		 * @type {?*}
		 */
		this.activeChallengeID = data.activeChallengeID;

		/**
		 * Unknown value - always null?
		 * @type {?*}
		 */
		this.alternateName = data.alternateName;

		/**
		 * Unknown value - always 0?
		 * @type {number}
		 */
		this.result = data.result;

		/**
		 * Unknown value - always empty array?
		 * @type {*[]}
		 */
		this.results = data.results;

		/**
		 * Unknown value
		 * @type {number}
		 */
		this.rewardXp = data.rewardXp;

		/**
		 * The player's current score (amount of right answers)
		 * @type {number}
		 */
		this.score = data.score;

		/**
		 * The player's current status in this contest
		 * @type {ContestStatus}
		 */
		this.status = data.status;

	}

}

module.exports = Player;