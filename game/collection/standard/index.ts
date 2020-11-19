import { Role } from '@bezier/werewolf-core';
import Collection from '../Collection';

import TargetlessSkill from '../TargetlessSkill';
import SinglePlayerSkill from '../SinglePlayerSkill';
import TwoPlayerSkill from '../TwoPlayerSkill';
import SingleCardSkill from '../SingleCardSkill';
import SeerSkill from './SeerSkill';
import Werewolf from './Werewolf';

const col = new Collection('standard');
col.add(Role.Werewolf, Werewolf);
col.add(Role.Seer, SeerSkill);
col.add(Role.Minion, TargetlessSkill);
col.add(Role.Troublemaker, TwoPlayerSkill);
col.add(Role.Robber, SinglePlayerSkill);
col.add(Role.Drunk, SingleCardSkill);
col.add(Role.Mason, TargetlessSkill);

export default col;
