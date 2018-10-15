const router = require("express").Router();
const Users = require("./users");
const Coins = require("./coins");
const IconsModel = require("./icons");

// User routes
router.use("/users", Users);
router.use("/coins", Coins);
router.use("/icons", IconsModel);

module.exports = router;