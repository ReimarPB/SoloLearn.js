/** @module mobile/Answer */

const Base = require("../Base");

/**
 * Represents an answer to a challenge
 * @see Challenge
 */
module.exports = class Answer extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * Unknown value - always 0?
		 * @type {number}
		 */
		this.answerLength = data.answerLength;

		/**
		 * The ID of the answer
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not this is the correct answer
		 * @type {boolean}
		 */
		this.isCorrect = data.isCorrect;

		/**
		 * Answer properties
		 * @type {object}
		 */
		this.properties = data.properties;

		/**
		 * The answer text
		 * @type {string}
		 */
		this.text = data.text;

	}

}