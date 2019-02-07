
function readSessions() {
	let sessions = wx.getStorageSync('session') || [];
	if (sessions.length > 0) {
		const now = Math.floor(new Date().getTime() / 1000);
		sessions = sessions.filter(session => session && session.expiry > now);
	}
	return sessions;
}

function writeSessions(sessions) {
	return wx.setStorageSync('session', sessions);
};

class Session {

	constructor(roomKey) {
		this.roomKey = roomKey;
		this.seatKey = 0;
		this.seat = 0;
		this.role = 0;
		this.vision = null;
	}

	save() {
		this.expiry = new Date().getTime() / 1000 + 5 * 3600;
		const sessions = readSessions();
		let session = sessions.find(session => session.roomKey === this.roomKey);
		if (!session) {
			session = {};
			sessions.push(session);
		}

		session.roomKey = this.roomKey;
		session.expiry = this.expiry;

		session.seat = this.seat;
		session.seatKey = this.seatKey;
		session.role = this.role;
		session.vision = this.vision;

		writeSessions(sessions);
	}

	restore() {
		const sessions = readSessions();
		const session = sessions.find(session => session.roomKey === this.roomKey);
		if (session) {
			this.seat = session.seat;
			this.seatKey = session.seatKey;
			this.role = session.role;
			this.vision = session.vision;
		} else {
			this.seatKey = Math.floor(Math.random() * 0xFFFFFFFF);
		}
	}

}

export default Session;
