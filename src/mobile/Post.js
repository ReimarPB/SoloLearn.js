const Base = require("../Base");

/**
 * Represents a post created by a user
 */
class Post extends Base {

	constructor(client, data) {

		const PostBackground = require("./PostBackground");

		if (data.background) data.background = new PostBackground(client, data.background);

		super(...arguments);

		/**
		 * The background of this post
		 * @type {PostBackground}
		 */
		this.background = data.background;

		/**
		 * The ID of the background of this post
		 * @type {number}
		 */
		this.backgroundID = data.backgroundID;

		/**
		 * The amount of comments this post has
		 * @type {number}
		 */
		this.comments = data.comments;

		/**
		 * The date this post was created
		 * @type {string}
		 */
		this.date = data.date;

		/**
		 * The post ID
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * The URL of the image if one is attached
		 * @type {?string}
		 */
		this.imageUrl = data.imageUrl;

		/**
		 * The post text
		 * @type {string}
		 */
		this.message = data.message;

		/**
		 * The ID of the author of this post
		 * @type {number}
		 */
		this.userID = data.userID;

		/**
		 * Unknown value
		 * @type {?*}
		 */
		this.videoStoryID = data.videoStoryID;

		/**
		 * The amount of views this post has
		 * @type {number}
		 */
		this.viewCount = data.viewCount;

		/**
		 * The amount of votes this post has
		 * @type {number}
		 */
		this.votes = data.votes;

	}

	/**
	 * Delete the post
	 * @returns {Promise<void>}
	 */
	delete() {
		return new Promise(async (resolve, reject) => {

			await this.client.requestV1("/Profile/DeletePost", { id: this.id }).catch(reject);
			resolve();

		});
	}

	/**
	 * Change the post text
	 * @param {string} text - The new post text
	 * @returns {Promise<Post>}
	 */
	edit(text) {
		return new Promise(async (resolve, reject) => {

			const response = await this.client.requestV1("/Profile/EditPost", { message: encodeURIComponent(text), id: this.id }).catch(reject);
			resolve(new Post(this.client, response.post));

		});


	}

	/**
	 * Get the users who's upvoted this post
	 * @param count
	 * @param [index]
	 * @param [query]
	 * @returns {Promise<User[]>}
	 */
	getUpvotes(count, index = 0, query = "") {
		return new Promise(async (resolve, reject) => {

			const User = require("./User");

			const response = await this.client.requestV1("Profile/GetPostLikes", { count, index, query, postId: this.id, id: this.client.user.id }).catch(reject);
			const arr = [];
			response.users.forEach(user => arr.push(new User(this.client, user)));
			resolve(arr);

		});
	}

	/**
	 * Upvote this post
	 * @returns {Promise<Number>} - The new amount of votes
	 */
	upvote() {
		return new Promise(async (resolve, reject) => {

			const response = await this.client.requestV1("/Profile/VotePost", { id: this.id, vote: 1 }).catch(reject);
			resolve(response.votes);

		});
	}

	/**
	 * Downvote this post
	 * @returns {Promise<Number>} - The new amount of votes
	 */
	downvote() {
		return new Promise(async (resolve, reject) => {

			const response = await this.client.requestV1("/Profile/VotePost", { id: this.id, vote: -1 }).catch(reject);
			resolve(response.votes);

		});
	}

	/**
	 * Remove the vote from this post
	 * @returns {Promise<Number>} - The new amount of votes
	 */
	removeVote() {
		return new Promise(async (resolve, reject) => {

			const response = await this.client.requestV1("/Profile/VotePost", { id: this.id, vote: 0 }).catch(reject);
			resolve(response.votes);

		});
	}

}

module.exports = Post;