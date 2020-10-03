/** @module mobile/ConnectedAccount */

const Base = require("../Base");

/**
 * Represents a third-party account a user has connected to (e.g. StackOverflow)
 */
module.exports = class ConnectedAccount extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * Unique ID of this connected account (not the same as the user ID or the third-party account ID)
		 * @type {number}
		 */
		this.connectionId = data.connectionId;

		/**
		 * Whether or not this is visible
		 * @type {boolean}
		 */
		this.isVisible = data.isVisible;

		/**
		 * The username of the third-party account
		 * @type {string}
		 */
		this.name = data.name;

		/**
		 * The link to the user's account
		 * @type {string}
		 */
		this.profileUrl = data.profileUrl;

		/**
		 * The third-party service connected to
		 * @type {AccountService}
		 */
		this.service = data.service;

		/**
		 * The last time the user synchronized their account
		 * @type {string}
		 */
		this.syncDate = data.syncDate;


	}

}