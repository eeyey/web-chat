const Router = require("express");
const router = new Router();

const controller = require("../controllers/chatController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.get("/getDialogs", authMiddleware, controller.getDialogs);
router.get("/getUsers", authMiddleware, controller.getUsers);

module.exports = router;
