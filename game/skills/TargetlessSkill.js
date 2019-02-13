
import Skill from '../Skill';

class TargetlessSkill extends Skill {

	validate() {
		return true;
	}

	selectCard() {}

	selectPlayer() {}

};

export default TargetlessSkill;
