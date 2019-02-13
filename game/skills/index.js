
import Unskilled from './Unskilled';
import TargetlessSkill from './TargetlessSkill';
import ExchangeSkill from './ExchangeSkill';
import SeerSkill from './SeerSkill';

const skills = [
	// Unknown
	new Unskilled,

	// Werewolf
	new TargetlessSkill,

	// Villager
	new Unskilled,

	// Seer
	new SeerSkill,

	// Tanner
	new Unskilled,

	// Minion
	new TargetlessSkill,

	// Troublemaker
	new ExchangeSkill(2, 0),

	// Robber
	new ExchangeSkill(1, 0),

	// Drunk
	new ExchangeSkill(0, 1),
];

export default skills;
