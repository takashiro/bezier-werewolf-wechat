import Skill from '../Skill';

class TargetlessSkill extends Skill {
	validate(): boolean {
		return true;
	}

	selectCard(): boolean {
		return false;
	}

	selectPlayer(): boolean {
		return false;
	}
}

export default TargetlessSkill;
