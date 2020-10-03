/** @module mobile/Course */

const Base = require("../Base");

/**
 * Represents a SoloLearn course
 */
module.exports = class Course extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * An alias to languageName without special characters (except -) and spaces replaced with -
		 * @type {string}
		 */
		this.alias = data.alias;

		/**
		 * The course ID
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Unknown value - always false?
		 * @type {boolean}
		 */
		this.isEnabled = data.isEnabled;

		/**
		 * Unknown value
		 * @type {boolean}
		 */
		this.isFactoryEnabled = data.isFactoryEnabled;

		/**
		 * Whether or not you can use this language in the lesson factory
		 * @type {boolean}
		 */
		this.isLessonFactoryEnabled = data.isLessonFactoryEnabled;

		/**
		 * Whether or not you can play codes in this language
		 * @type {boolean}
		 */
		this.isPlayEnabled = data.isPlayEnabled;

		/**
		 * Whether or not you can use this language in the code playground
		 * @type {boolean}
		 */
		this.isPlaygroundEnabled = data.isPlaygroundEnabled;

		/**
		 * Unknown value - always false?
		 * @type {boolean}
		 */
		this.isPro = data.isPro;

		/**
		 * Whether or not you can use this in the quiz factory
		 * @type {boolean}
		 */
		this.isQuizFactoryEnabled = data.isQuizFactoryEnabled;

		/**
		 * The SoloLearn language this course is written in or null if N/A (e.g. C: Language.C, jQuery: Language.JAVASCRIPT, Data Science: null)
		 * @type {?Language}
		 */
		this.language = data.language;

		/**
		 * Full name of the programming language in this course
		 * @type {string}
		 */
		this.languageName = data.languageName;

		/**
		 * The amount of people who are currently taking this course
		 * @type {number}
		 */
		this.learners = data.learners;

		/**
		 * How many lessons this course has
		 * @type {number}
		 */
		this.lessonsCount = data.lessonsCount;

		/**
		 * The name of the course
		 * @type {string}
		 */
		this.name = data.name;

		/**
		 * The amount of people who are using this language as their challenge weapon (?)
		 * @type {number}
		 */
		this.players = data.players;

		/**
		 * The amount of quizzes there are in this language
		 * @type {number}
		 */
		this.quizzesCount = data.quizzesCount;

		/**
		 * The course version
		 * @type {number}
		 */
		this.version = data.version;

	}

}
