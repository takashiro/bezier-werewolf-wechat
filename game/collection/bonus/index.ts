import { Role } from '@bezier/werewolf-core';
import Collection from '../Collection';

import ApprenticeTanner from './ApprenticeTanner';
import Beholder from './Beholder';
import Squire from './Squire';

const col = new Collection('bonus');
col.add(Role.ApprenticeTanner, ApprenticeTanner);
col.add(Role.Beholder, Beholder);
col.add(Role.Squire, Squire);

export default col;