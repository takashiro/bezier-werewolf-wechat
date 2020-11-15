import Unskilled from './Unskilled';
import TargetlessSkill from './TargetlessSkill';
import SinglePlayerSkill from './SinglePlayerSkill';
import TwoPlayerSkill from './TwoPlayerSkill';
import SingleCardSkill from './SingleCardSkill';
import SeerSkill from './SeerSkill';
import WitchSkill from './WitchSkill';
import AlphaWolfSkill from './AlphaWolfSkill';
import MysticWolfSkill from './MysticWolfSkill';
import Skill from '../Skill';

const skills: (new () => Skill)[] = [
	// Unknown
	Unskilled,

	// Werewolf
	TargetlessSkill,

	// Villager
	Unskilled,

	// Seer
	SeerSkill,

	// Tanner
	Unskilled,

	// Minion
	TargetlessSkill,

	// Troublemaker
	TwoPlayerSkill,

	// Robber
	SinglePlayerSkill,

	// Drunk
	SingleCardSkill,

	// Mason
	TargetlessSkill,

	// Hunter
	Unskilled,

	// Witch
	WitchSkill,

	// Alpha Wolf
	AlphaWolfSkill,

	// Dream Wolf
	Unskilled,

	// Prince
	Unskilled,

	// Mystic Wolf
	MysticWolfSkill,

	// Paranormal Investigator
	TwoPlayerSkill,
];

export default skills;
