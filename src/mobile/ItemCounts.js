/** @module mobile/ItemCounts */

const Base = require("../Base");

/**
 * Tells how many codes, answers etc. a user has
 */
module.exports = class ItemCounts extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * How many answers the user has written
		 * @type {number}
		 */
		this.answers = data.answers;

		/**
		 * How many codes the user has published
		 * @type {number}
		 */
		this.codes = data.codes;

		/**
		 * How many comments the user has written
		 * @type {number}
		 */
		this.comments = data.comments;

		/**
		 * How many courses the user has started
		 * @type {number}
		 */
		this.courses = data.courses;

		/**
		 * How many lessons the user has published
		 * @type {number}
		 */
		this.lessons = data.lessons;

		/**
		 * How many posts the user has written
		 * @type {number}
		 */
		this.posts = data.posts;

		/**
		 * How many questions the user has asked
		 * @type {number}
		 */
		this.questions = data.questions;

		/**
		 * How many solutions the user has created for Code Coach
		 * @type {number}
		 */
		this.solutions = data.solutions;

	}

}