import { Role } from '@bezier/werewolf-core';
import Collection from '../Collection';

import ApprenticeTanner from './ApprenticeTanner';

const col = new Collection('bonus');
col.add(Role.ApprenticeTanner, ApprenticeTanner);

export default col;
