import { Role } from '@bezier/werewolf-core';

import Collection from '../Collection';

import Werewolf from '../standard/Werewolf';
import AlphaWolf from './AlphaWolf';
import WitchView from './WitchView';
import WitchExchange from './WitchExchange';
import MysticWolf from './MysticWolf';
import ParanormalInvestigator from './ParanormalInvestigator';

const col = new Collection('daybreak');
col.add(Role.Witch, WitchView, WitchExchange);
col.add(Role.AlphaWolf, Werewolf, AlphaWolf);
col.add(Role.MysticWolf, Werewolf, MysticWolf);
col.add(Role.ParanormalInvestigator, ParanormalInvestigator, ParanormalInvestigator);

export default col;
