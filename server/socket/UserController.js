const jwt = require("jsonwebtoken");
const { updateOnline } = require("./ActionsData");

class UserController {
  connect(data, client, socket) {
    try {
      const { token } = data;

      const user = jwt.verify(token, process.env.SECRET_KEY);

      socket.addClient(user.id, client);
      socket.broadcast(updateOnline([...socket.clients.keys()]));

      client.on("close", (_code) => {
        socket.deleteClient(user.id);
        socket.broadcast(updateOnline([...socket.clients.keys()]));
      });
    } catch (e) {
      client.close(1014);
    }
  }
}

module.exports = new UserController();
