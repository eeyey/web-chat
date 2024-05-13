const fs = require("fs");
const path = require("path");

const ApiError = require("../error/ApiError");
const db = require("../db");

class ChatController {
  async getDialogs(req, res, next) {
    try {
      const user = req.user;

      const getDialogsQuery = fs
        .readFileSync(path.resolve(__dirname, "../db/get-dialogs.sql"))
        .toString();

      const dialogs = await db.query(getDialogsQuery, [user.id]);

      for (let i = 0; i < dialogs.rows.length; i++) {
        const dialog = dialogs.rows[i];

        const messages = await db.query(
          "SELECT * FROM messages WHERE receiver_id=$1 AND sender_id=$2 OR receiver_id=$2 AND sender_id=$1 ORDER BY created_at",
          [dialog.id, user.id]
        );

        dialogs.rows[i] = {
          ...dialog,
          messages: messages.rows,
        };
      }

      return res.json(dialogs.rows);
    } catch (e) {
      return next(ApiError.badRequest("Не удалось получить список диалогов."));
    }
  }

  async getUsers(req, res, next) {
    try {
      const query = await db.query("SELECT * FROM users");

      const users = query.rows.map((user) => {
        delete user.password;
        return user;
      });

      return res.json(users);
    } catch (e) {
      return next(
        ApiError.badRequest("Не удалось получить список пользователей")
      );
    }
  }
}

module.exports = new ChatController();
