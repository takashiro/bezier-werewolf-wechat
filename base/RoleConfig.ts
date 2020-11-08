import { Role } from '@bezier/werewolf-core';
import RoleConfigItem from './RoleConfigItem';

export default class RoleConfig {
	protected readonly roles: Map<Role, number> = new Map();

	set(role: Role, num: number): void {
		this.roles.set(role, num);
	}

	get(role: Role): number {
		return this.roles.get(role) || 0;
	}

	getItems(): IterableIterator<[Role, number]> {
		return this.roles.entries();
	}

	getRoles(): Role[] {
		const roles: Role[] = [];
		for (const [role, num] of this.roles) {
			if (role === Role.Unknown) {
				continue;
			}
			for (let i = 0; i < num; i++) {
				roles.push(role);
			}
		}
		return roles;
	}

	reset(): void {
		this.roles.clear();
		this.roles.set(Role.Werewolf, 2);
		this.roles.set(Role.Minion, 1);
		this.roles.set(Role.Villager, 2);
		this.roles.set(Role.Seer, 1);
		this.roles.set(Role.Troublemaker, 1);
		this.roles.set(Role.Robber, 1);
		this.roles.set(Role.Drunk, 1);
		this.roles.set(Role.Tanner, 1);
	}

	async read(): Promise<void> {
		return new Promise((resolve) => {
			wx.getStorage({
				key: 'roleConfig',
				success: (res) => {
					if (!res || !res.data || !Array.isArray(res.data)) {
						this.reset();
					} else {
						for (const config of res.data) {
							this.roles.set(config.role, config.num);
						}
					}
					resolve();
				},
				fail: () => {
					this.reset();
					resolve();
				},
			});
		});
	}

	async save(): Promise<void> {
		const config: RoleConfigItem[] = [];
		for (const [role, num] of this.roles) {
			if (num <= 0) {
				continue;
			}
			config.push({
				role,
				num,
			});
		}

		return new Promise((resolve, reject) => {
			wx.setStorage({
				key: 'roleConfig',
				data: config,
				success: () => resolve(),
				fail: reject,
			});
		});
	}
}
