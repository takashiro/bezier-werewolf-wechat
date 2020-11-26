import { Role } from '@bezier/werewolf-core';

type RoleTuple = [Role, string, string];
const itemList: RoleTuple[] = [
	[
		Role.Werewolf,
		'狼人',
		'夜色渐深，狼人们正要动手时发现村里似乎有些不寻常，于是匆匆变回人形，等待天亮。现在你可以查看自己的狼同伴。',
	],
	[
		Role.Villager,
		'村民',
		'你入夜后就睡下了，这一夜一如既往的安稳。天亮后，请仔细找出混入你们中间的狼人，投出狼人获得胜利。',
	],
	[
		Role.Seer,
		'预言家',
		'你正要入睡时发现预言球有了异样——村庄里似乎暗藏杀机。现在你可以查看1名其他玩家的身份或2张未使用的牌。',
	],
	[
		Role.Tanner,
		'皮匠',
		'失业后的你感到生活无望，一心寻死以求解脱。天亮后请引导大家将你公投出局。',
	],
	[
		Role.Minion,
		'爪牙',
		'你目睹了狼人的行动，决定暗中帮助他们，借狼人之手报复村庄。现在你可以查看狼人到底是谁。',
	],
	[
		Role.Troublemaker,
		'捣蛋鬼',
		'你不小心打翻了女巫的药水，药水洒到了两只人偶上。你意识到这两个人互换了身份。现在请选择两名玩家。',
	],
	[
		Role.Robber,
		'盗贼',
		'你趁着夜色潜入一户人家，正准备下手。现在请选择1名玩家，与之交换身份并查看你的新身份牌。',
	],
	[
		Role.Drunk,
		'酒鬼',
		'你昨晚在酒吧喝得尽兴，迷迷糊糊中似乎被人带走，早上醒来发现镜子中的你变了样。现在请选择1张未使用的牌，与自己的身份牌交换。你不能查看被交换牌。',
	],
	[
		Role.Mason,
		'守夜人',
		'今晚你在村庄外守夜巡逻。夜色渐深，村庄外一片寂静。除了你的搭档以外你没有见过任何人，直到天亮。现在你可以查看另一个守夜人的身份。',
	],
	[
		Role.Hunter,
		'猎人',
		'你是村庄里的猎人。当你被公投出局时，所有投票给你的玩家都同时出局。如果有狼人出局，则村民阵营胜利。',
	],
	[
		Role.Witch,
		'女巫',
		'今晚你又炼制出了一瓶变身药水，跃跃欲试。现在你可以查看一张未使用的身份牌，然后将它和任意一名玩家交换。',
	],
	[
		Role.AlphaWolf,
		'狼王',
		'你带领狼人们进入村庄。正要动手时，你敏锐的野性嗅到了危险，决定撤退。为了保护狼群，你趁机感染了村庄里一名熟睡的村民。现在你可以和狼同伴互相确认身份，然后选择一名玩家感染为狼人。',
	],
	[
		Role.DreamWolf,
		'狼外婆',
		'狼崽子们又在偷偷干坏事了。年迈的你一早起来发现他们都不见了踪影，赶紧前往村庄。白天下狼人们已经变回人形。你现在需要确认自己的身份，找到队友获得胜利。',
	],
	[
		Role.Prince,
		'王子',
		'你是这个国家的王子，路过一个神秘的村庄被卷入一起神秘事件。由于贵族特权，投给你的票将全部作废。',
	],
	[
		Role.MysticWolf,
		'狼先知',
		'你拥有神秘的预言能力，理所当然被选入今晚的狼队行动中。和队友碰面后，你还可以查看任意一名其他玩家的身份。',
	],
	[
		Role.Cursed,
		'神弃者',
		'由于猎杀过多狼人，你受到了狼群的诅咒。如果最后没有狼人投票给你，你将会变身为狼人，加入狼人阵营。',
	],
	[
		Role.ParanormalInvestigator,
		'疯狂学者',
		'你喜欢做各种疯狂又刺激的实验。今晚你可以查看至多2名玩家的身份，若其中有狼人（或皮匠），你必须立刻停止研究，然后变身为同一阵营的狼人（或皮匠）。',
	],
];

interface RoleMeta {
	name: string;
	description: string;
}

const itemMap = new Map<Role, RoleMeta>();
for (const item of itemList) {
	const [role, name, description] = item;
	itemMap.set(role, {
		name,
		description,
	});
}

export default class RoleItem {
	readonly key: string;

	readonly value: Role;

	readonly name: string;

	readonly description: string;

	constructor(role: Role) {
		this.key = Role[role];
		this.value = role;

		const item = itemMap.get(role);
		if (item) {
			this.name = item.name;
			this.description = item.description;
		} else {
			this.key = 'Unknown';
			this.name = '未知';
			this.description = '';
		}
	}
}
