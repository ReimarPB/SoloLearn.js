const Base = require("../Base");

/**
 * Represents one of the backgrounds you can use when writing a post
 */
class PostBackground extends Base {

	constructor(client, data) {
		super(...arguments);

		/**
		 * The ID of the background
		 * @type {number}
		 */
		this.id = data.id;

		/**
		 * The color of the text in hex
		 * @type {string}
		 */
		this.textColor = data.textColor;

		/**
		 * The background type (PostBackgroundType.IMAGE || PostBackgroundType.GRADIENT)
		 * @type {PostBackgroundType}
		 */
		this.type = data.type;

		/**
		 * The angle of the gradient (only present when type == PostBackgroundType.GRADIENT)
		 * @type {?number}
		 */
		this.angle = data.angle;

		/**
		 * The start color of the gradient in hex (only present when type == PostBackgroundType.GRADIENT)
		 * @type {?string}
		 */
		this.startColor = data.startColor;

		/**
		 * The end color of the gradient in hex (only present when type == PostBackgroundType.GRADIENT)
		 * @type {?string}
		 */
		this.endColor = data.endColor;

		/**
		 * The URL of the background image (800 x 400 or 800 x 534) (only present when type == PostBackgroundType.IMAGE)
		 * @type {?string}
		 */
		this.imageUrl = data.imageUrl;

		/**
		 * The background, represented as a small square image (64 x 64) (only present when type == PostBackgroundType.GRADIENT)
		 * @type {?string}
		 */
		this.previewUrl = data.previewUrl;

	}

}

module.exports = PostBackground;