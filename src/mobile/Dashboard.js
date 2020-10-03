/** @module mobile/Dashboard */

const Base = require("../Base");

/**
 * Represents the user's dashboard
 */
class Dashboard extends Base {

	constructor(client, data) {
		super(...arguments);

		const Streak = require("./Streak");

		/**
		 * The user's position in latitude
		 * @type {number}
		 */
		this.latitude = data.latitude;

		/**
		 * The user's position in longitude
		 * @type {number}
		 */
		this.longitude = data.longitude;

		/**
		 * The amount of nearby learners
		 * @type {number}
		 */
		this.nearbyLearners = data.nearbyLearners;

		/**
		 * The user's position on the leaderboard (0 if not applicable)
		 * @type {number}
		 */
		this.position = data.position;

		/**
		 * The user's streak info
		 * @type {Streak}
		 */
		this.streak = new Streak(client, data.streak);

		/**
		 * How many visits the user has had last week
		 * @type {number}
		 */
		this.visits = data.visits;

	}

}

module.exports = Dashboard;