
import Skill from '../Skill';

class Unskilled extends Skill {

	validate() {
		this.message = '你什么都不知道';
	}

	selectCard() { }

	selectPlayer() { }

};

export default Unskilled;
