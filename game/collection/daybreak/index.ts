import { Role } from '@bezier/werewolf-core';

import Collection from '../Collection';

import Werewolf from '../standard/Werewolf';
import AlphaWolf from './AlphaWolf';
import ApprenticeSeer from './ApprenticeSeer';
import MysticWolf from './MysticWolf';
import ParanormalInvestigator from './ParanormalInvestigator';
import WitchView from './WitchView';
import WitchExchange from './WitchExchange';

const col = new Collection('daybreak');
col.add(Role.AlphaWolf, Werewolf, AlphaWolf);
col.add(Role.ApprenticeSeer, ApprenticeSeer);
col.add(Role.MysticWolf, Werewolf, MysticWolf);
col.add(Role.ParanormalInvestigator, ParanormalInvestigator, ParanormalInvestigator);
col.add(Role.Witch, WitchView, WitchExchange);

export default col;
