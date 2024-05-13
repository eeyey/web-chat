const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../db");

const ApiError = require("../error/ApiError");

const generateJwt = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Incorrent email or passsword"));
    }

    try {
      const candidates = await db.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);

      if (candidates.rows.length) {
        return next(ApiError.badRequest("User with this email exists"));
      }

      const hpassword = await bcrypt.hash(password, 3);

      const insertRes = await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hpassword]
      );
      const user = insertRes.rows[0];

      const token = generateJwt(user.id, user.email, user.name);

      return res.json({ token });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка сервера"));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new Error("Incorrect data");

      const user = (
        await db.query("SELECT * FROM users WHERE email=$1", [email])
      ).rows[0];

      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) throw new Error("Incorrect password");

      const token = generateJwt(user.id, user.email, user.name);

      return res.json({ token });
    } catch (e) {
      return next(ApiError.badRequest("Email or password incorrect"));
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.name);

    return res.json({ token });
  }
}

module.exports = new UserController();
