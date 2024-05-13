const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      const token = req.headers.authorization.split(" ")[0];

      if (!token) {
        return res.status(401).json({ message: "Not auth" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Not access" });
      }

      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Not auth" });
    }
  };
};
