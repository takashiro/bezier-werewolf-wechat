import Board from '../Board';
import Player from '../Player';
import MultiPlayerSkill from './MultiPlayerSkill';

class TwoPlayerSkill extends MultiPlayerSkill {
	constructor(board: Board, self: Player) {
		super(board, self, 2);
	}
}

export default TwoPlayerSkill;
