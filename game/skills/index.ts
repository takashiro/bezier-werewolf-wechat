import { Role } from '@bezier/werewolf-core';
import Skill from '../Skill';

import Unskilled from './Unskilled';
import TargetlessSkill from './TargetlessSkill';
import SinglePlayerSkill from './SinglePlayerSkill';
import TwoPlayerSkill from './TwoPlayerSkill';
import SingleCardSkill from './SingleCardSkill';
import SeerSkill from './SeerSkill';
import WitchSkill from './WitchSkill';
import AlphaWolfSkill from './AlphaWolfSkill';
import MysticWolfSkill from './MysticWolfSkill';

const skillMap = new Map<Role, new() => Skill>();
skillMap.set(Role.Unknown, Unskilled);
skillMap.set(Role.Werewolf, TargetlessSkill);
skillMap.set(Role.Villager, Unskilled);
skillMap.set(Role.Seer, SeerSkill);
skillMap.set(Role.Tanner, Unskilled);
skillMap.set(Role.Minion, TargetlessSkill);
skillMap.set(Role.Troublemaker, TwoPlayerSkill);
skillMap.set(Role.Robber, SinglePlayerSkill);
skillMap.set(Role.Drunk, SingleCardSkill);
skillMap.set(Role.Mason, TargetlessSkill);
skillMap.set(Role.Hunter, Unskilled);
skillMap.set(Role.Witch, WitchSkill);
skillMap.set(Role.AlphaWolf, AlphaWolfSkill);
skillMap.set(Role.DreamWolf, Unskilled);
skillMap.set(Role.Prince, Unskilled);
skillMap.set(Role.MysticWolf, MysticWolfSkill);
skillMap.set(Role.ParanormalInvestigator, TwoPlayerSkill);

export default skillMap;
