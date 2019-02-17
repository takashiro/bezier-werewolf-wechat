
import Unskilled from './Unskilled';
import TargetlessSkill from './TargetlessSkill';
import SinglePlayerSkill from './SinglePlayerSkill';
import MultiPlayerSkill from './MultiPlayerSkill';
import SingleCardSkill from './SingleCardSkill';
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
	new MultiPlayerSkill(2),

	// Robber
	new SinglePlayerSkill,

	// Drunk
	new SingleCardSkill,

	// Mason
	new TargetlessSkill,

	// Hunter
	new Unskilled,
];

export default skills;
