import { Role } from '@bezier/werewolf-core';

import TwoPlayerSkill from '../TwoPlayerSkill';
import WitchSkill from './WitchSkill';
import AlphaWolfSkill from './AlphaWolfSkill';
import MysticWolfSkill from './MysticWolfSkill';
import Collection from '../Collection';

const col = new Collection('daybreak');
col.add(Role.Witch, WitchSkill);
col.add(Role.AlphaWolf, AlphaWolfSkill);
col.add(Role.MysticWolf, MysticWolfSkill);
col.add(Role.ParanormalInvestigator, TwoPlayerSkill);

export default col;
