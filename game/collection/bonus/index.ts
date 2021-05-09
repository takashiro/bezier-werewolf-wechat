import Collection from '../Collection';

import apprenticeTanner from './ApprenticeTanner';
import beholder from './Beholder';
import cursed from './Cursed';
import prince from './Prince';
import squire from './Squire';
import thing from './Thing';

const col = new Collection('bonus');
col.add(apprenticeTanner);
col.add(beholder);
col.add(cursed);
col.add(prince);
col.add(squire);
col.add(thing);

export default col;
