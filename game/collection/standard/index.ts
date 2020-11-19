import { Role } from '@bezier/werewolf-core';
import Collection from '../Collection';

import TargetlessSkill from '../TargetlessSkill';
import SingleCardSkill from '../SingleCardSkill';

import Werewolf from './Werewolf';
import Seer from './Seer';
import Minion from './Minion';
import Troublemaker from './Troublemaker';
import Robber from './Robber';

const col = new Collection('standard');
col.add(Role.Werewolf, Werewolf);
col.add(Role.Seer, Seer);
col.add(Role.Minion, Minion);
col.add(Role.Troublemaker, Troublemaker);
col.add(Role.Robber, Robber);
col.add(Role.Drunk, SingleCardSkill);
col.add(Role.Mason, TargetlessSkill);

export default col;
