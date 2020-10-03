/** @module mobile/Achievement */

const Base = require("../Base");

/**
 * Represents an achievement/badge
 */
module.exports = class Achievement extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The achievement color in the form of a hex code, used as a replacement of the grey color in the icon when unlocked
		 * @type {string}
		 */
		this.color = data.color;

		/**
		 * The achievement description
		 * @type {string}
		 */
		this.description = data.description;

		/**
		 * The URL to the achievement icon in grey (300 x 300)
		 * @type {string}
		 */
		this.icon = data.icon;

		/**
		 * The achievement ID
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not the user has unlocked the achievement
		 * @type {boolean}
		 */
		this.isUnlocked = data.isUnlocked;

		/**
		 * Unknown value
		 * @type {number}
		 */
		this.points = data.points;

		/**
		 * The title of the achievement
		 * @type {string}
		 */
		this.title = data.title;

		/**
		 * The achievement type
		 */
		this.type = data.type;


		this.unlockDate = data.unlockDate;

	}

}