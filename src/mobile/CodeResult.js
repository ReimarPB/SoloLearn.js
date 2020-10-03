const Base = require("../Base");

/**
 * Represents the result that is returned after running a code
 */
class CodeResult extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The date the code was executed
		 * @type {string}
		 */
		this.date = data.date;

		/**
		 * The error code. Seems to only be 0 when no error and 2 when there is an error
		 * @type {number}
		 */
		this.errorCode = data.errorCode;

		/**
		 * The ID of this result. (Not the ID of the code itself)
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * The input that was used when running the code
		 * @type {?string}
		 */
		this.input = data.input;

		/**
		 * The programming language this code was written in
		 * @type {Language}
		 */
		this.language = data.language;

		/**
		 * The output of this code, null if this is a web code
		 * @type {?string}
		 */
		this.output = data.output;

		/**
		 * The source code that was used
		 * @type {string}
		 */
		this.sourceCode = data.sourceCode;

		/**
		 * The status code. Seems to always be 2 (?)
		 * @type {number}
		 */
		this.status = data.status;

		/**
		 * The user ID of the user who ran the code
		 * @type {number}
		 */
		this.userID = data.userID;

	}

}

module.exports = CodeResult;