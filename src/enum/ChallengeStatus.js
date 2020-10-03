/**
 * Enum for the different approval statuses a challenge can have
 * @enum {number}
 * @readonly
 */
const ChallengeStatus = {
	NONE: 0,
	PENDING: 1,
	DECLINED: 2,
	APPROVED: 3
};

module.exports = ChallengeStatus;