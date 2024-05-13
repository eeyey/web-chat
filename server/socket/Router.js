const MessageController = require("./MessageController");
const RTCController = require("./RTCController");
const UserController = require("./UserController");

module.exports = {
  connect: UserController.connect,

  sendMessage: MessageController.sendMessage,

  icecandidate: RTCController.icecandidate,
  RTCConnect: RTCController.connect,
  endCall: RTCController.end,
};
