/**
 * Enum for the statuses a contest (player) can have
 * @enum {number}
 * @readonly
 * @see Player
 */
const ContestStatus = {
	NONE: 0,
	WON: 1,
	LOST: 2,
	INVITED: 3,
	STARTED: 4,
	WAITING: 5,
	DECLINED: 6,
	EXPIRED: 7,
	DRAW: 8
};

module.exports = ContestStatus;