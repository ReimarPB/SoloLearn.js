/** @module mobile/Problem */

const Base = require("../Base");

/**
 * A code coach problem
 */
class Problem extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * If obtained from a list of items, null; if viewed in detail, the user object containing only: avatarUrl, badge, id, name
		 * @type {?User}
		 */
		this.author = data.author;

		/**
		 * The problem's theme color, sometimes null
		 * @type {?string}
		 */
		this.color = data.color;

		/**
		 * The full description with markdown
		 * @type {string}
		 */
		this.description = data.description;

		/**
		 * The problem difficulty
		 * @type {Difficulty}
		 */
		this.difficulty = data.difficulty;

		/**
		 * The URL to the problem's icon
		 * @type {string}
		 */
		this.iconUrl = data.iconUrl;

		/**
		 * The problem's unique ID
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not the problem requires SoloLearn Pro
		 * @type {boolean}
		 */
		this.isPro = data.isPro;

		/**
		 * An array of languages the problem can be solved in
		 * @type {Language[]}
		 */
		this.languages = data.languages;

		/**
		 * How much XP you get for solving the problem
		 * @type {number}
		 */
		this.rewardXp = data.rewardXp;

		/**
		 * The languages you have solved this problem with
		 * @type {Language[]}
		 */
		this.solvedLanguages = data.solvedLanguages;

		/**
		 * The title of the problem
		 * @type {string}
		 */
		this.title = data.title;

	}

	/**
	 * Get the problem with the full details
	 * @param [showContent=false] - Unknown value
	 * @param [location=0] - Unknown value
	 * @return {Promise<Problem>}
	 */
	async viewDetails(showContent = false, location = 0) {

		const response = await this.client.requestV2("GET", `/judge/judge/problem/${this.id}?showContent=${showContent}&location=${location}`);
		return new Problem(this.client, response);

	}

	// TODO add solving

}

module.exports = Problem;