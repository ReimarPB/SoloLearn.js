/** @module mobile/Code */

const Base = require("../Base");
const error = require("../error");

/**
 * Represents a SoloLearn code
 */
module.exports = class Code extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * Unknown value
		 * @type {*}
		 */
		this.accessLevel = data.accessLevel;

		/**
		 * The link to the author's profile picture if they have one
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
		this.comments = data.comments;

		/**
		 * The date this code was created
		 * @type {string}
		 */
		this.createdDate = data.createdDate;

		/**
		 * The CSS code if this is a web code, empty if not a web code
		 * @type {string}
		 */
		this.cssCode = data.cssCode;

		/**
		 * Unknown value
		 * @type {?string}
		 */
		this.description = data.description;

		/**
		 * Whether or not the code's author has a profile picture
		 * @type {boolean}
		 */
		this.hasAvatar = data.hasAvatar;

		/**
		 * This code's ID
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not this code is public
		 * @type {boolean}
		 */
		this.isPublic = data.isPublic;

		/**
		 * Unknown value
		 * @type {boolean}
		 */
		this.isPublicBlocked = data.isPublicBlocked;

		/**
		 * Unknown value
		 * @type {boolean}
		 */
		this.isVisible = data.isVisible;

		/**
		 * The JS code if this is a web code, empty if not a web code
		 * @type {string}
		 */
		this.jsCode = data.jsCode;

		/**
		 * The programming language this code was written in
		 * @type {string}
		 */
		this.language = data.language;

		/**
		 * The level of the author
		 * @type {number}
		 */
		this.level = data.level;

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
		this.publicID = data.publicID;

		/**
		 * The source code or HTML if this is a web code
		 * @type {string}
		 */
		this.sourceCode = data.sourceCode;

		/**
		 * Unknown value - Always "Native"?
		 * @type {string}
		 */
		this.type = data.type;

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
		 * The logged in user's vote on this code
		 * @type {number}
		 */
		this.vote = data.vote;

		/**
		 * The vote count of this code (upvotes - downvotes)
		 * @type {number}
		 */
		this.votes = data.votes;

		/**
		 * The amount of XP the code's author has
		 * @type {number}
		 */
		this.xp = data.xp;

	}

	/*getUser() {
		
	}*/

	/**
	 * Run the code with the specified input and get the output
	 * @param input {?string} - All inputs, separated by newlines
	 * @returns {Promise<CodeResult>} - The result
	 */
	async run(input = null) {

		const CodeResult = require("./CodeResult");

		const body = {
			language: this.language,
			code: this.sourceCode
		};

		if (input) body.input = input;

		const response = await this.client.requestV1("/Playground/CompileCode", body).catch(error);
		return new CodeResult(this.client, response);

	}

}