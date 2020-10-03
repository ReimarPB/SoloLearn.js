/** @module mobile/Challenge */

const Base = require("../Base");

/**
 * Represents a challenge between two people with five questions
 */
module.exports = class Contest extends Base {

	constructor(client, data) {
		super(...arguments);

		const Challenge = require("./Challenge");
		const Player = require("./Player");

		/**
		 * The questions in the challenge
		 * @type {Challenge[]}
		 */
		this.challenges = data.challenges.map(challenge => new Challenge(client, challenge, data.id));

		/**
		 * The ID of the course with the programming language being used
		 * @type {number}
		 */
		this.courseID = data.courseID;

		/**
		 * The date the contest started
		 * @type {string}
		 */
		this.date = data.date;

		/**
		 * The date the contest expires
		 * @type {string}
		 */
		this.expireDate = data.expireDate;

		/**
		 * The ID of the contest
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Unknown value - always false?
		 * @type {boolean}
		 */
		this.isUpdated = data.isUpdated;

		/**
		 * Unknown value - always "0001-01-01T00:00:00"?
		 * @type {string}
		 */
		this.lastUpdate = data.lastUpdate;

		/**
		 * Your opponent
		 * @type {Player}
		 */
		this.opponent = new Player(client, data.opponent);

		/**
		 * Yourself
		 * @type {Player}
		 */
		this.player = new Player(client, data.player);

		/**
		 * Unknown value - always 0?
		 * @type {number}
		 */
		this.status = data.status;

		/**
		 * Your own user ID
		 * @type {number}
		 */
		this.userID = data.userID;

	}

}