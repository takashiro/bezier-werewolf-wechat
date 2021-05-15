import Collection from '../Collection';

import doppelganger from './Doppelganger';
import drunk from './Drunk';
import hunter from './Hunter';
import insomniac from './Insomniac';
import mason from './Mason';
import minion from './Minion';
import robber from './Robber';
import seer from './Seer';
import tanner from './Tanner';
import troublemaker from './Troublemaker';
import villager from './Villager';
import werewolf from './Werewolf';

const col = new Collection('standard');
col.add(doppelganger);
col.add(drunk);
col.add(hunter);
col.add(insomniac);
col.add(mason);
col.add(minion);
col.add(robber);
col.add(seer);
col.add(tanner);
col.add(troublemaker);
col.add(villager);
col.add(werewolf);

export default col;
