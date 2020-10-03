const Base = require("../Base");
const error = require("../error");

/**
 * Represents a code as shown in a feed
 */ 
class CodeItem extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The link to the author's avatar if they have one
		 * @type {?string}
		 */
		this.avatarUrl = data.avatarUrl;

		/**
		 * The name of the author's badge if they have one
		 * @type {?string}
		 */
		this.badge = data.badge;

		/**
		 * The amount of comments this code has
		 * @type {number}
		 */
		this.comments = comments

		/**
		 * The date this code was created
		 * @type {string}
		 */
		this.createdDate = data.createdDate;

		/**
		 * The ID of this code
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not this code is public
		 * @type {boolean}
		 */
		this.isPublic = data.isPublic;

		/**
		 * The programming language this code was written in
		 * @type {string}
		 */
		this.language = data.language;

		/**
		 * The last time this code was modified
		 * @type {string}
		 */
		this.modifiedDate = data.modifiedDate;

		/**
		 * The name of this code
		 * @type {string}
		 */
		this.name = data.name;

		/**
		 * The public ID of this code
		 * @type {string}
		 */
		this.publicId = data.publicId;

		/**
		 * The author's user ID
		 * @type {number}
		 */
		this.userId = data.userId;

		/**
		 * The author's username
		 * @type {string}
		 */
		this.userName = data.userName;

		/**
		 * The amount of views this code has
		 * @type {number}
		 */
		this.viewCount = data.viewCount;

		/**
		 * The vote count of this code (upvotes - downvotes)
		 * @type {number}
		 */
		this.votes = data.votes;

	}

	/**
	 * Get the full code with all information
	 * @returns {Code}
	 */
	async getCode() {

		const Code = require("./Code");

		const response = await this.client.requestV1("/Playground/GetCode", { publicId: this.publicId }).catch(error);
		resolve(new Code(this.client, response.code));

	}

}

module.exports = CodeItem;