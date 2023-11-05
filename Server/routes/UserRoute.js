const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const userMiddlewares = require("../middlewares/UserMiddlewares");

const isAuth = userMiddlewares.isAuth;

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh", userController.refreshToken);

router.get("/profile", isAuth, async (req, res) => {
    res.send(req.email);
});


module.exports = router;