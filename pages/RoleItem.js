
import Role from '../game/Role';

class RoleItem {

	constructor(role, name, prompt, skill) {
		this.role = role;
		this.name = name;
		this.prompt = prompt;
		this.skill = skill;

		RoleItem[this.key] = this;
	}

	get key() {
		return this.role.key;
	}

	get value() {
		return this.role.value;
	}

	get team() {
		return this.role.team;
	}

	toNum() {
		return this.role.value;
	}

	static fromNum(num) {
		const list = RoleItem.enums;
		if (0 <= num && num < list.length) {
			return list[num];
		} else {
			return list[0];
		}
	}

}

RoleItem.enums = [
	new RoleItem(Role.Unknown, '未知'),

	new RoleItem(
		Role.Werewolf, '狼人',
		'今晚狼人们碰面后，计划屠掉这个村庄。正要动手时发现村里似乎有些不寻常。你们匆匆变回人形，等待天亮。',
		'碰面',
	),
	new RoleItem(
		Role.Villager, '村民',
		'你入夜后就睡下了，这一夜一如既往地安稳。',
	),
	new RoleItem(
		Role.Seer, '预言家',
		'你正要入睡，却发现预言球有些不寻常，村庄似乎暗藏杀机，你决定探个究竟。现在你可以查看1名玩家的身份或2张未使用的牌。',
		'预知未来',
	),
	new RoleItem(
		Role.Tanner, '皮匠',
		'失业后的你感到生活无望，一心寻死以求解脱。',
	),
	new RoleItem(
		Role.Minion, '爪牙',
		'你目睹了狼人的行动，决定暗中帮助他们，借狼人之手报复村庄。',
	),
	new RoleItem(
		Role.Troublemaker, '捣蛋鬼',
		'你不小心打翻了女巫的药水，药水洒到了两只人偶上，人偶上的名字交换了。你意识到这两个人互换了身份。现在请选择两名玩家。',
		'交换身份',
	),
	new RoleItem(
		Role.Robber, '盗贼',
		'你趁着夜色潜入一户人家，正准备下手，身体却不能动弹晕了过去。早上醒来发现自己变成了户主，而真正的户主失踪了。现在请选择1名玩家，与之交换身份并查看你的新身份牌。',
		'交换身份',
	),
	new RoleItem(
		Role.Drunk, '酒鬼',
		'你昨晚在酒吧喝得尽兴，迷迷糊糊中似乎被人带走，早上醒来发现镜子中的你变了样。现在请选择1张未使用的牌，与自己的身份牌交换。',
		'交换身份',
	),
];

export default RoleItem;
