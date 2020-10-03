/** @module mobile/Challenge */

const Base = require("../Base");

/**
 * Represents a challenge / a question in a contest
 */
module.exports = class Challenge extends Base {

	#contestId;

	constructor(client, data, contestId) {
		super(...arguments);

		const Answer = require("./Answer");

		/**
		 * The possible answers for this challenge
		 * @type {Answer[]}
		 */
		this.answers = data.answers.map(answer => new Answer(client, answer));

		/**
		 * The ID of the course currently being used
		 * @type {number}
		 */
		this.courseID = data.courseID;

		/**
		 * The date the question was created
		 * @type {string}
		 */
		this.date = data.date;

		/**
		 * The ID of the challenge
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Unknown value - question author's level?
		 * @type {number}
		 */
		this.level = data.level;

		/**
		 * Unknown value
		 * @type {?*}
		 */
		this.levelDetails = data.levelDetails;

		/**
		 * Unknown value
		 * @type {string}
		 */
		this.name = data.name;

		/**
		 * Whether the challenge is published or not
		 * @type {boolean}
		 */
		this.published = data.published;

		/**
		 * The challenge's question
		 * @type {string}
		 */
		this.question = data.question;

		/**
		 * The challenge's approval status
		 * @type {ChallengeStatus}
		 */
		this.status = data.status;

		/**
		 * The ID of the contest the answer belongs to
		 * @type {number}
		 * @private
		 */
		this.#contestId = contestId;

	}

	/**
	 * Submit an answer to this challenge
	 * @param {boolean} isCorrect - Whether the answer was correct or not
	 * @returns Promise<AnswerResult>
	 */
	async answer(isCorrect) {

		const AnswerResult = require("./AnswerResult");

		const response = await this.client.requestV1("/Challenge/PushContestResult", { challengeId: this.id, contestId: this.#contestId, isCompleted: isCorrect });
		return new AnswerResult(this.client, response);

	}

}