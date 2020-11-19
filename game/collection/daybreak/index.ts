import { Role } from '@bezier/werewolf-core';

import Collection from '../Collection';

import Werewolf from '../standard/Werewolf';
import AlphaWolf from './AlphaWolf';
import TwoPlayerSkill from '../TwoPlayerSkill';
import WitchSkill from './WitchSkill';
import MysticWolf from './MysticWolf';

const col = new Collection('daybreak');
col.add(Role.Witch, WitchSkill);
col.add(Role.AlphaWolf, Werewolf, AlphaWolf);
col.add(Role.MysticWolf, Werewolf, MysticWolf);
col.add(Role.ParanormalInvestigator, TwoPlayerSkill);

export default col;
