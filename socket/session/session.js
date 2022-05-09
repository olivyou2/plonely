class Session {
  constructor() {
    this.socketId = '';

    this.x = 0;
    this.y = 0;
    this.time = 0;
  }

  getX() {
    return this.x;
  }

  setX(x) {
    this.x = x;
  }

  getY() {
    return this.y;
  }

  setY(y) {
    this.y = y;
  }

  getTime() {
    return this.time;
  }

  setTime(time) {
    this.time = time;
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
}

module.exports = Session;
