const Router = require("express");
const router = new Router();

const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/auth", authMiddleware, controller.check);

module.exports = router;
