import Collection from './Collection';

import standard from './standard/index';
import daybreak from './daybreak/index';
import bonus from './bonus/index';

const collections: Collection[] = [
	standard,
	daybreak,
	bonus,
];

const all = new Collection('all');
for (const col of collections) {
	for (const [role, skills] of col.getEntries()) {
		all.add(role, ...skills);
	}
}

export default all;
