const Base = require("../Base");

/**
 * Represents the streak notification that shows up when you open SoloLearn
 */
class StreakStatus extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The notification message ("You are on a {X} day streak! Come back tomorrow for more.")
		 * @type {string}
		 */
		this.message = data.message;

		/**
		 * Your current streak
		 * @type {number}
		 */
		this.streak = data.streak;

		/**
		 * Unknown value - always 7?
		 * @type {number}
		 */
		this.maxStreak = data.maxStreak;

		/**
		 * The notification title ("Daily Bonus! +{X}XP")
		 * @type {string}
		 */
		this.title = data.title;

		/**
		 * The amount of XP you got (usually 5)
		 * @type {number}
		 */
		this.xp = data.xp;

	}

}

module.exports = StreakStatus;