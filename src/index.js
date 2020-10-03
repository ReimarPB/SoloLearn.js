/** @module index */

const SoloLearn = {

	Base: require("./Base"),

	Mobile: {
		Achievement:      require("./mobile/Achievement"),
		Answer:           require("./mobile/Answer"),
		AnswerResult:     require("./mobile/AnswerResult"),
		Challenge:        require("./mobile/Challenge"),
		Client:           require("./mobile/Client"),
		ClientUser:       require("./mobile/ClientUser"),
		Code:             require("./mobile/Code"),
		CodeItem:         require("./mobile/CodeItem"),
		CodeResult:       require("./mobile/CodeResult"),
		ConnectedAccount: require("./mobile/ConnectedAccount"),
		Contest:          require("./mobile/Contest"),
		Course:           require("./mobile/Course"),
		Dashboard:        require("./mobile/Dashboard"),
		DiscussionPost:   require("./mobile/DiscussionPost"),
		FeedItem:         require("./mobile/FeedItem"),
		ItemCounts:       require("./mobile/ItemCounts"),
		Lesson:           require("./mobile/Lesson"),
		Level:            require("./mobile/Level"),
		Notification:     require("./mobile/Notification"),
		Player:           require("./mobile/Player"),
		Post:             require("./mobile/Post"),
		PostBackground:   require("./mobile/PostBackground"),
		Problem:          require("./mobile/Problem"),
		Streak:           require("./mobile/Streak"),
		StreakStatus:     require("./mobile/StreakStatus"),
		User:             require("./mobile/User"),
		UserInfo:         require("./mobile/UserInfo")
	},

	AccountService:     require("./enum/AccountService"),
	Badge:              require("./enum/Badge"),
	ChallengeStatus:    require("./enum/ChallengeStatus"),
	ContestStatus:      require("./enum/ContestStatus"),
	Difficulty:         require("./enum/Difficulty"),
	Language:           require("./enum/Language"),
	PostBackgroundType: require("./enum/PostBackgroundType"),
	PostType:           require("./enum/PostType"),
	SearchFilter:       require("./enum/SearchFilter"),
	Vote:               require("./enum/Vote")

};

module.exports = SoloLearn;