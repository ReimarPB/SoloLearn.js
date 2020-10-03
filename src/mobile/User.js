/** @module mobile/User */

const Base = require("../Base");
const error = require("../error");
const SearchFilter = require("../enum/SearchFilter");

/**
 * Represents any user on SoloLearn
 */
module.exports = class User extends Base {

	constructor(client, data) {

		super(...arguments);

		/**
		 * Unknown value
		 * @type {number}
		 */
		this.accessLevel = data.accessLevel;

		/**
		 * The link to the user's profile picture if they have any
		 * @type {?string}
		 * @see hasAvatar
		 */
		this.avatarUrl = data.avatarUrl;

		/**
		 * The name of the user's badge if they have any
		 * @type {?string}
		 */
		this.badge = data.badge;

		/**
		 * The user's email if you have permission to view it
		 * @type {?string} 
		 */
		this.email = data.email;

		/**
		 * Whether or not the user has set a custom profile picture
		 * @type {boolean}
		 * @see avatarUrl
		 */
		this.hasAvatar = data.hasAvatar;

		/**
		 * The user's ID
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * Whether or not the user has SoloLearn Pro
		 * @type {boolean}
		 * @see proExpireDate
		 */
		this.isPro = data.isPro;

		/**
		 * The user's XP level
		 * @type {number}
		 * @see xp
		 */
		this.level = data.level;

		/**
		 * The username
		 * @type {string}
		 */
		this.name = data.name;

		/**
		 * When SoloLearn Pro expires for this user if applicable (Unknown type)
		 * @type {?*}
		 */
		this.proExpireDate = data.proExpireDate;

		/**
		 * When the user registered their account (Unknown type, sometimes null?)
		 * @type {?*}
		 */
		this.registerDateTime = data.registerDateTime

		/**
		 * The amount of XP this user has
		 * @type {number}
		 */
		this.xp = data.xp;

	}

	/**
	 * Get the user's feed
	 * @param {number} count - The maximum amount of posts to get (includes things like achievements and completed challenges)
	 * @param {(Post|number)} [from] - The latest post to return
	 * @param {(Post|number)} [to] - The earliest post to return
	 * @returns {Promise<Post[]>}
	 * @see {@link getPosts} Get only posts created by this user
	 */
	async getFeed(count, from = null, to = null) {

		const Post = require("./FeedItem");

		const body = {
			profileId: this.id,
			count
		};
		if (from) body.fromId = from.id || from;
		if (to) body.toId = to.id || to;

		const response = await this.client.requestV1("/Profile/GetFeed", body).catch(error);
		const arr = [];
		response.feed.forEach(post => arr.push(new Post(this.client, post)));
		return arr;

	}

	/**
	 * Search for public codes
	 * @param {number} count - The maximum amount of codes to get
	 * @param {SearchFilter} [filter=SearchFilter.MOST_RECENT] - The sorting filter to use
	 * @param {number} [index=0] - The index of where to start
	 * @param {string} [searchQuery] A search query
	 * @param {Language|""} [language] Which language to filter results by
	 * @returns {Promise<CodeItem[]>} The search results
	 */
	async getCodes(count, filter = SearchFilter.MOST_RECENT, index = 0, searchQuery = "", language = "") {

		const CodeItem = require("./CodeItem").default;

		const response = await this.client.requestV1(`/Playground/GetPublicCodes`, { count, index, language, profileId: this.id, query: searchQuery, orderBy: filter }).catch(error);
		const arr = [];
		response.forEach(code => arr.push(new CodeItem(this.client, code)));
		return arr;

	}

	/**
	 * Get the lessons that were created by this user
	 * @param {number} count The maximum amount of lessons to get
	 * @param {number} index The offset
	 * @returns {Promise<Lesson[]>}
	 */
	async getLessons(count, index = 0) {

		const Lesson = require("./Lesson");

		const response = await this.client.requestV1("/Profile/GetLessonsByAuthor", {count, index, userId: this.id }).catch(error);
		const arr = [];
		response.feed.forEach(lesson => arr.push(new Lesson(this.client, lesson)));
		return arr;

	}

	/**
	 * Get the user's user-created posts
	 * @param {number} count - The maximum amount of posts to get
	 * @returns {Promise<Post[]>}
	 * @see {@link getFeed} Get all posts including achievements and challenges completed etc.
	 */
	async getPosts(count) {
			
		const Post = require("./FeedItem");

		const response = await this.client.requestV1("/Profile/GetFeedPosts", {count, profileId: this.id }).catch(error);
		const arr = [];
		response.feed.forEach(post => {
			arr.push(new Post(this.client, post));
		});

		return arr;

	}

	/**
	 * Get additional information about this user
	 * @returns {Promise<UserInfo>}
	 */
	async getUserInfo() {

		const UserInfo = require("./UserInfo").default;

		const response = await this.client.requestV2("GET", `/v2/userinfo/?userId=${this.id}`).catch(error);
		return new UserInfo(this.client, response);

	}

	/**
	 * Get the amount of answers, codes etc. this user has
	 * @returns {Promise<ItemCounts>}
	 */
	async getItemCounts() {

		const ItemCounts = require("./ItemCounts");

		const response = await this.client.requestV1("/Profile/GetProfileItemCounts", { profileId: this.id }).catch(error);
		return new ItemCounts(this.client, response.counts);


	}

}