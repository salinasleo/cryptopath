const router = require("express").Router();
const Users = require("./users");
const Coins = require("./coins");

// User routes
router.use("/users", Users);
router.use("/coins", Coins);

module.exports = router;