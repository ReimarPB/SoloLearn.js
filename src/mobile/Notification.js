/** @module mobile/Notification */

const Base = require("../Base");
const error = require("../error");

module.exports = class Notification extends Base {

	constructor(client, data) {
		super(...arguments);

		const Achievement = require("./Achievement");
		const Post = require("./Post");
		const User = require("./User");

		/**
		 * The achievement that was unlocked (if type == 2)
		 * @type {?Achievement}
		 */
		this.achievement = data.achievement ? new Achievement(data.achievement) : null;

		/**
		 * The user in question if applicable
		 * @type {?User}
		 */
		this.actionUser = data.actionUser ? new User(data.actionUser) : null;

		/**
		 * The date the user got the notification
		 * @type {string}
		 */
		this.date = data.date;

		/**
		 * Unknown value (always formatted like: /^\d+-\d+-\d+$/)
		 * @type {string}
		 */
		this.groupID = data.groupID;

		/**
		 * The notification ID
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not the user has clicked the notification
		 * @type {boolean}
		 */
		this.isClicked = data.isClicked;

		/**
		 * Whether or not the user has seen the notification before
		 * @type {boolean}
		 */
		this.isSeen = data.isSeen;

		/**
		 * A more detailed notification message - Sometimes empty string - Not normally visible?
		 * @type {string}
		 */
		this.message = data.message;

		/**
		 * The post in question - if no post, this is a template post with ID: 0
		 * @type {Post}
		 */
		this.post = new Post(data.post);

		/**
		 * The notification title (e.g. "You have reached level 2")
		 * @type {string}
		 */
		this.title = data.title;

		/**
		 * The notification type
		 * @type {PostType}
		 */
		this.type = data.type;

		/**
		 * The user that got the notification
		 * @type {User}
		 */
		this.user = data.user;

	}

	async markAsClicked() {
		await this.client.requestV1("/Profile/MarkNotificationsClicked", [ this.id ]).catch(error);
	}

}