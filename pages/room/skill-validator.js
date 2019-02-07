
const disabled = function () {
	return '你什么都不知道';
};

const empty = function () {
	return {};
};

function fixedNumber(playerNum, cardNum) {
	const targets = [];
	if (playerNum) {
		targets.push(playerNum + '名玩家');
	}
	if (cardNum) {
		targets.push(cardNum + '张牌');
	}
	const text = '请选择' + targets.join('和');

	return function (input) {
		if (input.players.size === playerNum && input.centerCards.size === cardNum) {
			return input;
		} else {
			text;
		}
	};
};

const validators = [
	// Unknown
	disabled,

	// Werewolf
	empty,

	// Villager
	disabled,

	// Seer
	function (input) {
		if ((input.players.size === 1 && input.centerCards.size === 0)
			|| (input.players.size === 0 && input.centerCards.size === 2)) {
			return input;
		} else {
			return '请选择1名玩家或2张牌';
		}
	},

	// Tanner
	disabled,

	// Minion
	empty,

	// Troublemaker
	fixedNumber(2, 0),

	// Robber
	fixedNumber(1, 0),

	// Drunk
	fixedNumber(0, 1),
];

export default validators;
