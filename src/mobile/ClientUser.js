/** @module mobile/ClientUser */

const User = require("./User");
const PostBackground = require("./PostBackground");
const CodeResult = require("./CodeResult");
const error = require("../error");

/**
 * Represents the user that is currently logged in
 * @extends User
 */
class ClientUser extends User {

	constructor(client, data) {
		super(...arguments);
	}

	/**
	 * Create a profile post
	 * @param {string} text - The post text
	 * @param {(PostBackground|number)} [background] - The post background that will be used
	 * @returns {Promise<FeedItem>} The post that was just created
	 */
	async createPost(text, background = null) {

		const FeedItem = require("./FeedItem");

		const body = { message: decodeURIComponent(text) };
		if (background) body.backgroundId = background.id || background;

		const response = await this.client.requestV1("/Profile/CreatePost", body).catch(error);
		return new FeedItem(this.client, response);

	}

	/**
	 * Create a post in the Q&A discussions section
	 * @param {string} title - The post title
	 * @param {string} text - The post text
	 * @param {string[]} [tags=[]] - The post tags
	 * @returns {Promise<DiscussionPost>} The post that was just created
	 */
	async createDiscussionPost(title, text, tags= []) {

		const DiscussionPost = require("./DiscussionPost");

		const response = await this.client.requestV1("/Discussion/CreatePost", { message: text, tags, title }).catch(error);
		return new DiscussionPost(this.client, response.post);

	}

	/**
	 * Search for tags in Q&A discussions
	 * @param query - The search query
	 * @return {Promise<string[]>} List of tags that match the search query
	 */
	async searchDiscussionTags(query) {

		const response = await this.client.requestV1("/Discussion/GetTags", { query }).catch(error);
		return response.tags;

	}

	/**
	 * Search for public codes
	 * @param {number} count - The maximum amount of codes to get
	 * @param {SearchFilter} filter - The sorting filter to use
	 * @param {number} [index=0] - The index of where to start
	 * @param {string} [searchQuery] - A search query
	 * @param {Language|""} [language] - Which language to filter results by
	 * @returns {Promise<CodeItem[]>} The search results
	 */
	async searchCodes(count, filter, index = 0, searchQuery = "", language = "") {

		const CodeItem = require("./CodeItem");

		const response = await this.client.requestV2("GET", `/v2/trends/projects/search?query=${searchQuery}&filter=${filter}&language=${language}&index=${index}&count=${count}&profileId=${this.client.user.id}`).catch(error);
		return response.map(code => new CodeItem(this.client, code));

	}

	/**
	 * Start a contest with another player and get 5 challenges
	 * @param {Course|number} course - The Course object or the course ID
	 * @returns Promise<Contest>
	 */
	async startContest(course) {

		const Contest = require("./Contest");

		const response = await this.client.requestV1("/Challenge/CreateContest", { courseId: course.id || course }).catch(error);
		return new Contest(this.client, response.contest);

	}

	/**
	 * Search for players who are accepting challenges in a particular language
	 * @param {number} count - The maximum amount of players to get
	 * @param {Course|number} course - The course the programming language you are searching for belongs to
	 * @param {number} [index=0] - Amount of users to skip
	 * @param {string} [query=""] - A search query
	 * @param {string} [name=""] - Unknown
	 * @returns Promise<User[]>
	 */
	async findContestPlayers(count, course, index = 0, query = "", name = "")  {

		const User = require("./User");

		const response = await this.client.requestV1("/Challenge/FindPlayers", { name, count, index, query, courseId: course.id || course, id: this.id }).catch(error);
		return response.users.map(user => new User(this.client, user));

	}

	/**
	 * Get code coach problems
	 * @param [count=20] - Maximum amount of problems to get
	 * @param [index=0] - How many problems to skip
	 * @param [language="all"] - The language to filter the problems by (or "all" for all languages)
	 * @param [difficulty="all"] - The difficulty to filter the problems by (or "all" for all difficulties)
	 * @param [status="all"] - The status to filter the problems by (or "all" for all statuses)
	 * @param [query=""] - A search query
	 * @return {Promise<Problem[]>}
	 */
	async getCodeCoachProblems(count = 20,  index = 0, language = "all", difficulty = "all", status = "all", query = "") {

		const Problem = require("./Problem");

		const response = await this.client.requestV2("GET", `/judge/judge/problems?language=${language}&difficulty=${difficulty}&status=${status}&query=${query}&index=${index}&count=${count}`);
		return response.problems.map(problem => new Problem(this.client, problem));

	}

	/**
	 * Get all SoloLearn courses and level info (the same API endpoint is used for both things)
	 * @returns {Promise<{courses: Course[], levels: Level[]}>}
	 */
	async getCoursesAndLevels() {

		const Course = require("./Course");
		const Level = require("./Level");

		const response = await this.client.requestV1("/GetCourses", {}).catch(error);
		return {
			courses: response.courses.map(course => new Course(this.client, course)),
			levels: response.levels.map(level => new Level(this.client, level))
		};

	}

	/**
	 * Get your user dashboard containing information like your position and streak status
	 * @returns {Promise<Dashboard>}
	 */
	async getDashboard() {

		const Dashboard = require("./Dashboard");

		const response = await this.client.requestV1("/Profile/GetDashboard", {}).catch(error);
		return new Dashboard(this.client, response);
			
	}

	/**
	 * Get the posts your home feed
	 * @param {number} count - The maximum amount of posts to get
	 * @param {(Post|number)} [from] - The latest post to return
	 * @param {(Post|number)} [to] - The earliest post to return
	 * @returns {Promise<Post[]>}
	 */
	async getHomeFeed(count, from = null, to = null) {

		const Post = require("./FeedItem");

		const body = { count };
		if (from) body.fromId = from.id || from;
		if (to) body.toId = to.id || to;

		const response = await this.client.requestV1("/Profile/GetFeed", body).catch(error);
		return response.feed.map(post => new Post(this.client, post));
		
	}

	/**
	 * Get the backgrounds that can be used to create a post
	 * @returns {Promise<PostBackground[]>}
	 */
	async getPostBackgrounds() {
		
		const PostBackground = require("./PostBackground");

		const response = await this.client.requestV1("/Profile/GetPostBackgrounds", {}).catch(error);
		return response.feed.map(background => new PostBackground(this.client, background));
		
	}

	/**
	 * Get the streak notification
	 * @returns {Promise<StreakStatus>}
	 */
	async getStreakStatus() {

		const StreakStatus = require("./StreakStatus");

		const response = await this.client.requestV1("/GetStreakStatus", {}).catch(error);
		return new StreakStatus(this.client, response.status);

	}

	/**
	 * Get the amount of unseen notifications you have
	 * @returns {Promise<number>}
	 */
	async getUnseenNotificationCount() {

		const response = await this.client.requestV1("/Profile/GetUnseenNotificationCount", {}).catch(error);
		return response.count;

	}

	/**
	 * Compile and run a piece of code and return the result
	 * @param {string} language - The programming language
	 * @param {string} code - The source code
	 * @param {string[]} [input] - Strings of input to be used
	 * @returns {Promise<CodeResult>}
	 */
	async runCode(language, code, input = null) {

		const CodeResult = require("./CodeResult");

		const body = {
			language,
			code
		};

		if (input) body.input = input.join("\n");

		const response = await this.client.requestV1("/Playground/CompileCode", body).catch(error);
		return new CodeResult(this.client, response);
		
	}

	/**
	 * Edit your profile summary
	 * @param {string} text - Your new bio
	 * @returns {Promise<UserInfo>}
	 */
	async setBio(text) {

		const UserInfo = require("./UserInfo");

		const response = await this.client.requestV2("PATCH", `/v2/userinfo/profile?bio=${encodeURIComponent(text)}`).catch(error);
		return new UserInfo(this.client, response);
		
	}

}

module.exports = ClientUser;