const jwt = require("jsonwebtoken");

const db = require("../db/index");

const { sendMessage } = require("./ActionsData");

class MessageController {
  async sendMessage(data, client, socket) {
    try {
      const { token, to, text } = data;

      const user = jwt.decode(token);

      const query = await db.query(
        "INSERT INTO messages (sender_id, receiver_id, text, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user.id, to, text, Date.now(), Date.now()]
      );
      const message = query.rows[0];

      socket.send(user.id, sendMessage(message, to));
      socket.send(to, sendMessage(message, user.id));
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new MessageController();
