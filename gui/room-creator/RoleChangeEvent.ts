import RoleConfigItem from '../../base/RoleConfigItem';

interface RoleChangeEvent extends WechatMiniprogram.CustomEvent {
	detail: RoleConfigItem;
}

export default RoleChangeEvent;
