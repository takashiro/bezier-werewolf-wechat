import VoteGroup from './VoteGroup';

interface VoteBulletin {
	progress: number;
	limit: number;
	items: VoteGroup[];
}

export default VoteBulletin;
