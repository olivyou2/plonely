const Session = require('./session');

class SessionHandler {
  constructor() {
    this.sessions = [];
  }

  createSession() {
    const session = new Session();
    this.sessions.push(session);

    return session;
  }

  /**
   *
   * @param {Session} session
   */
  removeSession(session) {
    const index = this.sessions.findIndex((s) => s === session);
    this.sessions.splice(index);
  }

  /**
   *
   * @param {string} socketId
   */
  getSession(socketId) {
    return this.sessions.find((s) => s.socketId === socketId);
  }
}

module.exports = SessionHandler;
