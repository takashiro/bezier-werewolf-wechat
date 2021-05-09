import Collection from '../Collection';

import alphaWolf from './AlphaWolf';
import apprenticeSeer from './ApprenticeSeer';
import bodyBuard from './Bodyguard';
import dreamWolf from './DreamWolf';
import mysticWolf from './MysticWolf';
import paranormalInvestigator from './ParanormalInvestigator';
import revealer from './Revealer';
import villageIdiot from './VillageIdiot';
import witch from './Witch';

const col = new Collection('daybreak');
col.add(alphaWolf);
col.add(apprenticeSeer);
col.add(bodyBuard);
col.add(dreamWolf);
col.add(mysticWolf);
col.add(paranormalInvestigator);
col.add(revealer);
col.add(villageIdiot);
col.add(witch);

export default col;
