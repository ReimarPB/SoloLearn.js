/** @module mobile/Post */

const Base = require("../Base");

/**
 * Represents an item that can be shown in the feed
 */
module.exports = class FeedItem extends Base {

	constructor(client, data) {

		const User     = require("./User");
		const UserPost = require("./Post");

		if (data.user)     data.user     = new User(client, data.user);
		if (data.userPost) data.userPost = new UserPost(client, data.userPost);

		super(...arguments);

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
		 * The level of the post author
		 * @type {number}
		 */
		this.level = data.level;

		/**
		 * Unknown value - always empty string?
		 * @type {string}
		 */
		this.message = data.message;

		/**
		 * Unknown value - always null?
		 * @type {?*}
		 */
		this.packageName = data.packageName;

		/**
		 * Unknown value - always null?
		 * @type {?*}
		 */
		this.referenceID = data.referenceID;

		/**
		 * Text shown next to username (e.g. "reached Level 21")
		 * @type {string}
		 */
		this.title = data.title;

		/**
		 * The post type
		 * @type {PostType}
		 */
		this.type = data.type

		/**
		 * The author of the post or the user in question
		 * @type {User}
		 */
		this.user = data.user;

		/**
		 * The ID of the post author / user in question
		 * @type {number}
		 */
		this.userID = data.userID;

		/**
		 * Unknown value
		 * @type {?*}
		 */
		this.userLesson = data.userLesson;

		/**
		 * The post the user wrote if applicable (type == PostType.USER_POST)
		 * @type {?UserPost}
		 */
		this.userPost = data.userPost || null;

	}


}