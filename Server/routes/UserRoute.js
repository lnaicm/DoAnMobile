const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const userMiddlewares = require("../middlewares/UserMiddlewares");
const UserController = require("../controllers/UserController");

const isAuth = userMiddlewares.isAuth;

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/refresh", userController.refreshToken);
router.post("/purchase", isAuth, UserController.purChase);

router.get("/profile", isAuth, async (req, res) => {
    res.send(req.email);
});


module.exports = router;