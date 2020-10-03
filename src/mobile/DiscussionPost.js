const Base = require("../Base");

/**
 * Represents a Q&A discussions post
 */
class DiscussionPost extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The amount of replies this question has
		 * @type {number}
		 */
		this.answers = data.answers;

		/**
		 * The date this post was created
		 * @type {string}
		 */
		this.date = data.date;

		/**
		 * The post ID
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not this question is marked as solved
		 * @type {boolean}
		 */
		this.isAccepted = data.isAccepted;

		/**
		 * The post text
		 * @type {string}
		 */
		this.message = data.message;

		/**
		 * The date this post was last modified
		 * @type {?string}
		 */
		this.modifyDate = data.modifyDate;

		/**
		 * The ID of the user who last modified the post (could be a mod)
		 * @type {?number}
		 */
		this.modifyUserID = data.modifyUserID;

		/**
		 * Unknown value - always 0?
		 * @type {number}
		 */
		this.ordering = data.ordering;

	}

}

module.exports = DiscussionPost;