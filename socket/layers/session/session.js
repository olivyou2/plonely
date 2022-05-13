class Session {
  constructor() {
    this.socketId = '';
    this.userId = '';

    this.x = 0;
    this.y = 0;

    this.time = 0;
  }

  getTime() {
    return this.time;
  }

  setTime(time) {
    this.time = time;
  }

  getUserId() {
    return this.userId;
  }

  /**
   *
   * @param {String} userId
   */
  setUserId(userId) {
    this.userId = userId;
  }

  /**
   *
   * @returns {String} Socket Id
   */
  getSocketId() {
    return this.socketId;
  }

  /**
   *
   * @param {String} socketId
   */
  setSocketId(socketId) {
    this.socketId = socketId;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }
}

module.exports = Session;
