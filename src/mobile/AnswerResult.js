/** @module mobile/AnswerResult */

const Base = require("../Base");

/**
 * Represents the result to an answer to a challenge
 * @see Answer
 */
module.exports = class AnswerResult extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The ID of the challenge that was answered
		 * @type {number}
		 */
		this.challengeID = data.challengeID;

		/**
		 * How much XP the user earned from answering
		 * @type {number}
		 */
		this.earnedXp = data.earnedXp;

		/**
		 * Always 0
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not the user answered correctly
		 * @type {boolean}
		 */
		this.isCompleted = data.isCompleted;

	}

}