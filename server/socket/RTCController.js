const path = require("path");
const fs = require("fs");

const jwt = require("jsonwebtoken");

const db = require("../db/index");

const { RTCConnect, icecandidate, endCall } = require("./ActionsData");

class RTCController {
  async connect(data, client, socket) {
    try {
      const { token, user_id, description, video } = data;

      const user = jwt.decode(token);

      socket.send(user_id, RTCConnect(user.id, description, video));
    } catch (e) {
      console.log(e);
    }
  }

  async icecandidate(data, client, socket) {
    try {
      const { token, user_id, candidate } = data;

      const user = jwt.decode(token);

      socket.send(+user_id, icecandidate(user.id, candidate));
    } catch (e) {
      console.log(e);
    }
  }

  async end(data, client, socket) {
    try {
      const { token, user_id } = data;

      socket.send(+user_id, endCall());
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new RTCController();
