import Board from '../Board';
import MultiPlayerSkill from './MultiPlayerSkill';

class TwoPlayerSkill extends MultiPlayerSkill {
	constructor(board: Board) {
		super(board, 2);
	}
}

export default TwoPlayerSkill;
