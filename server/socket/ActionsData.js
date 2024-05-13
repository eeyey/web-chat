const updateOnline = (online) => {
  return JSON.stringify({
    method: "updateOnline",
    online,
  });
};

const sendMessage = (message, dialogId) => {
  return JSON.stringify({
    method: "sendMessage",
    message,
    dialogId,
  });
};

const RTCConnect = (user_id, description, video) => {
  return JSON.stringify({
    method: "RTCConnect",
    user_id,
    video,
    description,
  });
};

const icecandidate = (user_id, candidate) => {
  return JSON.stringify({
    method: "icecandidate",
    user_id,
    candidate,
  });
};

const endCall = () => {
  return JSON.stringify({
    method: "endCall",
  });
};

module.exports = {
  updateOnline,
  sendMessage,
  RTCConnect,
  icecandidate,
  endCall,
};
