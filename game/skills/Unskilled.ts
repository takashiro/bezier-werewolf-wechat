import Skill from '../Skill';

class Unskilled extends Skill {
	validate(): boolean {
		this.message = '你什么都不知道';
		return false;
	}

	selectCard(): boolean {
		return false;
	}

	selectPlayer(): boolean {
		return false;
	}
}

export default Unskilled;
