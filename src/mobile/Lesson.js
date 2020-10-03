/** @module mobile/Lesson */

const Base = require("../Base");

/**
 * Represents a SoloLearn lesson
 */
class Lesson extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * Unknown value - always 0?
		 * {number}
		 */
		this.accessLevel = data.accessLevel;

		/**
		 * Unknown value - always null?
		 * {?*}
		 */
		this.ancestorID = data.ancestorID;

		/**
		 * Unknown value - always null?
		 * {?string}
		 */
		this.avatarURL = data.avatarURL;

		/**
		 * The author's badge
		 * @type {Badge}
		 */
		this.badge = data.badge;

		/**
		 * Unknown value - always #fefefe?
		 * @type {string}
		 */
		this.color = data.color;

		/**
		 * The amount of comments this lesson has
		 * @type {number}
		 */
		this.comments = data.comments;

		/**
		 * Unknown value - always null?
		 * @type {string}
		 */
		this.content = data.content;

		/**
		 * The date this lesson was created
		 * @type {string}
		 */
		this.date = data.date;

		/**
		 * Whether or not the author has an avatar
		 * @type {boolean}
		 */
		this.hasAvatar = data.hasAvatar;

		/**
		 * The URL of the lesson's icon
		 * @type {string}
		 */
		this.iconUrl = data.iconUrl;

		/**
		 * The ID of the lesson
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Unknown value - always null?
		 * @type {?*}
		 */
		this.implementations = data.implementations;

		/**
		 * Whether or not the user has bookmarked this lesson
		 * @type {boolean}
		 */
		this.isBookmarked = data.isBookmarked;

		/**
		 * Unknown value - always 2?
		 * @type {number}
		 */
		this.itemType = data.itemType;

		/**
		 * Unknown value
		 * @type {?*}
		 */
		this.language = data.language;

		/**
		 * Unknown value
		 * @type {number}
		 */
		this.level = data.level;

		/**
		 * The name of the lesson
		 * @type {string}
		 */
		this.name = data.name;

		/**
		 * Unknown value - always null?
		 * @type {?*}
		 */
		this.nextLesson = data.nextLesson;

		/**
		 * Unknown value - always 0?
		 * @type {number}
		 */
		this.relevancyType = data.relevancyType;

		/**
		 * Unknown value - always null?
		 * @type {?*}
		 */
		this.relevantLessons = data.relevantLessons;

		/**
		 * Unknown value - always 0?
		 * @type {number}
		 */
		this.status = data.status;

		/**
		 * Unknown value - always 0?
		 * @type {number}
		 */
		this.type = data.type;

		/**
		 * Unknown value - always null?
		 * @type {?*}
		 */
		this.url = data.url;

		/**
		 * The ID of the author
		 * @type {number}
		 */
		this.userID = data.userID;

		/**
		 * The author's username
		 * @type {string}
		 */
		this.userName = data.userName;

		/**
		 * The amount of views this lesson has
		 * @type {number}
		 */
		this.viewCount = data.viewCount;

		/**
		 * Unknown value - always 0?
		 * @type {number}
		 */
		this.xp = data.xp;

	}

}

module.exports = Lesson;