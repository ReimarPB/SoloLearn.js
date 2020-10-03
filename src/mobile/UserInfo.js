/** @module mobile/UserInfo */

const User = require("./User");

/**
 * Returned by getUserInfo(), contains some other information than User
 * @class
 * @public
 */
module.exports = class UserInfo extends User {

	constructor(client, data) {

		super(...arguments);

		const ConnectedAccount = require("./ConnectedAccount");
		
		/**
		 * The link to the user's profile picture if they have any
		 * @type {?string}
		 */
		this.avatarUrl = data.avatarUrl;
		
		/**
		 * The user's profile summary if set
		 * @type {?string}
		 */
		this.bio = data.bio;

		/**
		 * The user's city if set
		 * @type {?string}
		 */
		this.city = data.city;

		/**
		 * The third-party accounts this user has connected their profile to (StackOverflow, GitHub etc.)
		 * @type {ConnectedAccount[]}
		 */
		this.connectedAccounts = data.connectedAccounts.map(account => new ConnectedAccount(account));

		/**
		 * The user's country code if set (e.g. "us")
		 * @type {?string}
		 */
		this.country = data.country;

		/**
		 * The user's first name if set
		 * @type {?string}
		 */
		this.firstName = data.firstName;

		/**
		 * The user's last name if set
		 * @type {?string}
		 */
		this.lastName = data.lastName;

		/**
		 * The user's username
		 * @type {string}
		 */
		this.nickname = data.nickname;

		/**
		 * The user's state if set
		 * @type {?string}
		 */
		this.state = data.state;

		/**
		 * The user's ID
		 * @type {number}
		 */
		this.userId = data.userId;

	}

}